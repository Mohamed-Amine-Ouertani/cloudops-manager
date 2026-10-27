import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';  // PartialType(CreateUserDto)

// Fields returned to the client — passwordHash never included
const SAFE_SELECT = {
  id: true, email: true, firstName: true,
  lastName: true, role: true, teamId: true, createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async create(dto: CreateUserDto) {
    const exists = await this.db.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already registered');

    const { password, ...rest } = dto;
    const passwordHash = await bcrypt.hash(password, 12);
    return this.db.user.create({ data: { ...rest, passwordHash }, select: SAFE_SELECT });
  }

  findAll() {
    return this.db.user.findMany({ select: SAFE_SELECT, orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({ where: { id }, select: SAFE_SELECT });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Called by AuthService in Week 3 — returns the raw row including passwordHash
  findByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    const { password, ...rest } = dto as any;
    const data: any = { ...rest };
    if (password) data.passwordHash = await bcrypt.hash(password, 12);
    return this.db.user.update({ where: { id }, data, select: SAFE_SELECT });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.user.delete({ where: { id } });
  }
}
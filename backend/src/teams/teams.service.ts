import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';

@Injectable()
export class TeamsService {
  constructor(private readonly db: PrismaService) {}

  create(dto: CreateTeamDto) {
    return this.db.team.create({ data: dto });
  }

  findAll(search?: string) {
    return this.db.team.findMany({
      where: search
        ? { name: { contains: search, mode: 'insensitive' } }
        : undefined,
      include: { _count: { select: { users: true, projects: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const team = await this.db.team.findUnique({
      where: { id },
      include: { users: true, projects: true },
    });
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async update(id: string, dto: UpdateTeamDto) {
    await this.findOne(id);  // throws 404 if not found
    return this.db.team.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.team.delete({ where: { id } });
  }
}
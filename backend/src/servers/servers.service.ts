import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService }   from '../prisma/prisma.service.js';
import { CreateServerDto } from './dto/create-server.dto.js';
import { UpdateServerDto } from './dto/update-server.dto.js';

@Injectable()
export class ServersService {
  constructor(private readonly db: PrismaService) {}

  create(dto: CreateServerDto) {
    return this.db.server.create({ data: dto });
  }

  findAll(projectId?: string, status?: string) {
    return this.db.server.findMany({
      where: {
        ...(projectId ? { projectId }            : {}),
        ...(status    ? { status: status as any } : {}),
      },
      include: {
        applications: true,
        _count: { select: { metrics: true, alerts: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const s = await this.db.server.findUnique({
      where: { id },
      include: { project: true, applications: true, alerts: true },
    });
    if (!s) throw new NotFoundException('Server not found');
    return s;
  }

  async update(id: string, dto: UpdateServerDto) {
    await this.findOne(id);
    return this.db.server.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.server.delete({ where: { id } });
  }
}
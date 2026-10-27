import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService }    from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';   // PartialType(CreateProjectDto)

@Injectable()
export class ProjectsService {
  constructor(private readonly db: PrismaService) {}

  create(dto: CreateProjectDto) {
    return this.db.project.create({ data: dto });
  }

  findAll(teamId?: string, status?: string) {
    return this.db.project.findMany({
      where: {
        ...(teamId ? { teamId }               : {}),
        ...(status ? { status: status as any } : {}),
      },
      include: { team: true, _count: { select: { servers: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const p = await this.db.project.findUnique({
      where: { id },
      include: { team: true, servers: true },
    });
    if (!p) throw new NotFoundException('Project not found');
    return p;
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.db.project.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.project.delete({ where: { id } });
  }
}
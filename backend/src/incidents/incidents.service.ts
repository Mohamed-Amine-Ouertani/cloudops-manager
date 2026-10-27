import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class IncidentsService {
  constructor(private readonly db: PrismaService) {}

  // ?resolved=true → closed only  |  ?resolved=false → open only  |  omit → all
  findAll(resolved?: string) {
    const where =
      resolved === 'true'  ? { resolvedAt: { not: null } } :
      resolved === 'false' ? { resolvedAt: null }           : undefined;
    return this.db.incident.findMany({
      where,
      include: { alert: { include: { server: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const inc = await this.db.incident.findUnique({
      where: { id },
      include: { alert: { include: { server: true } } },
    });
    if (!inc) throw new NotFoundException('Incident not found');
    return inc;
  }

  // PATCH /incidents/:id/resolve  → mark incident as handled
  async resolve(id: string) {
    await this.findOne(id);
    return this.db.incident.update({
      where: { id }, data: { resolvedAt: new Date() },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.incident.delete({ where: { id } });
  }
}
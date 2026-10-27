import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MetricsService {
  constructor(private readonly db: PrismaService) {}

  // Generate a random metric snapshot — used until you hook up real collectors
  async simulate(serverId: string) {
    const exists = await this.db.server.findUnique({ where: { id: serverId } });
    if (!exists) throw new NotFoundException('Server not found');
    return this.db.metric.create({
      data: {
        serverId,
        cpuUsage:  +((Math.random() * 100).toFixed(2)),
        ramUsage:  +((Math.random() * 100).toFixed(2)),
        diskUsage: +((Math.random() * 100).toFixed(2)),
      },
    });
  }

  // Returns last N snapshots sorted newest-first — used for the line chart
  findByServer(serverId: string, limit = 60) {
    return this.db.metric.findMany({
      where:   { serverId },
      orderBy: { recordedAt: 'desc' },
      take:    Number(limit),
    });
  }

  // Single latest snapshot — used for the server status card
  findLatest(serverId: string) {
    return this.db.metric.findFirst({
      where:   { serverId },
      orderBy: { recordedAt: 'desc' },
    });
  }
}
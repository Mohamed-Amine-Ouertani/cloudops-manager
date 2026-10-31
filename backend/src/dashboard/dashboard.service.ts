// src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(private readonly db: PrismaService) {}

  async getStats() {
    const [teams, projects, servers, applications, alerts, incidents] =
      await Promise.all([
        this.db.team.count(),
        this.db.project.count(),
        this.db.server.count(),
        this.db.application.count(),
        this.db.alert.count({ where: { isActive: true } }),
        this.db.incident.count({ where: { resolvedAt: null } }),
      ]);

    const serversByStatus = await this.db.server.groupBy({
      by: ['status'],
      _count: { _all: true },
    });

    return { teams, projects, servers, applications, alerts, incidents, serversByStatus };
  }
}
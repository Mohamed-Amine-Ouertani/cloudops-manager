import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService }  from '../prisma/prisma.service.js';
import { CreateAlertDto } from './dto/create-alert.dto.js';
import { UpdateAlertDto } from './dto/update-alert.dto.js';

@Injectable()
export class AlertsService {
  constructor(private readonly db: PrismaService) {}

  create(dto: CreateAlertDto) { return this.db.alert.create({ data: dto }); }

  findAll(serverId?: string) {
    return this.db.alert.findMany({
      where:   serverId ? { serverId } : undefined,
      include: { _count: { select: { incidents: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const a = await this.db.alert.findUnique({
      where: { id },
      include: { incidents: { orderBy: { createdAt: 'desc' }, take: 10 } },
    });
    if (!a) throw new NotFoundException('Alert not found');
    return a;
  }

  async update(id: string, dto: UpdateAlertDto) {
    await this.findOne(id);
    return this.db.alert.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.db.alert.delete({ where: { id } });
  }

  // ── Core business logic ── called by MetricsService after every snapshot ─
  // Wire this up in Week 6 when you add the cron / WebSocket refresh.
  async checkThresholds(serverId: string): Promise<void> {
    const latest = await this.db.metric.findFirst({
      where: { serverId }, orderBy: { recordedAt: 'desc' },
    });
    if (!latest) return;

    const activeAlerts = await this.db.alert.findMany({
      where: { serverId, isActive: true },
    });

    for (const alert of activeAlerts) {
      const value =
        alert.metricType === 'CPU'  ? latest.cpuUsage  :
        alert.metricType === 'RAM'  ? latest.ramUsage  :
        (latest.diskUsage ?? 0);

      if (value >= alert.threshold) {
        await this.db.incident.create({
          data: {
            alertId: alert.id,
            value,
            message:
              alert.metricType + ' at ' + value.toFixed(1) +
              '% exceeded threshold of ' + alert.threshold + '%',
          },
        });
      }
    }
  }
}
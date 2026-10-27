import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { MetricsService } from './metrics.service.js';

@ApiTags('metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly svc: MetricsService) {}

  // Simulate a new snapshot — call this from Postman or a cron in Week 6
  @Post('simulate/:serverId')
  @ApiOperation({ summary: 'Generate a simulated metric snapshot for a server' })
  simulate(@Param('serverId') id: string) { return this.svc.simulate(id); }

  // Fetch chart data:  GET /metrics/server/:id?limit=60
  @Get('server/:serverId')
  @ApiOperation({ summary: 'Recent metric history for a server (chart data)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Max snapshots (default 60)' })
  findByServer(@Param('serverId') id: string, @Query('limit') limit?: number) {
    return this.svc.findByServer(id, limit);
  }

  // Current load  →  GET /metrics/server/:id/latest
  @Get('server/:serverId/latest')
  @ApiOperation({ summary: 'Latest metric snapshot for the status card' })
  latest(@Param('serverId') id: string) { return this.svc.findLatest(id); }
}
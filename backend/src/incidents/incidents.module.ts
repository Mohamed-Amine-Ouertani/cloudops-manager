import { Module } from '@nestjs/common';
import { IncidentsService } from './incidents.service.js';
import { IncidentsController } from './incidents.controller.js';

@Module({
  providers: [IncidentsService],
  controllers: [IncidentsController]
})
export class IncidentsModule {}

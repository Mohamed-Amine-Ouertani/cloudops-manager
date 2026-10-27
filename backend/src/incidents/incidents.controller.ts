import { Controller, Get, Patch, Delete, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IncidentsService } from './incidents.service.js';

@ApiTags('incidents')
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly svc: IncidentsService) {}

  @Get()
  @ApiOperation({ summary: 'List incidents (filter by resolved status)' })
  @ApiQuery({ name: 'resolved', required: false, description: 'true | false' })
  findAll(@Query('resolved') resolved?: string) { return this.svc.findAll(resolved); }

  @Get(':id')
  @ApiOperation({ summary: 'Get one incident with its alert and server' })
  findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Patch(':id/resolve')
  @ApiOperation({ summary: 'Mark an incident as resolved' })
  resolve(@Param('id') id: string) { return this.svc.resolve(id); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an incident record' })
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}
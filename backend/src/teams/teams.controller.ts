import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { TeamsService }  from './teams.service.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly svc: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a team' })
  create(@Body() dto: CreateTeamDto) { return this.svc.create(dto); }

  @Get()
  @ApiOperation({ summary: 'List teams' })
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query('search') search?: string) { return this.svc.findAll(search); }

  @Get(':id')
  @ApiOperation({ summary: 'Get one team with members and projects' })
  findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a team' })
  update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team' })
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}

// ── This controller structure is the same for every module. ──────────────
// Copy it, replace TeamsService → XxxService, and update @ApiTags + @Controller.
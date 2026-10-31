// teams/teams.controller.ts  — updated for Week 3
import {
  Controller, Get, Post, Body, Patch, Param, Delete, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { TeamsService }  from './teams.service.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
import { Roles }         from '../auth/decorators/roles.decorator.js';
import { CurrentUser }   from '../auth/decorators/current-user.decorator.js';

// @ApiBearerAuth() tells Swagger this controller needs the Authorization header.
// Add it at class level to apply to ALL methods, or per method for fine-grained docs.
@ApiTags('teams')
@ApiBearerAuth()
@Controller('teams')
export class TeamsController {
  constructor(private readonly svc: TeamsService) {}

  // ADMIN and DEVOPS can create teams; VIEWER cannot
  @Post()
  @Roles(Role.ADMIN, Role.DEVOPS)
  @ApiOperation({ summary: 'Create a team  [ADMIN, DEVOPS]' })
  create(@Body() dto: CreateTeamDto) { return this.svc.create(dto); }

  // Any authenticated user can list teams (no @Roles = open to all roles)
  @Get()
  @ApiOperation({ summary: 'List teams  [ALL]' })
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query('search') search?: string) { return this.svc.findAll(search); }

  @Get(':id')
  @ApiOperation({ summary: 'Get one team  [ALL]' })
  findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.DEVOPS)
  @ApiOperation({ summary: 'Update a team  [ADMIN, DEVOPS]' })
  update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.svc.update(id, dto);
  }

  // Only ADMIN can delete — destructive action
  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a team  [ADMIN only]' })
  remove(@Param('id') id: string) { return this.svc.remove(id); }

  // Example of using @CurrentUser() — get the logged-in user inside a handler
  @Get('me/teams')
  @ApiOperation({ summary: 'My team (inferred from token)' })
  myTeam(@CurrentUser() user: { id: string; role: string }) {
    // user.id comes from the JWT — no need to trust a query param
    return this.svc.findAll();
  }
}

// ── Apply the same pattern to every other controller ─────────────────────────
//
// RBAC summary for CloudOps Manager:
//   POST   (create)  → ADMIN, DEVOPS
//   GET    (read)    → ALL  (no @Roles needed)
//   PATCH  (update)  → ADMIN, DEVOPS
//   DELETE (delete)  → ADMIN only
//
// Exceptions:
//   POST /metrics/simulate  → ADMIN, DEVOPS
//   PATCH /incidents/:id/resolve → ADMIN, DEVOPS
//   POST /auth/register|login    → @Public() (no token needed)
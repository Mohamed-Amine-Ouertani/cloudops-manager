import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule }       from './prisma/prisma.module.js';
import { TeamsModule }        from './teams/teams.module.js';
import { UsersModule }        from './users/users.module.js';
import { ProjectsModule }     from './projects/projects.module.js';
import { ServersModule }      from './servers/servers.module.js';
import { ApplicationsModule } from './applications/applications.module.js';
import { MetricsModule }      from './metrics/metrics.module.js';
import { AlertsModule }       from './alerts/alerts.module.js';
import { IncidentsModule }    from './incidents/incidents.module.js';
import { AuthModule } from './auth/auth.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule,          // @Global() — no need to import elsewhere
    TeamsModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    ServersModule,
    ApplicationsModule,
    MetricsModule,
    AlertsModule,
    IncidentsModule,
    DashboardModule,
  ],
})
export class AppModule {}
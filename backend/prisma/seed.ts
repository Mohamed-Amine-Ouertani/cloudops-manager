// prisma/seed.ts
import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, Provider, ServerStatus, Environment, AppStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Set up the connection pool and driver adapter for Prisma v7
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

async function main() {
  // Team
  const team = await db.team.create({
    data: { name: 'Platform Engineering', description: 'Owns cloud infra' },
  });

  // Users
  await db.user.createMany({
    data: [
      {
        email: 'admin@cloudops.dev', firstName: 'Admin', lastName: 'User',
        passwordHash: await bcrypt.hash('Admin1234!', 12),
        role: Role.ADMIN, teamId: team.id,
      },
      {
        email: 'devops@cloudops.dev', firstName: 'Mohamed', lastName: 'DevOps',
        passwordHash: await bcrypt.hash('Devops1234!', 12),
        role: Role.DEVOPS, teamId: team.id,
      },
    ],
  });

  // Project
  const project = await db.project.create({
    data: {
      name: 'E-Commerce Platform', environment: Environment.PRODUCTION,
      teamId: team.id,
    },
  });

  // Servers
  const servers = await Promise.all([
    db.server.create({
      data: {
        name: 'prod-web-01', provider: Provider.AWS, region: 'eu-west-1',
        ipAddress: '54.1.2.3', cpu: 4, ram: 16, storage: 100,
        status: ServerStatus.ONLINE, projectId: project.id,
      },
    }),
    db.server.create({
      data: {
        name: 'prod-db-01', provider: Provider.AWS, region: 'eu-west-1',
        ipAddress: '54.1.2.4', cpu: 8, ram: 32, storage: 500,
        status: ServerStatus.ONLINE, projectId: project.id,
      },
    }),
  ]);

  // Applications + Metrics + Alerts per server
  for (const server of servers) {
    await db.application.create({
      data: {
        name: 'api-gateway', version: '1.0.0',
        environment: Environment.PRODUCTION,
        status: AppStatus.RUNNING, serverId: server.id,
      },
    });

    // Seed 5 metric snapshots
    for (let i = 0; i < 5; i++) {
      await db.metric.create({
        data: {
          serverId: server.id,
          cpuUsage:  parseFloat((Math.random() * 100).toFixed(2)),
          ramUsage:  parseFloat((Math.random() * 100).toFixed(2)),
          diskUsage: parseFloat((Math.random() * 100).toFixed(2)),
          recordedAt: new Date(Date.now() - i * 30_000),
        },
      });
    }

    await db.alert.create({
      data: {
        name: 'High CPU', metricType: 'CPU', threshold: 85,
        severity: 'WARNING', serverId: server.id,
      },
    });
  }

  console.log('✅  Seed complete');
}

main()
  .catch(console.error)
  .finally(async () => {
    await db.$disconnect();
    await pool.end(); // Close the pool so the process exits cleanly
  });
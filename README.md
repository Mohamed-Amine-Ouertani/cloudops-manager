PHASE 0 — BEFORE WRITING CODE

# CloudOps Manager

Data Model · Architecture · Prisma Schema · Enums

Identity — Team, User

Project Management

Infrastructure — Server, Application

Monitoring — Metric

Alerting — Alert, Incident

**Local dev:** run `docker compose up -d` — spins up Next.js + NestJS + PostgreSQL together.\
**Week 7 deployment:** same Compose file works on a VPS. For the AWS bonus (+2 pts): EC2 + RDS (PostgreSQL managed) + ECR for container images.

```
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── ENUMS ───────────────────────────────────────────

enum Role         { ADMIN DEVOPS VIEWER }
enum Environment  { DEVELOPMENT STAGING PRODUCTION }
enum ProjectStatus{ ACTIVE ARCHIVED PAUSED }
enum Provider     { AWS AZURE GCP HETZNER OVH OTHER }
enum ServerStatus { ONLINE OFFLINE MAINTENANCE }
enum AppStatus    { RUNNING STOPPED ERROR }
enum MetricType   { CPU RAM DISK }
enum Severity     { INFO WARNING CRITICAL }

// ─── MODELS ──────────────────────────────────────────

model Team {
  id          String   @id @default(uuid())
  name        String
  description String?
  createdAt   DateTime @default(now())

  users    User[]
  projects Project[]
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  firstName    String
  lastName     String
  role         Role     @default(VIEWER)
  createdAt    DateTime @default(now())

  teamId String
  team   Team   @relation(fields: [teamId], references: [id])
}

model Project {
  id          String        @id @default(uuid())
  name        String
  description String?
  environment Environment   @default(DEVELOPMENT)
  status      ProjectStatus @default(ACTIVE)
  createdAt   DateTime      @default(now())

  teamId  String
  team    Team     @relation(fields: [teamId], references: [id])
  servers Server[]
}

model Server {
  id        String       @id @default(uuid())
  name      String
  provider  Provider
  region    String
  ipAddress String
  cpu       Int          // cores
  ram       Int          // GB
  storage   Int          // GB
  status    ServerStatus @default(OFFLINE)
  createdAt DateTime     @default(now())

  projectId    String
  project      Project       @relation(fields: [projectId], references: [id])
  applications Application[]
  metrics      Metric[]
  alerts       Alert[]
}

model Application {
  id          String      @id @default(uuid())
  name        String
  version     String
  environment Environment
  status      AppStatus   @default(STOPPED)
  createdAt   DateTime    @default(now())

  serverId String
  server   Server @relation(fields: [serverId], references: [id])
}

model Metric {
  id         String   @id @default(uuid())
  cpuUsage   Float    // percentage 0-100
  ramUsage   Float    // percentage 0-100
  diskUsage  Float?   // percentage 0-100 (optional)
  recordedAt DateTime @default(now())

  serverId String
  server   Server @relation(fields: [serverId], references: [id])
}

model Alert {
  id         String     @id @default(uuid())
  name       String
  metricType MetricType
  threshold  Float      // e.g. 80.0 for 80% CPU
  severity   Severity   @default(WARNING)
  isActive   Boolean    @default(true)
  createdAt  DateTime   @default(now())

  serverId  String
  server    Server     @relation(fields: [serverId], references: [id])
  incidents Incident[]
}

model Incident {
  id         String    @id @default(uuid())
  message    String
  value      Float     // metric value that triggered the alert
  resolvedAt DateTime?
  createdAt  DateTime  @default(now())

  alertId String
  alert   Alert  @relation(fields: [alertId], references: [id])
}
```

8 enums — copy these directly into your schema.prisma

Role

ADMIN — full access

DEVOPS — manage infra

VIEWER — read only

Environment

DEVELOPMENT

STAGING

PRODUCTION

ProjectStatus

ACTIVE

ARCHIVED

PAUSED

Provider

AWS

AZURE

GCP

HETZNER

OVH

OTHER

ServerStatus

ONLINE

OFFLINE

MAINTENANCE

AppStatus

RUNNING

STOPPED

ERROR

MetricType

CPU

RAM

DISK

Severity

INFO

WARNING

CRITICAL

**Week 1 tip:** define all enums in `schema.prisma` first, even before models. Run `npx prisma migrate dev --name init` after defining all 8 models. This creates the PostgreSQL types automatically — no manual SQL needed.
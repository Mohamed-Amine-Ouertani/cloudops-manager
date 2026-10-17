# CloudOps Manager

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/Backend-NestJS-e0234e?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169e1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Containerization-Docker-2496ed?style=flat-square&logo=docker)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlib.com/)

---

## 🚀 Project Overview

**CloudOps Manager** is a full-stack internal DevOps dashboard designed to centralize the management of cloud projects, servers, applications, real-time monitoring metrics, and infrastructure alerts. Built as a lightweight, self-hosted alternative to tools like Grafana, Portainer, and enterprise project trackers, it provides a unified interface for administrative and engineering teams.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS, TanStack React Query, Recharts, Lucide Icons |
| **Backend** | NestJS, TypeScript, REST API, Passport.js (JWT) |
| **Database & ORM** | PostgreSQL, Prisma ORM |
| **Security** | JWT Authentication, Role-Based Access Control (RBAC), Guards, DTO Validation |
| **Testing** | Jest (Unit & Integration tests) |
| **Infrastructure** | Docker, Docker Compose, AWS / Cloud VPS |

---

## 🏛️ System Architecture

[Link text](https://mohamed-amine-ouertani.github.io/cloudops-manager/)
```text
               ┌─────────────────────────────────────┐
               │            Browser (User)           │
               └──────────────┬──────────────────────┘
                              │ HTTPS
               ┌──────────────▼──────────────────────┐
               │         Next.js Frontend            │
               │         (App Router, TypeScript)    │
               └──────────────┬──────────────────────┘
                              │ REST API calls
               ┌──────────────▼──────────────────────┐
               │         NestJS Backend              │
               │         (JWT, Guards, Swagger)      │
               └──────┬───────────────────┬──────────┘
                      │                   │
               ┌──────▼──────┐    ┌───────▼──────────┐
               │ PostgreSQL  │    │  Redis (Caching) │
               │  (Prisma)   │    │    (Optional)    │
               └─────────────┘    └──────────────────┘


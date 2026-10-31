// types/index.ts
export interface AuthUser {
  id: string; email: string; role: 'ADMIN' | 'DEVOPS' | 'VIEWER';
}
export interface Team {
  id: string; name: string; description?: string; createdAt: string;
  _count?: { users: number; projects: number };
}
export interface Project {
  id: string; name: string; description?: string; teamId: string; createdAt: string;
  environment: 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';
  status: 'ACTIVE' | 'ARCHIVED' | 'PAUSED';
}
export interface Server {
  id: string; name: string; provider: string; region: string;
  ipAddress: string; cpu: number; ram: number; storage: number;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE';
  projectId: string; createdAt: string;
  _count?: { metrics: number; alerts: number };
}
export interface Application {
  id: string; name: string; version: string; environment: string;
  status: 'RUNNING' | 'STOPPED' | 'ERROR';
  serverId: string; createdAt: string;
}
export interface Metric {
  id: string; cpuUsage: number; ramUsage: number;
  diskUsage?: number; recordedAt: string; serverId: string;
}
export interface Alert {
  id: string; name: string; metricType: 'CPU' | 'RAM' | 'DISK';
  threshold: number; severity: 'INFO' | 'WARNING' | 'CRITICAL';
  isActive: boolean; serverId: string;
  _count?: { incidents: number };
}
export interface Incident {
  id: string; message: string; value: number;
  resolvedAt?: string; createdAt: string; alertId: string;
  alert?: Alert & { server?: Server };
}
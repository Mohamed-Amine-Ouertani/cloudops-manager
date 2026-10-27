import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

// @Global() registers PrismaService application-wide.
// Every module gets it injected without needing to import PrismaModule.
@Global()
@Module({
  providers: [PrismaService],
  exports:   [PrismaService],
})
export class PrismaModule {}
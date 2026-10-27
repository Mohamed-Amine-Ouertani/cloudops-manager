import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller.js';
import { TeamsService }    from './teams.service.js';

@Module({
  controllers: [TeamsController],
  providers:   [TeamsService],
  exports:     [TeamsService],   // export so AuthModule can reuse in Week 3
})
export class TeamsModule {}

// ── All 8 feature modules share EXACTLY this shape. ───────────────────────
// Just swap the class names. NestJS CLI generates this boilerplate for you:
//   nest g module teams && nest g service teams && nest g controller teams
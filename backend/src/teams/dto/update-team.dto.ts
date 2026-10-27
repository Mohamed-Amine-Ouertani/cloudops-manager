import { PartialType } from '@nestjs/swagger';
import { CreateTeamDto } from './create-team.dto.js';

// PartialType makes EVERY field of CreateTeamDto optional.
// This is the standard pattern for all UpdateXDto files.
export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
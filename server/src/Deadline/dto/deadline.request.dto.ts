import { DeadlineStatus } from '@prisma/client';

export class CreateDeadlineRequesDto {
  title: string;
  description?: string;
  status: DeadlineStatus;
  dueDate: Date;
}

export class UpdateDeadlineRequestDto {
  title: string;
  description: string;
  status: DeadlineStatus;
  dueDate: Date;
}

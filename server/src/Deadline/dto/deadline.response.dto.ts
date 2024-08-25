import { DeadlineStatus } from '@prisma/client';
import { Expose } from 'class-transformer';

export class CreateDeadlineResponseDto {
  @Expose()
  id: number;
  @Expose()
  projectId: number;
}

export class UpdateDeadlineResponseDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  status: DeadlineStatus;
  @Expose()
  dueDate: Date;
  @Expose()
  projectId: number;
}

export class GetDeadlineByIdResponseDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  description?: string;
  @Expose()
  status: DeadlineStatus;
  @Expose()
  dueDate: Date;
  @Expose()
  createdAt: Date;
}

export class GetAllDeadlineResponseDto {
  @Expose()
  deadlines: GetDeadlineByIdResponseDto[] = [];
}

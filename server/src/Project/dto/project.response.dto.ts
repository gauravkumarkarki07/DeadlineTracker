import { Expose } from 'class-transformer';

export class CreateProjectResponseDto {
  @Expose()
  id: number;
}

export class GetProjectResponseDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  description?: string;
  @Expose()
  accountId: number;
  @Expose()
  createdAt: Date;
  @Expose()
  deadlinesCount: number;
}

export class GetAllProjectResponseDto {
  @Expose()
  projects: GetProjectResponseDto[] = [];
}

export class UpcommingDeadlineResponseDto {
  @Expose()
  id: number;
  @Expose()
  title: string;
  @Expose()
  projectId: number;
  @Expose()
  projectName: string;
  @Expose()
  status: string;
  @Expose()
  dueDate: Date;
}
export class GetUpcommingDeadlineResponseDto {
  @Expose()
  upCommingDeadlines: UpcommingDeadlineResponseDto[] = [];
}

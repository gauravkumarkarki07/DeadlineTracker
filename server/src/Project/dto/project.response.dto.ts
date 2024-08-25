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
}
export class GetAllProjectResponseDto {
  @Expose()
  projects: GetProjectResponseDto[] = [];
}

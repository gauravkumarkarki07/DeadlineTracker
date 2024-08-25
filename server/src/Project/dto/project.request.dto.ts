export class CreateProjectRequestDto {
  name: string;
  description?: string;
}

export class GetProjectRequestDto {
  id: number;
  accountId: number;
}

export class GetAllProjectRequestDto {
  accountId: number;
}

import { plainToInstance as plainToInstanceImport } from 'class-transformer';

export class DtoMapper {
  public static toDto<Entity, Dto>(
    entity: Entity,
    dtoClass: new () => Dto,
  ): Dto {
    return plainToInstanceImport(dtoClass, entity, {
      excludeExtraneousValues: true,
    });
  }
}

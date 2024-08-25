import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/Database/database.service';
import {
  CreateDeadlineRequesDto,
  UpdateDeadlineRequestDto,
} from './dto/deadline.request.dto';
import {
  CreateDeadlineResponseDto,
  GetAllDeadlineResponseDto,
  GetDeadlineByIdResponseDto,
  UpdateDeadlineResponseDto,
} from './dto/deadline.response.dto';
import { DtoMapper } from 'src/Utils/dtoMapper';

@Injectable()
export class DeadlineService {
  constructor(private readonly databaseService: DatabaseService) {}

  //Create Deadline
  async createDeadline(
    projectId: number,
    data: CreateDeadlineRequesDto,
  ): Promise<CreateDeadlineResponseDto> {
    const project = Number(projectId);
    try {
      const newDeadline = await this.databaseService.deadline.create({
        data: {
          ...data,
          projectId: project,
        },
      });
      if (!newDeadline) {
        throw new HttpException(
          'Deadline cannot be created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const response = DtoMapper.toDto(newDeadline, CreateDeadlineResponseDto);
      return response;
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Update Deadline
  async updateDeadline(
    deadlineId: number,
    projectId: number,
    updatedData: UpdateDeadlineRequestDto,
  ): Promise<UpdateDeadlineResponseDto> {
    const id = Number(deadlineId);
    const project = Number(projectId);
    try {
      const exitingDeadline = await this.databaseService.deadline.findUnique({
        where: {
          id: id,
          projectId: project,
        },
      });
      if (!exitingDeadline) {
        throw new NotFoundException('Deadline is not found');
      }
      const updatedDeadline = await this.databaseService.deadline.update({
        where: {
          id: id,
          projectId: project,
        },
        data: updatedData,
      });
      if (!updatedDeadline) {
        throw new HttpException(
          'Cannot update deadline',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const response = DtoMapper.toDto(
        updatedDeadline,
        UpdateDeadlineResponseDto,
      );
      return response;
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Get deadline by id
  async getDeadlineById(
    deadlineId: number,
    projectId: number,
  ): Promise<GetDeadlineByIdResponseDto> {
    const id = Number(deadlineId);
    const project = Number(projectId);
    try {
      const deadline = await this.databaseService.deadline.findUnique({
        where: {
          id: id,
          projectId: project,
        },
      });
      if (!deadline) {
        throw new NotFoundException('Deadline is not found');
      }
      const response = DtoMapper.toDto(deadline, GetDeadlineByIdResponseDto);
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  //Get All deadline
  async getAllDeadline(projectId: number): Promise<GetAllDeadlineResponseDto> {
    const project = Number(projectId);
    try {
      const allDeadlines = await this.databaseService.deadline.findMany({
        where: {
          projectId: project,
        },
      });
      const responseArray = allDeadlines.map((deadline) =>
        DtoMapper.toDto(deadline, GetDeadlineByIdResponseDto),
      );
      const response = new GetAllDeadlineResponseDto();
      response.deadlines = responseArray;
      return response;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  //Delete Deadline
  async deleteDeadline(deadlineId: number, projectId: number): Promise<void> {
    const id = Number(deadlineId);
    const project = Number(projectId);
    try {
      const getDeadline = await this.databaseService.deadline.findUnique({
        where: {
          id: id,
          projectId: project,
        },
      });
      if (!getDeadline) {
        throw new InternalServerErrorException('Cannot find deadline');
      }
      const deleteDeadline = await this.databaseService.deadline.delete({
        where: {
          id: id,
          projectId: project,
        },
      });
      if (!deleteDeadline) {
        throw new InternalServerErrorException('Cannot delete deadline');
      }
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }
}

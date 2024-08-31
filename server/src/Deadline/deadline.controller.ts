import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeadlineService } from './deadline.service';
import {
  CreateDeadlineResponseDto,
  GetAllDeadlineResponseDto,
  GetDeadlineByIdResponseDto,
  UpdateDeadlineResponseDto,
} from './dto/deadline.response.dto';
import {
  CreateDeadlineRequesDto,
  UpdateDeadlineRequestDto,
} from './dto/deadline.request.dto';

@Controller('deadline')
export class DeadlineController {
  constructor(private readonly deadlineService: DeadlineService) {}

  @Get(':projectId')
  async getAllDeadlines(
    @Param('projectId') projectId: number,
  ): Promise<GetAllDeadlineResponseDto> {
    return this.deadlineService.getAllDeadline(projectId);
  }

  @Get(':deadlineId/:projectId')
  async getDeadlineById(
    @Param('deadlineId') deadlineId: number,
    @Param('projectId') projectId: number,
  ): Promise<GetDeadlineByIdResponseDto> {
    return this.deadlineService.getDeadlineById(deadlineId, projectId);
  }

  @Post(':projectId')
  async createDeadline(
    @Param('projectId')
    projectId: number,
    @Body()
    data: CreateDeadlineRequesDto,
  ): Promise<CreateDeadlineResponseDto> {
    return this.deadlineService.createDeadline(projectId, data);
  }

  @Put(':deadlineId/:projectId')
  async updateDeadline(
    @Param('deadlineId') deadlineId: number,
    @Param('projectId') projectId: number,
    @Body() updatedData: UpdateDeadlineRequestDto,
  ): Promise<UpdateDeadlineResponseDto> {
    return this.deadlineService.updateDeadline(
      deadlineId,
      projectId,
      updatedData,
    );
  }

  @Delete(':deadlineId/:projectId')
  async deleteDeadline(
    @Param('deadlineId') deadlineId: number,
    @Param('projectId') projectId: number,
  ): Promise<GetDeadlineByIdResponseDto> {
    return this.deadlineService.deleteDeadline(deadlineId, projectId);
  }
}

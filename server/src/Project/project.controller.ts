import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { GetAllProjectResponseDto } from './dto/project.response.dto';
import { CreateProjectRequestDto } from './dto/project.request.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':accountId')
  async getAllProjects(
    @Param('accountId') accountId: number,
  ): Promise<GetAllProjectResponseDto> {
    return this.projectService.getAllProject(accountId);
  }

  @Get(':accountId/:projectId')
  async getProjectById(
    @Param('accountId') accountId: number,
    @Param('projectId') projectId: number,
  ) {
    return this.projectService.getProjectById(accountId, projectId);
  }

  @Post(':accountId')
  async createProject(
    @Param('accountId') accountId: number,
    @Body() data: CreateProjectRequestDto,
  ) {
    return this.projectService.createProject(accountId, data);
  }

  @Put(':accountId/:projectId')
  async updateProject(
    @Param('accountId') accountId: number,
    @Param('projectId') projectId: number,
    @Body() updatedData: CreateProjectRequestDto,
  ) {
    return this.projectService.updateProject(accountId, projectId, updatedData);
  }

  @Delete(':accountId/:projectId')
  async deleteProject(
    @Param('accountId') accountId: number,
    @Param('projectId') projectId: number,
  ) {
    return this.projectService.deleteProject(accountId, projectId);
  }
}

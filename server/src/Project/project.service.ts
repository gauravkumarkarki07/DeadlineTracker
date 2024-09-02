import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/Database/database.service';
import { CreateProjectRequestDto } from './dto/project.request.dto';
import {
  CreateProjectResponseDto,
  GetAllProjectResponseDto,
  GetProjectResponseDto,
  UpcommingDeadlineResponseDto,
} from './dto/project.response.dto';
import { DtoMapper } from 'src/Utils/dtoMapper';

@Injectable()
export class ProjectService {
  constructor(private readonly databaseService: DatabaseService) {}

  //Create Project
  async createProject(
    accountId: number,
    data: CreateProjectRequestDto,
  ): Promise<CreateProjectResponseDto> {
    const account = Number(accountId);
    try {
      const newProject = await this.databaseService.project.create({
        data: {
          ...data,
          accountId: account,
        },
      });
      if (!newProject) {
        throw new HttpException(
          'Cannot create project',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const response = DtoMapper.toDto(newProject, CreateProjectResponseDto);
      return response;
    } catch (error) {
      console.log('Error', error);
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Get Project By Id
  async getProjectById(
    accountId: number,
    projectId: number,
  ): Promise<GetProjectResponseDto> {
    const project = Number(projectId);
    const account = Number(accountId);
    try {
      const projectById = await this.databaseService.project.findUnique({
        where: {
          id: project,
          accountId: account,
        },
      });
      if (!projectById) {
        throw new NotFoundException('Project not found');
      }
      const response = DtoMapper.toDto(projectById, GetProjectResponseDto);
      return response;
    } catch (error) {
      throw new Error('Server error');
    }
  }

  //Get All Project
  async getAllProject(accountId: number): Promise<GetAllProjectResponseDto> {
    const account = Number(accountId);
    try {
      const allProjects = await this.databaseService.project.findMany({
        where: {
          accountId: account,
        },
      });
      const responseArray = allProjects.map((projects) =>
        DtoMapper.toDto(projects, GetProjectResponseDto),
      );
      const response = new GetAllProjectResponseDto();
      response.projects = responseArray;

      return response;
    } catch (error) {
      throw new Error('Server Error');
    }
  }

  //Update Project
  async updateProject(
    accountId: number,
    projectId: number,
    updatedData: CreateProjectRequestDto,
  ): Promise<GetProjectResponseDto> {
    const account = Number(accountId);
    const project = Number(projectId);
    try {
      const existingProject = await this.databaseService.project.findUnique({
        where: {
          id: project,
          accountId: account,
        },
      });
      if (!existingProject) {
        throw new NotFoundException('Project not found');
      }
      const updatedProject = await this.databaseService.project.update({
        where: {
          id: project,
        },
        data: updatedData,
      });
      const response = DtoMapper.toDto(updatedProject, GetProjectResponseDto);
      return response;
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Delete Project
  async deleteProject(accountId: number, projectId: number): Promise<boolean> {
    const account = Number(accountId);
    const project = Number(projectId);

    try {
      await this.databaseService.$transaction(async (trx) => {
        const existingProject = await trx.project.findUnique({
          where: {
            id: project,
            accountId: account,
          },
        });

        if (!existingProject) {
          throw new NotFoundException('Project Not Found');
        }

        const referenceDeadlines = await trx.deadline.findMany({
          where: {
            projectId: project,
          },
        });

        if (referenceDeadlines.length > 0) {
          await trx.deadline.deleteMany({
            where: {
              projectId: project,
            },
          });
        }

        await trx.project.delete({
          where: {
            id: project,
          },
        });
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  //Get Upcomming Project Deadlines
  async getUpcommingDeadline(accountId: number) {
    const account = Number(accountId);
    try {
      const upcommingDeadlines = await this.databaseService.project.findMany({
        where: {
          accountId: account,
        },
        include: {
          deadlines: true,
        },
      });

      const response: UpcommingDeadlineResponseDto[] = upcommingDeadlines
        .flatMap((project) => project.deadlines)
        .filter((deadline) => new Date(deadline.dueDate) > new Date())
        .map((deadline) =>
          DtoMapper.toDto(
            {
              ...deadline,
              projectName:
                upcommingDeadlines.find((p) => p.id === deadline.projectId)
                  ?.name || 'Unknown Project',
            },
            UpcommingDeadlineResponseDto,
          ),
        );

      return response;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }
}

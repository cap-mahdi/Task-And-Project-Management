import { Controller, ForbiddenException, Get, Post } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  getApp(): string {
    return 'Welcome to the Task Management App';
  }
  @Post()
  postApp(): string {
    return 'Welcome to the Task Management App';
  }

  @Get('error')
  getError(): string {
    throw new ForbiddenException();
  }
}

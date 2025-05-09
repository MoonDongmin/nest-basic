import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import e from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  postUSer(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.usersService.createUser(nickname, email, password);
  }

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../../../db/schema/users';

@Controller('users')
export class UserController {

  constructor(private service: UserService) {
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.service.findOneUser(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAllUser();
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.service.createUser(user);
  }

  @Delete()
  delete(@Param('id') id: string): Promise<void> {
    return this.service.deleteOneUser(+id);
  }

  @Put(':id')
  put(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.service.updateUser({ ...user, id: id });
  }
}

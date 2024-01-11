import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ZodValidationPipe } from '../../../config/zodValidationPipe';
import { User } from '../repository/user.repository';
import { requiredUserValidation } from '../../../db/schema/usersEntity';

@Controller('users')
export class UserController {

  constructor(private service: UserService) {
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.findOneUser(id);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.service.findAllUser();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(requiredUserValidation))
  create(@Body() user: User): Promise<User> {
    return this.service.createUser(user);
  }

  @Delete()
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.deleteOneUser(id);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(requiredUserValidation))
  put(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<User> {
    return this.service.updateUser({ ...user, id: id });
  }
}

import { Injectable } from '@nestjs/common';
import { deleteOneUser, findAllUser, findOneUser, insertUser, updateUser, User } from '../../../db/schema/users';

@Injectable()
export class UserService {

  constructor() {
  }

  async createUser(user: User): Promise<User> {
    return insertUser(user);
  }

  async findOneUser(id: number): Promise<User> {
    return findOneUser(id);
  }

  async deleteOneUser(id: number): Promise<void> {
    return deleteOneUser(id);
  }

  async updateUser(user: User): Promise<User> {
    return updateUser(user)
  }

  async findAllUser(): Promise<User[]> {
    return findAllUser();
  }
}

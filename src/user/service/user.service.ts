import { Injectable } from '@nestjs/common';
import { deleteOneUser, findAllUser, findOneUser, insertUser, updateUser, User } from '../repository/users.repository';

@Injectable()
export class UserService {

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
    return updateUser(user);
  }

  async findAllUser(): Promise<User[]> {
    return findAllUser();
  }
}

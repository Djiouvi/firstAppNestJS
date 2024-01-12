import { Injectable } from '@nestjs/common';
import {
  User,
  UserRepository
} from '../repository/user.repository';

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) {
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async findOneUser(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async deleteOneUser(id: number): Promise<void> {
    return this.userRepository.delete(id);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.update(user);
  }

  async findAllUser(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}

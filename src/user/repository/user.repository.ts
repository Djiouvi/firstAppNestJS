import { Injectable, NotFoundException } from '@nestjs/common';
import { usersEntity } from '../../../db/schema/usersEntity';
import { DatabaseService } from '../../../config/databaseService';
import 'dotenv/config';
import { eq } from 'drizzle-orm';

export type User = typeof usersEntity.$inferSelect;
export type NewUser = typeof usersEntity.$inferInsert;

@Injectable()
export class UserRepository {

  constructor(private dbService: DatabaseService) {
  }

  async create(newUser: NewUser): Promise<User> {
    return (await this.dbService.db.insert(usersEntity).values(newUser).returning())[0];
  }

  async findOne(id: number): Promise<User> {
    const user = await this.dbService.db.select().from(usersEntity).where(eq(usersEntity.id, id));
    if (user.length === 0) {
      throw new NotFoundException(`This id ${id} doesn't exist anymore`);
    }
    return user[0];
  }

  async delete(id: number): Promise<void> {
    await this.dbService.db.delete(usersEntity).where(eq(usersEntity.id, id));
  }

  async findAll(): Promise<User[]> {
    return this.dbService.db.select().from(usersEntity);
  }

  async update(user: User): Promise<User> {
    if (user.id === 0) {
      throw new NotFoundException('ID is mandatory');
    }

    return this.dbService.db
      .update(usersEntity)
      .set(user)
      .where(eq(usersEntity.id, user.id))
      .returning()
      .then(updatedUser => updatedUser[0]);
  }
}

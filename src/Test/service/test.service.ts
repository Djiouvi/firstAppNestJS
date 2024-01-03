import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  create(): string {
    return 'test';
  }
}

import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TestService } from '../service/test.service';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {
  }

  @Get('check')
  @HttpCode(200)
  healthyCheck(): void {
  }

  @Get(':id')
  findOne(@Param() id: any): string {
    return `Je suis le test de ${id}`;
  }

  @Get()
  findAll(): string {
    return `Je suis tous les tests`;
  }

  @Post()
  create(@Body() test: Test): Test {
    this.testService.create();
    return test;
  }
}

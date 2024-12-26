import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CatsService } from './cats/cats.service';
import { CreateCatDto } from './cats/dto/create-cat.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const catsService = app.get(CatsService);

  const dummyCats: CreateCatDto[] = [
    {
      name: 'Whiskers',
      type: 'Siamese',
      food: ['fish', 'chicken'],
      chronicHealthIssues: ['none'],
      age: 2,
    },
    {
      name: 'Tom',
      type: 'Tabby',
      food: ['milk', 'tuna'],
      chronicHealthIssues: ['none'],
      age: 3,
    },
    {
      name: 'Garfield',
      type: 'Persian',
      food: ['lasagna'],
      chronicHealthIssues: ['obesity'],
      age: 5,
    },
  ];

  for (const cat of dummyCats) {
    await catsService.create(cat);
  }

  await app.close();
}

bootstrap();
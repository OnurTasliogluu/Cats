import { Controller, Get, Post, Body, Param, Put, Delete, Logger } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  private readonly logger = new Logger(CatsController.name); // Create a logger for the controller

  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.logger.log('Creating a new cat'); // Log the event
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    this.logger.log('Fetching all cats'); // Log the event
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Fetching cat with ID: ${id}`); // Log the event
    return this.catsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    this.logger.log(`Updating cat with ID: ${id}`); // Log the event
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.warn(`Deleting cat with ID: ${id}`); // Log a warning
    return this.catsService.remove(id);
  }
}

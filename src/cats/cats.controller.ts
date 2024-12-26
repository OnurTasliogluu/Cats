import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cat' })
  @ApiResponse({ status: 201, description: 'The cat has been created.', type: Cat })
  create(@Body() createCatDto: CreateCatDto): Cat {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cats' })
  @ApiResponse({ status: 200, description: 'List of all cats.', type: [Cat] })
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cat by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the cat' })
  @ApiResponse({ status: 200, description: 'The found cat', type: Cat })
  @ApiResponse({ status: 404, description: 'Cat not found' })
  findOne(@Param('id') id: string): Cat {
    return this.catsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cat by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the cat to update' })
  @ApiResponse({ status: 200, description: 'The cat has been updated.', type: Cat })
  @ApiResponse({ status: 404, description: 'Cat not found' })
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Cat {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cat by ID' })
  @ApiParam({ name: 'id', type: String, description: 'The ID of the cat to delete' })
  @ApiResponse({ status: 200, description: 'The cat has been deleted.' })
  @ApiResponse({ status: 404, description: 'Cat not found' })
  remove(@Param('id') id: string): void {
    this.catsService.remove(id);
  }
}

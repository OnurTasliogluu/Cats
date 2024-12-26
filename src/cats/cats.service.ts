import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { v4 as uuidv4 } from 'uuid'; // You can use uuid to generate unique IDs

@Injectable()
export class CatsService {
  private cats: Cat[] = [];

  // Create a new cat
  create(createCatDto: CreateCatDto): Cat {
    const newCat = {
      id: uuidv4(), // Generate a unique ID
      ...createCatDto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  // Find all cats
  findAll(): Cat[] {
    return this.cats;
  }

  // Find a single cat by its ID
  findOne(id: string): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return cat;
  }

  // Update a cat's information
  update(id: string, updateCatDto: UpdateCatDto): Cat {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    const updatedCat = { ...this.cats[catIndex], ...updateCatDto };
    this.cats[catIndex] = updatedCat;
    return updatedCat;
  }

  // Delete a cat
  remove(id: string): void {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    this.cats.splice(catIndex, 1);
  }
}

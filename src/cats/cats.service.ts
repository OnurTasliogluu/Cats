import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name); // Create a logger for the service
  private cats: Cat[] = [];

  create(createCatDto: CreateCatDto): Cat {
    const newCat: Cat = {
      id: (this.cats.length + 1).toString(),
      ...createCatDto,
    };
    this.cats.push(newCat);
    this.logger.log(`Cat created: ${JSON.stringify(newCat)}`); // Log the created cat
    return newCat;
  }

  findAll(): Cat[] {
    this.logger.log('Fetching all cats'); // Log the event
    return this.cats;
  }

  findOne(id: string): Cat {
    const cat = this.cats.find((c) => c.id === id);
    if (!cat) {
      this.logger.error(`Cat with ID ${id} not found`); // Log the error
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.logger.log(`Cat found: ${JSON.stringify(cat)}`); // Log the found cat
    return cat;
  }

  update(id: string, updateCatDto: UpdateCatDto): Cat {
    const catIndex = this.cats.findIndex((c) => c.id === id);
    if (catIndex === -1) {
      this.logger.error(`Cat with ID ${id} not found for update`); // Log the error
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    const updatedCat = { ...this.cats[catIndex], ...updateCatDto };
    this.cats[catIndex] = updatedCat;
    this.logger.log(`Cat updated: ${JSON.stringify(updatedCat)}`); // Log the updated cat
    return updatedCat;
  }

  remove(id: string): void {
    const catIndex = this.cats.findIndex((c) => c.id === id);
    if (catIndex === -1) {
      this.logger.error(`Cat with ID ${id} not found for deletion`); // Log the error
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.logger.warn(`Cat deleted: ${JSON.stringify(this.cats[catIndex])}`); // Log the deletion
    this.cats.splice(catIndex, 1);
  }
}

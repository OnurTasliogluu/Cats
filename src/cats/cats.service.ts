import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name); // Create a logger for the service

  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const newCat = new this.catModel(createCatDto);
    await newCat.save();
    this.logger.log(`Cat created: ${JSON.stringify(newCat)}`); // Log the created cat
    return newCat;
  }

  async findAll(): Promise<Cat[]> {
    this.logger.log('Fetching all cats'); // Log the event
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    const cat = await this.catModel.findById(id).exec();
    if (!cat) {
      this.logger.error(`Cat with ID ${id} not found`); // Log the error
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, { new: true }).exec();
    if (!updatedCat) {
      this.logger.error(`Cat with ID ${id} not found`); // Log the error
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.logger.log(`Cat updated: ${JSON.stringify(updatedCat)}`); // Log the updated cat
    return updatedCat;
  }

  async remove(id: string): Promise<void> {
    const result = await this.catModel.findByIdAndDelete(id).exec();
    if (!result) {
      this.logger.error(`Cat with ID ${id} not found`); // Log the error
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.logger.log(`Cat with ID ${id} deleted`); // Log the deletion
  }
}
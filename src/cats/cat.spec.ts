import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CreateCatDto } from './dto/create-cat.dto';
import { NotFoundException } from '@nestjs/common';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new cat', () => {
    const cat = { name: 'Tom', type: 'British', food: ['fish'], chronicHealthIssues: [] };
    const result = service.create(cat);

    expect(result.name).toEqual('Tom');
    expect(result.type).toEqual('British');
  });

  it('should find all cats', () => {
    const cat = { name: 'Tom', type: 'British', food: ['fish'], chronicHealthIssues: [] };
    service.create(cat);
    const cats = service.findAll();

    expect(cats).toHaveLength(1);
    expect(cats[0].name).toEqual('Tom');
  });

  it('should throw an error when cat not found', () => {
    expect(() => service.findOne('non-existing-id')).toThrow(NotFoundException);
  });

  it('should update a cat', () => {
    const cat = { name: 'Tom', type: 'British', food: ['fish'], chronicHealthIssues: [] };
    const createdCat = service.create(cat);
    const updatedCat = service.update(createdCat.id, { food: ['chicken'] });

    expect(updatedCat.food).toEqual(['chicken']);
  });

  it('should delete a cat', () => {
    const cat = { name: 'Tom', type: 'British', food: ['fish'], chronicHealthIssues: [] };
    const createdCat = service.create(cat);
    service.remove(createdCat.id);

    expect(service.findAll()).toHaveLength(0);
  });
});

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn().mockImplementation((cat) => ({ id: '1', ...cat })),  // Return mock Cat object
      findAll: jest.fn().mockResolvedValue([{ id: '1', name: 'Tom', type: 'British', food: ['fish'], chronicHealthIssues: [] }]),
      findOne: jest.fn().mockResolvedValue({ id: '1', name: 'Tom', type: 'British', food: ['fish'], chronicHealthIssues: [] }),
      update: jest.fn().mockResolvedValue({ id: '1', name: 'Tom', type: 'British', food: ['chicken'], chronicHealthIssues: [] }),
      remove: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        { provide: CatsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new cat', async () => {
    const catDto: CreateCatDto = { name: 'Tom', type: 'British', food: ['fish'], chronicHealthIssues: [] };
    const result = await controller.create(catDto);

    expect(result.name).toEqual('Tom');
  });

  it('should find all cats', async () => {
    const result = await controller.findAll();
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('Tom');
  });

  it('should find one cat by id', async () => {
    const result = await controller.findOne('1');
    expect(result.name).toEqual('Tom');
  });

  it('should throw an error when cat not found', async () => {
    try {
      await controller.findOne('non-existing-id');
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  it('should update a cat', async () => {
    const result = await controller.update('1', { food: ['chicken'] });
    expect(result.food).toEqual(['chicken']);
  });

  it('should delete a cat', async () => {
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalled();
  });
});

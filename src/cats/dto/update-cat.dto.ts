import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCatDto } from './create-cat.dto';
import { IsOptional, IsInt, Min } from 'class-validator';

export class UpdateCatDto extends PartialType(CreateCatDto) {
  @ApiProperty({ description: 'The updated age of the cat', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}

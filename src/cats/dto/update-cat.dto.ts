import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {
  @ApiProperty({ description: 'The updated age of the cat', required: false })
  age?: number;
}

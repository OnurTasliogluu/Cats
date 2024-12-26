import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional, IsInt, Min, IsEnum } from 'class-validator';

export class CreateCatDto {
  @ApiProperty({ description: 'The name of the cat' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The breed/type of the cat' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'The foods the cat eats', type: [String] })
  @IsArray()
  @IsString({ each: true })
  food: string[];

  @ApiProperty({ description: 'Any chronic health issues the cat has', type: [String] })
  @IsArray()
  @IsString({ each: true })
  chronicHealthIssues: string[];

  @ApiProperty({ description: 'The age of the cat', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}

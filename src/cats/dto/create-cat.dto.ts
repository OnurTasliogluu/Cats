import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ description: 'The name of the cat' })
  name: string;

  @ApiProperty({ description: 'The breed/type of the cat' })
  type: string;

  @ApiProperty({ description: 'The foods the cat eats', type: [String] })
  food: string[];

  @ApiProperty({ description: 'Any chronic health issues the cat has', type: [String] })
  chronicHealthIssues: string[];

  @ApiProperty({ description: 'The age of the cat', required: false })
  age?: number;
}

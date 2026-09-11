import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateNatureOfGoodsDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  detail: string;
}

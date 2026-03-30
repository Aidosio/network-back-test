import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApplicationType } from '../entities/application.entity';

export class CreateApplicationDto {
  @ApiProperty({ description: 'ID квартиры' })
  @IsUUID()
  @IsNotEmpty()
  apartmentId: string;

  @ApiProperty({ description: 'Имя' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Фамилия' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Телефон', example: '+77001234567' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Некорректный формат телефона' })
  phone: string;

  @ApiProperty({ description: 'Email', example: 'user@example.com' })
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ enum: ApplicationType, description: 'Тип заявки' })
  @IsEnum(ApplicationType)
  type: ApplicationType;

  @ApiPropertyOptional({ description: 'Комментарий' })
  @IsOptional()
  @IsString()
  comment?: string;
}

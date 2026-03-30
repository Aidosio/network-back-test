import { Controller, Post, Get, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@ApiTags('Заявки')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiOperation({ summary: 'Создание заявки на бронирование' })
  @ApiResponse({ status: 201, description: 'Заявка создана' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  @ApiResponse({ status: 404, description: 'Квартира не найдена' })
  @ApiResponse({ status: 409, description: 'Квартира уже забронирована' })
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Статус заявки' })
  @ApiResponse({ status: 200, description: 'Информация о заявке' })
  @ApiResponse({ status: 404, description: 'Заявка не найдена' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.applicationService.findOne(id);
  }
}

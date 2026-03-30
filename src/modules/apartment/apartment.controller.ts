import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApartmentService } from './apartment.service';

@ApiTags('Квартиры')
@Controller('apartments')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Детали квартиры' })
  @ApiResponse({ status: 200, description: 'Квартира с информацией о корпусе и ЖК' })
  @ApiResponse({ status: 404, description: 'Квартира не найдена' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.apartmentService.findOne(id);
  }
}

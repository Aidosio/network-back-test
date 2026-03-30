import { Controller, Get, Param, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ComplexService } from './complex.service';
import { ApartmentService } from '../apartment/apartment.service';
import { ComplexFilterDto } from './dto/complex-filter.dto';
import { ApartmentFilterDto } from '../apartment/dto/apartment-filter.dto';

@ApiTags('Жилые комплексы')
@Controller('complexes')
export class ComplexController {
  constructor(
    private readonly complexService: ComplexService,
    private readonly apartmentService: ApartmentService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Список жилых комплексов' })
  @ApiResponse({ status: 200, description: 'Список ЖК с агрегированными данными' })
  findAll(@Query() filter: ComplexFilterDto) {
    return this.complexService.findAll(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Детали жилого комплекса' })
  @ApiResponse({ status: 200, description: 'ЖК с корпусами' })
  @ApiResponse({ status: 404, description: 'ЖК не найден' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.complexService.findOne(id);
  }

  @Get(':id/apartments')
  @ApiOperation({ summary: 'Квартиры в жилом комплексе' })
  @ApiResponse({ status: 200, description: 'Список квартир с фильтрацией' })
  findApartments(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() filter: ApartmentFilterDto,
  ) {
    return this.apartmentService.findByComplexId(id, filter);
  }
}

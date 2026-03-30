import { Repository } from 'typeorm';
import { ResidentialComplex } from './entities/complex.entity';
import { ComplexFilterDto } from './dto/complex-filter.dto';
export declare class ComplexService {
    private readonly complexRepo;
    constructor(complexRepo: Repository<ResidentialComplex>);
    findAll(filter: ComplexFilterDto): Promise<ResidentialComplex[]>;
    findOne(id: string): Promise<ResidentialComplex>;
}

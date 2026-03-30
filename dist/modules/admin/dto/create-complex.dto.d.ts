import { ComplexStatus } from '../../complex/entities/complex.entity';
export declare class CreateComplexDto {
    name: string;
    description?: string;
    address: string;
    city: string;
    developer: string;
    completionDate?: string;
    status?: ComplexStatus;
}

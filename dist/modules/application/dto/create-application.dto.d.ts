import { ApplicationType } from '../entities/application.entity';
export declare class CreateApplicationDto {
    apartmentId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    type: ApplicationType;
    comment?: string;
}

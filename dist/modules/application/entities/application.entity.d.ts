import { Apartment } from '../../apartment/entities/apartment.entity';
export declare enum ApplicationType {
    INQUIRY = "inquiry",
    BOOKING = "booking",
    PURCHASE = "purchase"
}
export declare enum ApplicationStatus {
    NEW = "new",
    IN_PROGRESS = "in_progress",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled"
}
export declare class Application {
    id: string;
    apartmentId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    type: ApplicationType;
    status: ApplicationStatus;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    apartment: Apartment;
}

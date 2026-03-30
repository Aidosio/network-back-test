import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    create(dto: CreateApplicationDto): Promise<import("./entities/application.entity").Application>;
    findOne(id: string): Promise<import("./entities/application.entity").Application>;
}

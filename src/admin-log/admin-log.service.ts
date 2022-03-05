import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { UserService } from 'src/user/user.service';
import { Connection, Repository } from 'typeorm';
import { AdminLog } from './admin-log.entity';

type action =  'Datenabfrage' | 'Test'

@Injectable()
export class AdminLogService {
    adminlogRepository: Repository<AdminLog>;

    constructor(
        private connection: Connection, 
        private readonly userService: UserService, 
        @Inject(forwardRef(() => CompanyService)) 
        private readonly companyService: CompanyService,) {
        this.adminlogRepository = connection.getRepository(AdminLog);
    }

    

    async log(actorID, reciverID, action: action, message, status) {
        if(!await this.userService.containUser(actorID) || !await this.companyService.companyExists(actorID)){
            console.log('User not found');
            throw new ForbiddenException('Ungültiger Actor');
        }
        if (reciverID && ! await this.userService.containUser(reciverID) || !await this.companyService.companyExists(reciverID)) {
            console.log('User not found2');
            throw new ForbiddenException('Ungültiger Empfänger');
        }

        const adminLog = new AdminLog();
        adminLog.actorID = actorID;
        adminLog.reciverID = reciverID;
        adminLog.action = action;
        adminLog.message = message;
        adminLog.status = status;
        adminLog.time = new Date();
        await this.adminlogRepository.save(adminLog);
    }
}

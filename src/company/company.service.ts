import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
    constructor(private readonly userService: UserService) {}

    //Fetch all Companys from Database
    async getAllCompanys() {
        return 'All Companys';
    }

    //Fetch Company by ID
    async getCompany(terminalID) {
        return 'Company ID: ' + terminalID;
    }

    //Create Company in Database
    async createCompany(chipID, name, owner, ownerID, ownerClass) {
        let company = new Company();
        company.chipID = chipID;
        company.name = name;
        company.owner = owner;
        company.ownerID = ownerID;
        company.ownerClass = ownerClass;
        company.balance = 0;
        company.isLocked = false;
        company.lastUsed = new Date();
        return company;
    }
}

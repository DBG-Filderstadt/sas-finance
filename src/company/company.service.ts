import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { STATUS_CODES } from 'http';
import { UserService } from 'src/user/user.service';
import { Connection, Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompanyService {
    companyRepository: Repository<Company>;

    constructor(private connection: Connection, private readonly userService: UserService) {
        this.companyRepository = connection.getRepository(Company);
    }

    //Fetch all Companys from Database
    async getAllCompanys() {
        return 'All Companys';
    }

    //Fetch Company by ID
    async getCompany(chipID) {
        const company = await this.companyRepository
        .createQueryBuilder("company")
        .where("company.chipID = :chipID", { chipID })
        .getOne();
        if (!company) {
            throw new NotFoundException('Unternehmen nicht gefunden!');
        } else {
            return company;
        }
    }

    //Create Company in Database
    async createCompany(chipID, name, ownerID) {
        let user = await this.userService.containUser(chipID);
        if (user) {
            throw new ConflictException('Chip karte ist bereits einem Nutzer zugeordnet!');
        }

        let comp = await this.companyRepository
        .createQueryBuilder("company")
        .where("company.chipID = :chipID", { chipID })
        .orWhere("company.name = :name", { name })
        .orWhere("company.ownerID = :ownerID", { ownerID })
        .getOne();
        if (comp) {
            throw new ConflictException('Unternehmen existiert bereits!');
        }

        let owner = await this.userService.getUser(ownerID);
        await this.userService.assignCompany(ownerID, chipID);

        let company = new Company();
        company.chipID = chipID;
        company.name = name;
        company.ownerID = owner.chipID;
        company.balance = 0;
        company.isLocked = false;
        company.lastUsed = new Date();

        await this.companyRepository.save(company);
        let result = {
            company,
            owner,
        }
        return result;
    }
}

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
        const companys = await this.companyRepository
        .createQueryBuilder("company")
        .getMany();
        return companys;
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

    //lock and unlock Company
    async lockCompany(chipID, lock){
        let company = await this.getCompany(chipID);
        company.isLocked = lock;
        this.companyRepository.save(company);
        return company.isLocked;
    }

    async removeMoney(chipID, amount){
        const company = await this.companyRepository
        .createQueryBuilder("company")
        .where("company.chipID = :chipID", { chipID: chipID })
        .getOne();
        let oldAmount = company.balance;
        let newAmount = oldAmount - amount;
        company.balance = newAmount;
        await this.companyRepository.save(company);
        return newAmount;
    }

    async addMoney(chipID, amount){
        const company = await this.companyRepository
        .createQueryBuilder("company")
        .where("company.chipID = :chipID", { chipID: chipID })
        .getOne();
        let oldAmount = company.balance;
        let newAmount = oldAmount + amount;
        company.balance = newAmount;
        await this.companyRepository.save(company);
        return newAmount;
    }

    async getCompanyByOwner(ownerID){
        const company = await this.companyRepository
        .createQueryBuilder("company")
        .where("company.ownerID = :ownerID", { ownerID })
        .getOne();
        if(company){
            return company;
        }
        throw new NotFoundException('Unternehmen nicht gefunden!');
    }

    async getCompanyByName(name){
        const company = await this.companyRepository
        .createQueryBuilder("company")
        .where("company.name = :name", { name })
        .getOne();
        if(company){
            return company;
        }
        throw new NotFoundException('Unternehmen nicht gefunden!');
    }

    
}

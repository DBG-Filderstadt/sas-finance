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

    /*
    * Fetch Company
    */

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

    //Fetch Company by OwnerID
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

    //Fetch Company by Name
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

    /*
    * Create Company
    */

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

    /*
    * Update Company
    */

    //lock and unlock Company
    async lockCompany(chipID, lock){
        let company = await this.getCompany(chipID);
        company.isLocked = lock;
        this.companyRepository.save(company);
        return company.isLocked;
    }

    //set Open Positions of Company
    async setOpenPositions(chipID, openPositions){
        let company = await this.getCompany(chipID);
        company.openPositions = openPositions;
        this.companyRepository.save(company);
        return company.openPositions;
    }

    //set salary of Company
    async setSalary(chipID, salary){
        let company = await this.getCompany(chipID);
        company.salary = salary;
        this.companyRepository.save(company);
        return company.salary;
    }

    /*
    * Company Balance
    */

    //Get Balance of Company
    async getBalance(chipID){
        const company = await this.companyRepository
        .createQueryBuilder("company")
        .where("company.chipID = :chipID", { chipID })
        .getOne();
        if(company){
            return company.balance;
        }
        throw new NotFoundException('Unternehmen nicht gefunden!');
    }

    //Remove Money from Company
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

    //add Money to Company
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

    /*
     * Company Staff
    */ 

    //get all Staff of Company
    async getStaff(chipID){
        let all = await this.userService.getStaff(chipID);
        return all;
    }

    //add Staff to Company
    async addStaff(chipID, staffID){
        return await this.userService.assignCompany(staffID, chipID);;
    }

    //remove Staff from Company
    async removeStaff(chipID, staffID){
        return await this.userService.removeCompany(staffID, chipID);
    }
    
}

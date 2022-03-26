import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    usersRepository: Repository<User>;

    constructor(private connection: Connection) {
        this.usersRepository = connection.getRepository(User);
    }

    async updateUser(chipID, cls, balance, role, company, name){
        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID })
        .getOne();
        if(user){
            user.class = cls;
            user.balance = balance;
            user.role = role;
            user.company = company;
            user.name = name;
            await this.usersRepository.save(user);
            return user;

        }else {
            throw new NotFoundException('Benutzer nicht gefunden');
        }
    }


    async getUserBalance(chipID){
        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID: chipID })
        .getOne();
        const amount = user.balance;
        return amount;
    }

    async getAll() {
        const users =  await this.usersRepository
        .createQueryBuilder("user")
        .take(10)
        .getMany();

        return users;

    }

    async search(param) {
        let input = `${param}%`
        const users = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.name LIKE :input", { input })
        .orWhere("user.chipID LIKE :input", { input })
        .orWhere("user.class LIKE :input", { input })
        .orWhere("user.company LIKE :input", { input })
        .orWhere("user.role LIKE :input", { input })
        .take(3)
        .getMany();
        return users;
    }

    async count(param){
        let input = `${param}%`
        const count = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.name LIKE :input", { input })
        .orWhere("user.chipID LIKE :input", { input })
        .orWhere("user.class LIKE :input", { input })
        .orWhere("user.company LIKE :input", { input })
        .orWhere("user.role LIKE :input", { input })
        .getCount();
        return count;
    }

    async removeMoney(chipID, amount){
        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID: chipID })
        .getOne();
        let oldAmount = user.balance;
        let newAmount = oldAmount - parseInt(amount);
        user.balance = newAmount;
        await this.usersRepository.save(user);
        return newAmount;
    }

    async addMoney(chipID, amount){
        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID: chipID })
        .getOne();
        let oldAmount = user.balance;
        let newAmount = oldAmount + parseInt(amount);
        user.balance = newAmount;
        await this.usersRepository.save(user);
        return newAmount;
    }

    async getUser(chipID): Promise<User>{
        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID: chipID })
        .getOne();
        if(user){
        return user;
        }else {
            throw new NotFoundException('[UserService]:getUser Benutzer nicht gefunden, bitte prüfen Sie die ChipID');
        }
    }

    async containUser(chipID){
        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID: chipID })
        .getOne();
        if(user){
            return true;
        }else {
            return false;
        }
    }

    async assignCompany(chipID, companyID){
        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID })
        .getOne();
        if(user){
            if (user.company) {
                throw new ConflictException('Benutzer ist bereits in einem Unternehmen');
            }
            user.company = companyID;
            await this.usersRepository.save(user);
            return user;
        }else {
            throw new NotFoundException('Benutzer nicht gefunden');
        }
    }

    async removeCompany(chipID, companyID){
        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID })
        .getOne();
        if (!user) {
            throw new NotFoundException('Benutzer nicht gefunden');
        }
        if (!user.company) {
            throw new NotFoundException('Benutzer hat keine Firma');
        }
        if(user.company == companyID){
            user.company = null;
            await this.usersRepository.save(user);
            return user;
        }else {
            throw new NotFoundException('Benutzer ist nicht in der angegebenen Firma');
        }
    }


    async getStaff(companyID){
        const users = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.company = :companyID", { companyID })
        .getMany();
        return users;
    }

    //function to lock/unlock a user
    //@Param chipID: string 
    //@Param locked: boolean
    async lockUser(chipID, locked){

        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID })
        .getOne();
        if(user){
            if(locked == "true" && user.isLocked == false){
                user.isLocked = true;
                await this.usersRepository.save(user);
                return "Benutzer "+user.name + " wurde gesperrt.";
            }else if(locked == "true" && user.isLocked == true){
                return "Benutzer "+user.name + " ist bereits gesperrt.";
            }
            if(locked == "false" && user.isLocked == true){
                user.isLocked = false;
                await this.usersRepository.save(user);
                return "Benutzer "+user.name + " wurde entsperrt.";;
            }else {
                return "Benutzer "+user.name + " ist bereits entsperrt.";
            }
        }else {
            throw new NotFoundException('Benutzer nicht gefunden');
        }
    }
}

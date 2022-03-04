import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    usersRepository: Repository<User>;

    constructor(private connection: Connection) {
        this.usersRepository = connection.getRepository(User);
    }

    async getUserBalance(userID){
        const amount = 10000000;

        return amount;
    }

    async removeMoney(chipID, amount){
        const user = await this.usersRepository
        .createQueryBuilder("user")
        .where("user.chipID = :chipID", { chipID: chipID })
        .getOne();
        let oldAmount = user.balance;
        let newAmount = oldAmount - amount;
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
        let newAmount = oldAmount + amount;
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
            throw new NotFoundException('User not found');
        }
    }

    async assignCompany(userID, companyID){
        const user = new User();
    }
}

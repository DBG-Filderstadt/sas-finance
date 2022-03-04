import { Injectable } from '@nestjs/common';
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
        const amount = 100;

        return amount;
    }

    async removeMoney(userID, amount){
        const newAmount = 120;

        return newAmount;
    }

    async addMoney(userID, amount){
        const newAmount = 50;

        return newAmount;
    }

    async getUser(userID): Promise<User>{
        return this.usersRepository.findOne(userID);
    }

    async assignCompany(userID, companyID){
        const user = new User();
    }
}

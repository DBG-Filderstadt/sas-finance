import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor() {}

    async getUserBalance(userID){
        const amount = 100;

        return amount;
    }

    async removeMoney(userID, amount){
        const newAmount = 100;

        return newAmount;
    }

    async addMoney(userID, amount){
        const newAmount = 100;

        return newAmount;
    }

    async getUser(userID): Promise<User>{
        const user = new User();

        return user;
    }

    async assignCompany(userID, companyID){
        const user = new User();
    }
}

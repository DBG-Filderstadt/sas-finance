import { Injectable } from '@nestjs/common';

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
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/')
    async getAll() {
        return await this.userService.getAll();
    }

    @Post(':userID/lock/:locked')
    async lockUser(
        @Param('userID') userID: string,
        @Param('locked') lock: boolean,
    ) {
        return await this.userService.lockUser(userID, lock);
    }

    @Get('search/:param')
    async getUser(
        @Param('param') param: string,
    ) {
        return await this.userService.search(param);
    }

    
}

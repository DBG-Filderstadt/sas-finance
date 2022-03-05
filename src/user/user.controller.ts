import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('lock')
    async lockUser(
        @Body('userID') userID: string,
        @Body('locked') lock: boolean,
    ) {
        console.log("hi")
        return await this.userService.lockUser(userID, lock);
    }

    
}

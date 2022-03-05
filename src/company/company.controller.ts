import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    //Fetch all Companys from Database
    @Get('/')
    async getAllCompanys(
        @Body('actorID') actorID: string,
    ) {
        return await this.companyService.getAllCompanys(actorID);
    }

    //Create Company in Database
    @Post('/create') 
    async createCompany(
    @Body('chipID') chipID: string,
    @Body('name') name: string,
    @Body('ownerID') ownerID: string,
    ) {
        return await this.companyService.createCompany(chipID, name, ownerID);
    }

    //Fetch Company by ID
    @Get('/:companyID')
    async getCompany(
        @Param('companyID') companyID: string,
    ) {
        return await this.companyService.getCompany(companyID);
    }

    //lock and unlock Company
    @Post('/:companyID/lock')
    async lockCompany(
        @Param('companyID') companyID: string,
        @Body('lock') lock: boolean,
    ) {
        return await this.companyService.lockCompany(companyID, lock);
    }

    //set open Positions
    @Post('/:companyID/openPositions')
    async setOpenPositions(
        @Param('companyID') companyID: string,
        @Body('openPositions') openPositions: boolean,
    ) {
        return await this.companyService.setOpenPositions(companyID, openPositions);
    }

    //set salary
    @Post('/:companyID/salary')
    async setSalary(
        @Param('companyID') companyID: string,
        @Body('salary') salary: number,
    ) {
        return await this.companyService.setSalary(companyID, salary);
    }

    //get salary
    @Get('/:companyID/salary')
    async gtSalary(
        @Param('companyID') companyID: string,
    ) {
        return await this.companyService.getSalary(companyID);
    }

    //fetch company balance
    @Get('/:companyID/balance')
    async getBalance(
        @Param('companyID') companyID: string,
    ) {
        return await this.companyService.getBalance(companyID);
    }

    @Get('/:companyID/staff')
    async getStaff(
        @Param('companyID') companyID: string,
    ) {
        return await this.companyService.getStaff(companyID);
    }

    @Post('/:companyID/staff/add')
    async addStaff(
        @Param('companyID') companyID: string,
        @Body('staffID') staffID: string,
    ) {
        return await this.companyService.addStaff(companyID, staffID);
    }

    @Post('/:companyID/staff/remove')
    async removeStaff(
        @Param('companyID') companyID: string,
        @Body('staffID') staffID: string,
    ) {
        return await this.companyService.removeStaff(companyID, staffID);
    }

    @Post('/:companyID/payout')
    async payout(
        @Param('companyID') companyID: string,
    ) {
        return await this.companyService.payout(companyID);
    }
}

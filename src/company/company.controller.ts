import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    //Fetch all Companys from Database
    @Get('/')
    async getAllCompanys() {
        return await this.companyService.getAllCompanys();
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
}

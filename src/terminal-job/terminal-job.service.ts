import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { TerminalJob } from './terminal-job.entity';

@Injectable()
export class TerminalJobService {
    jobRepository: Repository<TerminalJob>;

    constructor(private connection: Connection) {
        this.jobRepository = connection.getRepository(TerminalJob);
    }

    async insertJob(transactionID, terminalID, receiverID, amount) {
        const job = new TerminalJob();
        job.transactionID = transactionID;
        job.terminalID = terminalID;
        job.receiverID = receiverID;
        job.amount = amount;
        job.timestamp = new Date();
        await this.jobRepository.save(job);
    }

    async getJob(terminalID) {
        const job = await this.jobRepository
        .createQueryBuilder("job")
        .where("job.terminalID = :terminalID", { terminalID: terminalID })
        .getOne();
        return job;
    }

    async deleteJob(terminalID) {
        const job = await this.jobRepository
        .createQueryBuilder("job")
        .where("job.terminalID = :terminalID", { terminalID: terminalID })
        .getOne();
        if(job){
        await this.jobRepository.remove(job);
    }

    }

}

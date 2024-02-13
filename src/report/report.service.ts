import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportService {

    constructor(@InjectRepository(Report) private repo: Repository<Report>){}

    create(title: string, description: string, status: string, createdAt: Date, updatedAt: Date){
        const report = this.repo.create({title, description, status, createdAt, updatedAt});

        return this.repo.save(report);
    }

    get(id: number){
        return this.repo.findOneBy({id});
    }

    getAllByStatus(status: string){
        return this.repo.find({where: {status}});
    }

    async update(id: number, attrs: Partial<Report>){
        const report = await this.get(id);
        if(!report){
            throw new NotFoundException('ticket not found');
        }
        Object.assign(report, attrs);
        return this.repo.save(report);
    }

    async remove(id: number){
        const report = await this.get(id);
        if(!report){
            throw new NotFoundException('ticket not found');
        }
        return this.repo.remove(report);
    }
}

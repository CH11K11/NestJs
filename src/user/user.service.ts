import { Injectable, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private repo: Repository<User>){}

    create(username: string, password: string, createdAt: Date, updatedAt: Date){
        const user = this.repo.create({username, password, createdAt, updatedAt});

        return this.repo.save(user);
    }

    findOne(id: number) {
        if(!id){
            return null;
        }
        return this.repo.findOneBy({id});
    }

    find(username: string) {
        console.log('find');
        return this.repo.find({where: {username}});
    }

    async update(id: number, attrs: Partial<User>){
        console.log('update');
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number){
        console.log('remove');
        const user = await this.findOne(id);
        if(!user){
            throw new Error('user not found');
        }
        return this.repo.remove(user);
    }
}

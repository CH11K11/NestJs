import { Expose, Transform } from "class-transformer";
import { User } from "src/user/user.entity";


export class ReportDto{
    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    status: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
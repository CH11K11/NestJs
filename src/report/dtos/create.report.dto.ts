import { IsString,IsDate, IsOptional} from "class-validator";

export class CreateReportDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    status: string;

    @IsString()
    createdAt: Date;

    @IsString()
    updatedAt: Date;

}

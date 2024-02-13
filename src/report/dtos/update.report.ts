import { IsString,IsDate, IsOptional} from "class-validator";


export class UpdateReportDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsOptional()
    createdAt: Date;

    @IsString()
    @IsOptional()
    updatedAt: Date;

}

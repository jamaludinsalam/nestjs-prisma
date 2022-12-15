import { ApiProperty } from "@nestjs/swagger";
import { pegawai } from "@prisma/client";
import { IsInt, IsString } from "class-validator";

export class Pegawai implements pegawai {

    @ApiProperty()
    @IsInt()
    id: number   
    
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    phone: string

    @ApiProperty()
    @IsString()
    address: string
}

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignupLocalDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    password: string | null;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @ApiProperty()
    hash: string;

    @ApiProperty()
    hashedRt: string | null;

    @IsString()
    @ApiProperty()
    phone: string | null;

    @IsString()
    @ApiProperty()
    address: string | null;
}
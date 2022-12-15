import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LogoutDto {
    @ApiProperty()
    userId: string | null;
}
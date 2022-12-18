import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class GetUserIdDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @Exclude()
    @ApiProperty()
    password: string;

    @Exclude()
    @ApiProperty()
    hash: string;

    @Exclude()
    @ApiProperty()
    hashedRt: string;

    @ApiProperty()
    phone: string | null;

    @ApiProperty()
    address: string | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;


}
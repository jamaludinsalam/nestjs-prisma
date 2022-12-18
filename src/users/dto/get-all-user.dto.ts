import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class GetAllUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    @Exclude()
    password: string;

    @Exclude({ toPlainOnly: true })
    // @ApiProperty()
    hash: string;

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

    constructor(partial: Partial<GetAllUserDto>) {
        Object.assign(this, partial)
    }
}
import { ApiProperty } from "@nestjs/swagger";
import { user } from "@prisma/client";
import { Exclude } from "class-transformer";

export class User implements user {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    // @ApiProperty()
    @Exclude({ toPlainOnly: true })
    password: string;

    // @ApiProperty()
    @Exclude()
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

    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }
}

import { ApiProperty } from "@nestjs/swagger";
import { user } from "@prisma/client";

export class User implements user {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
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
}

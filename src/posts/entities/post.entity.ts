import { ApiProperty } from "@nestjs/swagger";
import { post } from "@prisma/client";

export class Post implements post {
    @ApiProperty()
    id: number;

    @ApiProperty({ required: true })
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    userId: number;
}


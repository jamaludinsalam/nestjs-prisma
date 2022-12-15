import { ApiProperty } from "@nestjs/swagger";
import { article } from "@prisma/client";

export class ArticleEntity implements article {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false })
    description: string | null;

    @ApiProperty()
    body: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date | null;
}

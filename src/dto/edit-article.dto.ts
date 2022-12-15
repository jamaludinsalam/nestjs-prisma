import { ApiProperty } from '@nestjs/swagger';


export class EditArticleDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    body: string;

    @ApiProperty()
    published: boolean
}
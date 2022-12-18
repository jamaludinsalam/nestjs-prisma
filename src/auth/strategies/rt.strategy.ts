import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtPayload, JwtPayloadWithRt } from "../types";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private readonly prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'rt-secret',
            passReqToCallback: true,
        })
    }

    validate(req: Request , payload: JwtPayload): JwtPayloadWithRt {
        
        const refreshToken = req
            .get('authorization')
            .replace('Bearer', '')
            .trim();

        if(!refreshToken) throw new ForbiddenException('Refresh token malformed')

        return {
            ...payload,
            refreshToken
        };
    }
}
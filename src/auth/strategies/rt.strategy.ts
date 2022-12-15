import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtPayload, JwtPayloadWithRt } from "../types";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: 'rt-secret',
        })
    }

    validate(req: Request , payload: JwtPayload): JwtPayloadWithRt {
        console.log(req, payload)
        const refreshToken = req
            .get('authorization')
            .replace('Bearer', '')
            .trim();

        if(!refreshToken) throw new ForbiddenException('Refresh token malformed')
        // console.log('refreshtoken', refreshToken)
        return {
            ...payload,
            refreshToken
        };
    }
}
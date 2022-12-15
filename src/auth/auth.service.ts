import { ForbiddenException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupLocalDto } from './dto/auth.dto';
import * as argon2 from "argon2";
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from './dto/token.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SigninLocalDto } from './dto/signin-local.dto';
import { LogoutDto } from './dto/logout';


@Injectable()
export class AuthService implements OnModuleInit {
    private logger = new Logger()
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    onModuleInit() {
        
    }


    /**
     * SERVICE - signupLocal
     * =====================
     * @description digunakan untuk mendaftarkan user baru ,
     * sekaligus membuat hashing password dan refresh token
     * @param AuthDto
     * 
     * @returns 
     */
    async signupLocal(dto: SignupLocalDto): Promise<Tokens> {
        const hashedPassword = await this.hashData(dto.password)
        // const dtoHashed = 
        const newUser = await this.prisma.user
            .create({
                data: {
                    email: dto.email,
                    hash: hashedPassword,
                    hashedRt: null,
                    phone: null,
                    password: null,
                    address: null,
                    name: 'Jamaludin Salam'
                }
            })
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials incorrect');
                    }
                }
                throw error;
            });

        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRtHash(newUser.id, tokens.refresh_token);
        return tokens
    } 



    /**
     * SERVICE - Sign In Local
     * =====================
     * @description digunakan untuk login
     * @param SigninLocalDto
     * 
     * @returns 
     */
    async signinLocal(dto: SigninLocalDto): Promise<Tokens> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(!user) throw new ForbiddenException('Access Denied, email not registered!');

        const passwordMatches = await argon2.verify(user.hash, dto.password);
        
        if(!passwordMatches) throw new ForbiddenException('Access Denied - wrong password!');

        const tokens = await this.getTokens(user.id, user.email);
       
        await this.updateRtHash(user.id, tokens.refresh_token);
        
        return tokens;
    }

    /**
     * SERVICE - Logout
     * =====================
     * @description digunakan untuk logout
     * @param userId :number
     * 
     * @returns 
     */
    async logout(userId: number) {
        await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null
                }
            },
            data: {
                hashedRt: null
            }
        })
        return true;
    }

    /**
     * SERVICE - Refresh Tokens
     * =====================
     * @description digunakan untuk memperbaharui Token yang sudah expirated
     * @param userId :number
     * @param rt :string
     * 
     * @returns 
     */
    async refreshTokens(userId: number, rt: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user || !user.hashedRt) throw new ForbiddenException('Access Denied - User not found');

        const rtMathes = await argon2.verify(user.hashedRt, rt);
        if(!rtMathes) throw new ForbiddenException('Access Denied - Token Dismatch')

        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);

        return tokens
    }




    /**
     * =====================================================================================
     *                 HELPERS
     * =====================================================================================
     */



    /**
     * HELPER - hashData 
     * =============
     * @description digunakan untuk mengubah plain password menjadi enccrypted password,
     * saat ini menggunakan Library dari argon2
     * @param data 
     * @returns 
     */
    async hashData(data: string){
        return await argon2.hash(data)
    }
    
    /**
     * HELPER - Update Refresh Token 
     * =============
     * @description digunakan untuk membuat Resfresh Token dan mengupdate hashedRt di DB
     * @param userId :number 
     * @param rt :string 
     * @returns 
     */
    private async updateRtHash(userId: number, rt: string){
        const hash = await this.hashData(rt);
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash
            }
        })
    }

    
    /**
     * HELPER - getTokens 
     * =============
     * @description digunakan untuk membuat token , dan refresh token
     * @param {number} userId :number
     * @param {string} email :string
     * @returns 
     *  access_token,
     *  refresh_token
     * 
     */
    async getTokens(userId: number, email: string){
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email
            }, 
            { 
                secret: 'at-secret',
                expiresIn: '15m',
            }),

            this.jwtService.signAsync({
                sub: userId,
                email
            }, 
            { 
                secret: 'rt-secret',
                expiresIn: '7d',
            })
        ])

        return {
            access_token: at,
            refresh_token: rt
        }
    
    }
    

}

import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { throws } from 'assert';
import { AuthService } from './auth.service';
import { SignupLocalDto } from './dto/auth.dto';
import { LogoutDto } from './dto/logout';
import { SigninLocalDto } from './dto/signin-local.dto';
import { Tokens } from './types';
import { Request } from 'express';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { JwtGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(
       private readonly authService: AuthService
    ){}


    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    async signupLocal(@Body() dto: SignupLocalDto): Promise<Tokens> {
        return await this.authService.signupLocal(dto)
    }

    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    async signinLocal(@Body() dto: SigninLocalDto): Promise<Tokens> {
       return await this.authService.signinLocal(dto)
    }

    @UseGuards(JwtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number): Promise<boolean> {
        return this.authService.logout(userId)
        
    }

    // @Public()
    @Post('refresh')
    @UseGuards(JwtRefreshGuard)
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshTokens: string
    ) {
        console.log(userId)
        console.log(refreshTokens)
        // this.authService.refreshTokens(userId, refreshTokens)
    }


}

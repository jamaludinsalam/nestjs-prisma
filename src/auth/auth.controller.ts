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
import { AtGuard, RtGuard } from 'src/common/guards';
import { Public } from 'src/common/decorators';

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

    // @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    async signinLocal(@Body() dto: SigninLocalDto): Promise<Tokens> {
       return await this.authService.signinLocal(dto)
    }

    @UseGuards(AtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number): Promise<boolean> {
        return this.authService.logout(userId)
        
    }

    // @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string
    ) {
        return this.authService.refreshTokens(userId, refreshToken)
    }


}

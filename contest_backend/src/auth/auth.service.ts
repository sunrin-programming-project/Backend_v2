import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async getJWT(googleId: string, email: string, name: string) {
        const payload = { google_id: googleId, email: email, name: name }
        return this.jwtService.sign(payload)
    }

    async googleValidate(googleId: string, email: string, name: string) {
        const user = await this.userService.findUserByGoogleId(googleId)

        if (!user) {
            await this.userService.createUser(googleId, email, name)
        }

        return this.getJWT(googleId, email, name)
    }

    async generateAccessToken(googleId: string, email: string, name: string) {
        const payload = {
            google_id: googleId,
            email: email,
            name: name
        }

        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h'
        })
    }
}

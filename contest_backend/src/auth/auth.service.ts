import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtServiceL: JwtService
    ) {}

    async getJWT(googleId: string, email: string, name: string) {
        const payload = { google_id: googleId, email: email, name: name }
        return this.jwtServiceL.sign(payload)
    }

    async googleValidate(googleId: string, email: string, name: string) {
        const user = await this.userService.findUserByGoogleId(googleId)

        if (!user) {
            await this.userService.createUser(googleId, email, name)
        }

        return this.getJWT(googleId, email, name)
    }

    async generateRefreshToken(googleId: string, email: string, name: string) {
        return this.getJWT(googleId, email, name)
    }

}

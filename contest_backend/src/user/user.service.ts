import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly entityManager: EntityManager
    ) {}

    async findUserByGoogleId(google_id: string) {
        const user = await this.entityManager.getRepository('user')
        const result = await user.findOne({
            where: {
                googleId: google_id
            }
        })

        return result
    }

    async findUserByEmail(email: string) {
        const user = await this.entityManager.getRepository('user')
        const result = await user.findOne({
            where: {
                email: email
            }
        })

        return result
    }

    async createUser(google_id: string, email: string, name: string) {
        const user = await this.entityManager.getRepository('user')

        if (await this.findUserByGoogleId(google_id)) {
            throw new Error('User already exists')
        }

        if (await this.findUserByEmail(email)) {
            throw new Error('User already exists')
        }

        const result = await user.save({
            googleId: google_id,
            email: email,
            name: name
        })

        return result
    }

    async removeUser(google_id: string) {
        const user = await this.entityManager.getRepository('user')

        if (!await this.findUserByGoogleId(google_id)) {
            throw new Error('User does not exist')
        }

        const result = await user.delete({
            googleId: google_id
        })

        return result
    }

}

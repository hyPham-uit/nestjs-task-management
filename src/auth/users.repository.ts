/* eslint-disable prettier/prettier */
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hashedPass });

    try {
        await this.save(user);
    } catch (error) {
        if(error.code==='23505'){
            throw new ConflictException('Username have already exists')
        } else {
            throw new InternalServerErrorException()
        }
    }
  }
}

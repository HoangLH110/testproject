import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterForPlayerDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/entities/player.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly playersService: PlayersService,
    private jwtService: JwtService,
  ) {}
  saltOrRounds = 10;

  async generateJwtToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  async checkPassword(input: string, password: string) {
    return await bcrypt.compare(input, password);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.playersService.findOne(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByToken(id: string): Promise<Player> {
    const user = await this.playersService.findOne({ _id: ObjectId(id) });
    if (user) {
      return user;
    }
    return null;
  }

  async encryptionPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async register(params: RegisterForPlayerDto) {
    const userName = await this.playersService.findOne({
      username: params.username,
    });
    if (userName) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: 'UserName already exist',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    params.password = await this.encryptionPassword(params.password);
    const result: any = await this.playersService.create(params);

    result.id = result.id.toString();
    return result;
  }

  async login(params: LoginDto) {
    const currentUser: any = await this.playersService.findOne({
      username: params.username,
    });

    if (!currentUser) {
      throw new UnprocessableEntityException(`User don't exits`);
    }
    const passwordValid = await this.checkPassword(
      params.password,
      currentUser.password,
    );

    if (!passwordValid) {
      throw new UnprocessableEntityException('Password failed');
    }

    const payload = {
      _id: currentUser._id,
    };

    const accessToken = await this.generateJwtToken(payload);

    currentUser.accessToken = accessToken;
    return currentUser;
  }
}

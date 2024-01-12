import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findOneUser(+7);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const payload = { sub: user.id, username: user.firstname };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

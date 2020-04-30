import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { of, Observable, from } from 'rxjs'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  verifyData(username: string, password: string) {
    return of({})
  }

  login(user: any) {
    return of(null)
    const { email, password } = user

    const payload = { sub: user._id, firstName: user.firstName }
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}

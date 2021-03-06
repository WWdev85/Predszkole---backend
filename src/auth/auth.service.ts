import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { hashPwd } from 'src/utils/hash-pwd';
import { AuthLoginDto } from './dto/auth-login-dto';
import { v4 as uuid} from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.strategy';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {

    private createToken(currentTokenId: string): {accessToken: string, expiresIn: number} {
      const payload: JwtPayload = {id: currentTokenId};
      const expiresIn = 60 * 60 * 24;
      const accessToken = sign(payload, 'sadhasihdashdukbv;%$#WEDFVG:O*O{(P(YG"jj9hihfewrjjwrh-[jqkmvsmijg9weht-qqjfpofnjwqwh09ujfdihghvskdjjfa3ur09yqthhdjsknvbweroHJoijighoEHGEOHieoWHJG[9ujeifjdjkg;jghoYU[EODFKKLDJGL;WOUT9[T',
      { expiresIn } );

      return {
        accessToken,
        expiresIn,
      };
    };

    private async generateToken(user: User) : Promise<string> {
      let token;
      let userWithThisToken = null;
      do {
        token = uuid();
        userWithThisToken = await User.findOne({ currentTokenId : token});
      }while(!!userWithThisToken);
      user.currentTokenId = token;
      await user.save();

      return token;
    };

    

    async login( req: AuthLoginDto, res: Response): Promise<any> {
      try{
        const user = await User.findOne( {
          email: req.email,
          pwdHash: hashPwd(req.pwd)
        });

        if(!user) {
          return res.json({status: 'Invalid login data!'});
        }

        const token = await this.createToken(await this.generateToken(user));

        return res
            .cookie('jwt', token.accessToken, {
              secure: false,
              domain: 'localhost',
              httpOnly: true,
            } )
            .json({status: "ok"});
      }catch (e) {
        return res.json({status: e.message});
      }
    };

    async logout (user: User, res: Response){
      try{
        user.currentTokenId = null;
        await user.save();
        res.clearCookie(
          'jwt',
          {
              secure: false,
              domain: 'localhost',
              httpOnly: true,
          }
        );
        return res.json({ok: true})
      } catch (e) {
        return res.json({error: e.message})
      }
    }
}

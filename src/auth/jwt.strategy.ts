import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable , UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';


export interface JwtPayload {
    id: string;
}

function cookieExtractor(req: any) : null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: 'sadhasihdashdukbv;%$#WEDFVG:O*O{(P(YG"jj9hihfewrjjwrh-[jqkmvsmijg9weht-qqjfpofnjwqwh09ujfdihghvskdjjfa3ur09yqthhdjsknvbweroHJoijighoEHGEOHieoWHJG[9ujeifjdjkg;jghoYU[EODFKKLDJGL;WOUT9[T'
        });
    }

    async validate (payload: JwtPayload, done:(error, user) => void){
        if(!payload || !payload.id){
            return done(new UnauthorizedException(), false);
        }

        const user = await User.findOne({
            currentTokenId: payload.id
        });

        if (!user){
            return done(new UnauthorizedException(), false); 
        }
        done(null,user)
    }
}
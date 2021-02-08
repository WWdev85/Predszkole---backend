import * as crypto from 'crypto';

export const hashPwd = (p: string) : string => {
    const hmac = crypto.createHmac('sha512', 'nvjgoiuebwgpNVM vl R83R 9 URU3[ rureiOI 90RY3[09Ur ej eworjugyg^ur^&r)t)(ujihj(*hhj(*gt_&fg{ubbhvkvb:"hGUGUIGFUGH[2186681SDFSDFIGFBNNV');
    hmac.update(p);
    return hmac.digest('hex');
}
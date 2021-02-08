import { HandlebarsAdapter } from '@nest-modules/mailer';

export = {
    transport: {
        from: 'biuro@webcarver.pl',
        host: 'mail48.mydevil.net', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: 'formularz@webcarver.pl',
            pass: 'Putas20'
        }
    },
    defaults: {
        from: 'test@webcarver20.usermd.net'
    },
    template: {
        dir: './templates/email',
        adapter: new HandlebarsAdapter(),
        options: {
            strict: true,
        }
    }
}
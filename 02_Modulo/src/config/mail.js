export default {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    secure: false, // Para usar SSL
    default: {
        from: 'Equipe GoBarber <noreplay@gobarber.com>',
    },
};

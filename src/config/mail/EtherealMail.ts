import nodemailer from 'nodemailer';
import IParseMailTemplate from './interfaces/IParseMailTemplate';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ISendMail {
    to: IMAilContact,
    from?: IMAilContact
    subject: string,
    templateData: IParseMailTemplate;
}

interface IMAilContact {
    name: string,
    email: string
}

export default class EtherealMail {
    static async sendMail({
      to,
      from,
      subject,
      templateData,
    }: ISendMail): Promise<void> {
      const account = await nodemailer.createTestAccount();

      const mailTemplate = new HandlebarsMailTemplate();

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      const message = await transporter.sendMail({
        from: {
          name: from?.name || 'Equipe API Vendas',
          address: from?.email || 'equipe@apivendas.com.br',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await mailTemplate.parse(templateData),
      });

        console.log(`Message sent: ${message.messageId}`,);
        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
    }
}

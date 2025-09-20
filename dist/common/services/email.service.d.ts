import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendVerificationCodeEmail(email: string, code: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendPasswordResetCodeEmail(email: string, code: string): Promise<void>;
}

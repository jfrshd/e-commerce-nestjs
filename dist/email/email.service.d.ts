export declare class EmailService {
    private transporter;
    constructor();
    sendVerificationEmail(email: string, code: string): Promise<void>;
    sendPasswordResetEmail(email: string, code: string): Promise<void>;
}

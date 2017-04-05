import * as uuid from "uuid";
import * as StringBuilder from "string-builder";

export enum LogLevel {
    Error = 0,
    FailureAudit = 1,
    Information = 2,
    Success = 3,
    Warning = 4
};

export class DistributionEnvelopeException extends Error {
    public readonly SYSTEM_LOGGER: string = "DISTRIBUTION_ENVELOPE_TOOLS_LOG";

    private _code: string = null;
    private _text: string = null;
    private _diagnostics: StringBuilder = null;
    private _id: string = null;
    private _applicationContext: string = null;
    private _messageId: string = null;
    private _sender: string = null;
    private _loggingLevel: LogLevel = LogLevel.Error;
    private _stackTrace: boolean = true;

    constructor(code: string, text: string, diagnostics: string) {
        super();

        const g: any = uuid();
        this._id = g.toString().toUpperCase();
        this._code = code;
        this._text = text;
        if (diagnostics !== null) {
            this._diagnostics = new StringBuilder(diagnostics);
        }
    }

    public recordContext(applicationContext: string, messageId: string, sender: string): void {
        this._applicationContext = applicationContext;
        this._messageId = messageId;
        this._sender = sender;
        this.log();
    }

    public setLoggingLevel(loggingLevel: LogLevel): void {
        this._loggingLevel = loggingLevel;
    }

    public report(sender: string): void {
        this._sender = sender;
        this.log();
    }

    public toString(): string {
        const sb: StringBuilder = new StringBuilder();

        sb.append("ITKException\n");
        sb.append("ID:\t");
        sb.append(this._id);
        sb.append("\nCode:\t");
        sb.append(this._code);
        sb.append("\nText:\t");
        sb.append(this._text);
        sb.append("\nDiagnostics:\n");
        sb.append(this._diagnostics.toString());
        if (this._applicationContext === null) {
            sb.append("\nApplicationContext: Not set");
        } else {
            sb.append("\nApplicationContext: ");
            sb.append(this._applicationContext);
        }

        if (this._messageId === null) {
            sb.append("\nTransmission id: Not set");
        } else {
            sb.append("\nTransmission id: ");
            sb.append(this._messageId);
        }

        if (this._sender === null) {
            sb.append("\nSender: Not set");
        } else {
            sb.append("\nSender: ");
            sb.append(this._sender);
        }

        if (this._stackTrace) {
            sb.append("\n\nStack Trace:\n");
            sb.append(this.stack);
        }

        return sb.toString();
    }

    public noStackTrace(): void {
        this._stackTrace = false;
    }

    public updateDiagnostics(diagnostics: string): void {
        this._diagnostics.append(", ");
        this._diagnostics.append(diagnostics);
    }

    private log(): void {
        const lname: string = (this._applicationContext === null) ? this.SYSTEM_LOGGER : this._applicationContext;
        console.log(this.toString());
    }

    public get id(): string {
        return this._id;
    }

    public get code(): string {
        return this._code;
    }

    public get text(): string {
        return this._text;
    }

    public get diagnostics(): string {
        return this._diagnostics;
    }
}

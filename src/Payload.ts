import * as uuid from "uuid";
import { Dictionary } from "typescript-collections";
import { X509Certificate } from "./X509Certificate";

export class Payload {
    private _manifestId: string = null;
    private _mimeType: string = null;
    private _profileId: string = null;
    private _base64: boolean = false;
    private _compressed: boolean = false;
    private _encrypted: boolean = false;

    private _encryptedContent: string;
    private _receivedReaders: Dictionary<string, string> = null;
    private _allowNonUsageCertificates: boolean = true;

    constructor(mimeType: string);
    constructor(idOrMimeType: string, mimeType?: string, profileId?: string, base64?: string, compressed?: string, encrypted?: string) {
        this._manifestId = (typeof(mimeType) === "undefined") ? `uuid_${uuid().toString().toLowerCase()}` : idOrMimeType;
        this._mimeType = (typeof(mimeType) === "undefined") ? idOrMimeType : mimeType;
        if (typeof(profileId) !== "undefined" && profileId.length > 0) {
            this._profileId = profileId;
        }

        this._base64 = (base64 === "true");
        this._compressed = (compressed === "true");
        this._encrypted = (encrypted === "true");
    }

    public setEncryptedContent(encryptedContent: string): void {
        this._encryptedContent = encryptedContent;
        this._receivedReaders = new Dictionary<string, string>();
    }

    public addReceivedReader(name: string, key: string): void {
        this._receivedReaders.setValue(name, key);
    }

    private checkCertificateDateRange(certificate: X509Certificate): boolean {
        const now: Date = new Date();
        if (now < certificate.notBefore) {
            return false;
        }

        return now < certificate.notAfter;
    }

    private checkKeyUsage(certificate: X509Certificate): boolean {
        let hasDataEnciphermentUsage: boolean = false;
        let ext = certificate.extensions;
        if ((ext === null) && !this._allowNonUsageCertificates) {
            throw new Error(`Certificate ${certificate.subject.commonName} has no key usage extensions`);
        }

        for (let key in ext) {
            if (key === "keyUsage") {
                const x = ext[key];
                hasDataEnciphermentUsage = x.indexOf("Data Encipherment") > -1;
            }
        }

        if (!hasDataEnciphermentUsage && !this._allowNonUsageCertificates) {
            throw new Error(`Certificate ${certificate.subject.commonName} not valid for data encipherment`);
        }

        return true;
    }
}

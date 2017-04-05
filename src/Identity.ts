import { DistributionEnvelopeException } from "./DistributionEnvelopeException";
import { Entity } from "./Entity";
import { Set } from "typescript-collections";

export class Identity extends Entity {
    public static readonly ITK_IDENTITY: number = 10000;
    public static readonly ITK_IDENTITY_PREFIX: string = "urn:nhs-uk:identity:";
    public static readonly IDENTITY_PREFIX_LENGTH: number = 20;

    private static TYPES: number[] = [10000, 10001, 10002, 10003, 10004];
    private static DISPLAYTYPES: string[] = ["ITK identity (explicit)", "DTS mailbox", "Spine UID", "Spine URP", "Spine ORG", "Spine ASID"];
    private static OIDS: string[] = ["2.16.840.1.113883.2.1.3.2.4.18.27",
        "2.16.1.113883.2.1.3.2.4.21.1",
        "1.2.826.0.1285.0.2.0.65",
        "1.2.826.0.1285.0.2.0.67",
        "1.2.826.0.1285.0.2.0.109",
        "1.2.826.0.1285.0.2.0.107"];

    private _external: boolean = false;

    constructor(uri: string);
    constructor(uri: string, oid: string);
    constructor(uri?: any, oid?: any) {
        super();

        if (typeof(oid) !== "undefined" && ((oid === null) || (oid.trim().length === 0))) {
            throw new DistributionEnvelopeException("ADDR-0004", `Error in identity: null or empty OID for identity: ${uri}`, null);
        }

        if ((uri === null) || (uri.trim().length === 0)) {
            throw new DistributionEnvelopeException("ADDR-0003", "Invalid identity: null or empty", null);
        }

        this._type = Identity.ITK_IDENTITY;
        this._displayType = "ITK identity (implicit)";
        this._uri = uri;
        this._oid = Identity.OIDS[0];
        this._routable = true;

        if (typeof(oid) !== "undefined") {
            this._oid = oid;
            for (let i: number = 0; i < Identity.OIDS.length; i++) {
                if (Identity.OIDS[i] === oid) {
                    this._type = i;
                    this._displayType = Identity.DISPLAYTYPES[i];
                    this._external = true;
                    this._routable = (this._type === Identity.ITK_IDENTITY);
                    return;
                }
            }

            throw new DistributionEnvelopeException("ADDR-0005", "Unrecognised OID", `${oid} for identity ${uri}`);
        }
    }

    public get isExternal(): boolean {
        return this._external;
    }

    public getParts(): Set<string> {
        const s: string = this._uri.substring(Identity.IDENTITY_PREFIX_LENGTH);
        return this.splitUri(s);
    }
}

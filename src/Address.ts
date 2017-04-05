import { Entity } from "./Entity";
import { Set } from "typescript-collections";
import { DistributionEnvelopeException } from "./DistributionEnvelopeException";

export class Address extends Entity {
    public static readonly ADDRESS_PREFIX_LENGTH: number = 22;
    public static readonly ITK_ADDRESS_PREFIX: string = "urn:nhs-uk:addressing:";
    public static readonly ITK_ADDRESS: number = 1000;

    private TYPES: number[] = [1000, 1001, 1002];
    private DISPLAYTYPES: string[] = ["ITK address (explicit)", "DTS mailbox", "Spine ASID"];
    private OIDS: string[] = ["2.16.840.1.113883.2.1.3.2.4.18.22",
        "2.16.1.113883.2.1.3.2.4.21.1",
        "1.2.826.0.1285.0.2.0.107"];

    constructor(uri: string);
    constructor(uri: string, oid: string);
    constructor(uri: any, oid?: any) {
        super();

        if (typeof(oid) !== "undefined" && ((oid === null) || (oid.trim().length === 0))) {
            throw new DistributionEnvelopeException("ADDR-0002", `Error in address: null or empty OID for address ${uri}`, null);
        }

        if ((uri === null) || (uri.trim().length === 0)) {
            throw new DistributionEnvelopeException("ADDR-0001", "Invalid address: null or empty", null);
        }

        // set default values
        this._type = Address.ITK_ADDRESS;
        this._displayType = "ITK address (implicit)";
        this._uri = uri;
        this._oid = this.OIDS[0];
        this._routable = true;

        if (typeof(oid) !== "undefined") {
            this._oid = oid;
            for (let i: number = 0; i < this.OIDS.length; i++) {
                if (this.OIDS[i] === oid) {
                    this._type = i;
                    this._displayType = this.DISPLAYTYPES[i];
                    this._routable = true;
                    return;
                }
            }

            throw new DistributionEnvelopeException("ADDR-0005", "Unrecognised OID", `${oid} for address ${uri}`);
        }
    }

    public getParts(): Set<string> {
        const s: string = this._uri.substring(Address.ADDRESS_PREFIX_LENGTH);
        return this.splitUri(s);
    }
}

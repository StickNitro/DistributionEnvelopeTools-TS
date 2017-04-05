import { Set } from "typescript-collections";

export abstract class Entity {
    public abstract getParts(): Set<string>;

    protected readonly UNDEFINED_TYPE: number = -1;
    protected _uri: string = null;
    protected _displayType: string = null;
    protected _oid: string = null;
    protected _type: number = this.UNDEFINED_TYPE;
    protected _routable: boolean = false;

    protected splitUri(uri: string): Set<string> {
        const parts: string[] = uri.split(":");
        const a = new Set<string>();
        parts.forEach((part) => {
            a.add(part);
        });

        return a;
    }

    public get uri(): string {
        return this._uri;
    }

    public get oid(): string {
        return this._oid;
    }

    public get displayType(): string {
        return this._displayType;
    }

    public get type(): number {
        return this._type;
    }

    public get isRoutable(): boolean {
        return this._routable;
    }
}

import { expect } from "chai";
import { Identity } from "../Identity";
import { DistributionEnvelopeException } from "../DistributionEnvelopeException";
import { Set } from "typescript-collections";

describe("Identity tests", () => {
    it("should create instance with single parameter constructor", () => {
        const identity = new Identity("urn:nhs-itk:identity:test");
        expect(identity).to.be.instanceOf(Identity);
    });

    it("should create instance with two parameters", () => {
        const identity = new Identity("urn:nhs-itk:identity:test", "2.16.1.113883.2.1.3.2.4.21.1");
        expect(identity).to.be.instanceOf(Identity);
    });

    it("should throw exception when creating identity with invalid oid", () => {
        var func = function() {
            const identity = new Identity("urn:nhs-itk:identity:test", "2.16.1.113883.2.1.3.2.4.21.999");
        }
        expect(func).to.throw(DistributionEnvelopeException);
    });

    it("should get parts of uri", () => {
        const identity = new Identity("urn:nhs-itk:identity:test", "2.16.1.113883.2.1.3.2.4.21.1");
        const parts: Set<string> = identity.getParts();
        expect(parts).to.be.instanceOf(Set);
        expect(parts.size()).to.be.above(0);
        expect(parts.contains("test")).to.be.true;
    });

    it("should get parts of uri with more than 1 part", () => {
        const identity = new Identity("urn:nhs-itk:identity:test:get:parts", "2.16.1.113883.2.1.3.2.4.21.1");
        const parts: Set<string> = identity.getParts();
        expect(parts).to.be.instanceOf(Set);
        expect(parts.size()).to.be.above(2);
        expect(parts.contains("test")).to.be.true;
        expect(parts.contains("get")).to.be.true;
    });
});

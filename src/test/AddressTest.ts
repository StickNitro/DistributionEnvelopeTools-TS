import { expect } from "chai";
import { Address } from "../Address";
import { DistributionEnvelopeException } from "../DistributionEnvelopeException";
import { Set } from "typescript-collections";

describe("Address tests", () => {
    it("should create instance with single parameter constructor", () => {
        const address = new Address("urn:nhs-itk:addressing:test");
        expect(address).to.be.instanceOf(Address);
    });

    it("should create instance with two parameters", () => {
        const address = new Address("urn:nhs-itk:addressing:test", "2.16.1.113883.2.1.3.2.4.21.1");
        expect(address).to.be.instanceOf(Address);
    });

    it("should throw exception when creating address with invalid oid", () => {
        var func = function() {
            const address = new Address("urn:nhs-itk:addressing:test", "2.16.1.113883.2.1.3.2.4.21.999");
        }
        expect(func).to.throw(DistributionEnvelopeException);
    });

    it("should get parts of uri", () => {
        const address = new Address("urn:nhs-itk:addressing:test", "2.16.1.113883.2.1.3.2.4.21.1");
        const parts: Set<string> = address.getParts();
        expect(parts).to.be.instanceOf(Set);
        expect(parts.size()).to.be.above(0);
        expect(parts.contains("test")).to.be.true;
    });

    it("should get parts of uri with more than 1 part", () => {
        const address = new Address("urn:nhs-itk:addressing:test:get:parts", "2.16.1.113883.2.1.3.2.4.21.1");
        const parts: Set<string> = address.getParts();
        expect(parts).to.be.instanceOf(Set);
        expect(parts.size()).to.be.above(2);
        expect(parts.contains("test")).to.be.true;
        expect(parts.contains("get")).to.be.true;
    });
});

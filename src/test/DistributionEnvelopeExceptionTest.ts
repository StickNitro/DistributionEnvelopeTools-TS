import { expect } from "chai";
import { DistributionEnvelopeException } from "../DistributionEnvelopeException";

describe("DistributionEnvelopeException tests", () => {
    it("should throw exception of type DistributionEnvelopeException", () => {
        var test = function() {
            throw new DistributionEnvelopeException("xxx", "yyy", "zzz");
        }
        expect(test).to.throw(DistributionEnvelopeException);
    });

    it("should output exception detail when toString is called", () => {
        const exception = new DistributionEnvelopeException("xxx", "yyy", "zzz");
        const exString = exception.toString();
        expect(exString).to.have.length.above(50);
        expect(exString).to.contain("ITKException");
    });

    it("should update diagnostics of DistributionEnvelopeException", () => {
        const exception = new DistributionEnvelopeException("xxx", "yyy", "Hello");
        exception.updateDiagnostics("World");
        expect(exception.diagnostics.toString()).to.contain("Hello, World");
    });

    it("should not output stack trace when noStackTrace has been called", () => {
        const exception = new DistributionEnvelopeException("xxx", "yyy", "zzz");
        exception.noStackTrace();
        expect(exception.toString()).to.not.contain("Stack Trace");
    });
});

import * as pem from "pem";
import * as x509 from "x509";
import { X509Certificate } from "./X509Certificate";

let pfx = pem.readPkcs12("/Users/neilstevens/Documents/repositories/distributionenvelopetools-ts/wildcard.int.ic24.nhs.uk.pfx", { p12Password: "P@ssw0rd" }, (err, pfx) => {
    let cert = x509.parseCert(pfx["cert"]) as X509Certificate;
});

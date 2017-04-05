import { Dictionary } from "typescript-collections";

export interface X509Certificate {
    version: number
    subject: X509CertificateSubject
    issuer: X509CertificateIssuer
    serial: string
    notBefore: Date
    notAfter: Date
    subjectHash: string
    signatureAlgorithm: string
    fingerPrint: string
    publicKey: X509CertificatePublicKey
    altNames: string[]
    extensions: Dictionary<string, string>
}

export interface X509CertificateSubject {
    countryName: string
    stateOrProvinceName: string
    localityName: string
    organizationName: string
    organizationUnitName: string,
    commonName: string
}

export interface X509CertificateIssuer {
    domainComponent: string
    commonName: string
}

export interface X509CertificatePublicKey {
    algorithm: string
    e: string
    n: string
    bitSize: number
}

export class S3PreSignedRequest {
  operation: string;
  bucket: string;
  key: string;
  expires: number;
  url: string;

  constructor(
    operation: string,
    bucket: string,
    key: string,
    expires: number,
    url: string,
  ) {
    this.operation = operation;
    this.bucket = bucket;
    this.key = key;
    this.expires = expires;
    this.url = url;
  }
}

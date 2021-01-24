import { marshall } from '@aws-sdk/util-dynamodb';

export class DomainObject {
  id: string;
  contentUrl: string;
  status: ObjectStatus;
}

export enum ObjectStatus {
  New = 'NEW',
  Processed = 'PROCESSED',
}

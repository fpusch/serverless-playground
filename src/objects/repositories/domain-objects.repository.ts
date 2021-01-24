import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidV4 } from 'uuid';
import { CreateDomainObjectDto } from '../models/create-domain-object.dto';
import { DomainObject, ObjectStatus } from '../models/domain-object.model';

@Injectable()
export class DomainObjectsRepository {
  private dynamoDBClient: DynamoDBClient;
  private objectsTableName: string;

  constructor(config: ConfigService) {
    this.dynamoDBClient = new DynamoDBClient({
      region: config.get<string>('AWS_REGION') || 'eu-central-1',
    });
    this.objectsTableName = config.get<string>('DYNAMODB_OBJECTS_TABLE_NAME');
  }

  async createObject(dto: CreateDomainObjectDto) {
    console.log(dto);
    const newObject: DomainObject = {
      id: uuidV4(),
      contentUrl: 'something.com',
      status: ObjectStatus.New,
    };
    const command = new PutItemCommand({
      TableName: this.objectsTableName,
      Item: marshall(newObject as any),
    });
    try {
      const result = await this.dynamoDBClient.send(command);
    } catch (error) {
      console.error(error);
      return { ok: false, data: newObject };
    }
    return { ok: true, data: newObject };
  }
}

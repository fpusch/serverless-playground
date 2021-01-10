import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SqsService {
  sqsClient: SQSClient;

  constructor(config: ConfigService) {
    this.sqsClient = new SQSClient({
      region: config.get<string>('AWS_REGION') || 'eu-central-1',
    });
  }

  send(queueUrl: string, message: any) {
    const command = new SendMessageCommand({
      MessageBody: JSON.stringify(message),
      QueueUrl: queueUrl,
    });
    return this.sqsClient.send(command);
  }
}

import { Server } from 'http';
import express from 'express';
import { createApp } from './app';
import { createServer, proxy, Response } from 'aws-serverless-express';

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
  const expressServer = express();

  const nestApp = await createApp(expressServer);
  await nestApp.init();

  return createServer(expressServer);
}

export async function handler(event: any, context: any): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}

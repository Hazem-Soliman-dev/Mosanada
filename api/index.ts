import 'dotenv/config';
import { createApp } from '../src/main';

let app: any;

export default async function handler(req: any, res: any) {
  if (!app) {
    const nestApp = await createApp();
    await nestApp.init();
    app = nestApp.getHttpAdapter().getInstance();
  }
  app(req, res);
}

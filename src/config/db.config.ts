import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

const _USERNAME = '<username>';
const _PASSWORD = '<password>'
dotenv.config();  // Load environment variables from .env file

export function getMongooseConfig(): MongooseModuleOptions {

  let dbHost: string = process.env.MONGO_CONNECTION_STRING || 'localhost';

  // update username & password
  dbHost = dbHost.replace(_USERNAME, process.env.MONGO_USERNAME);
  dbHost = dbHost.replace(_PASSWORD, process.env.MONGO_PASSWORD);
  const uri: string = dbHost;
  
  return { uri };
}
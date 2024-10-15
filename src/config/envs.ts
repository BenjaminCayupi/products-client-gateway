import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NAT_SERVERS: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NAT_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  natServers: envVars.NAT_SERVERS,
};

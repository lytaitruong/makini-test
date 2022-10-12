import * as Joi from 'joi';
import { IAirtableConfig } from './airtable.interface';

export const airtableConfig = (): { airtable: IAirtableConfig } => {
  const config = {
    airtable: {
      apiKey: process.env.AIRTABLE_API_KEY,
      appKey: process.env.AIRTABLE_APP_KEY,
    },
  };
  const schema = Joi.object<IAirtableConfig>({
    apiKey: Joi.string().required(),
    appKey: Joi.string().required(),
  });
  const result = schema.validate(config.airtable, {
    allowUnknown: false,
    abortEarly: true,
  });
  if (result.error) throw result.error;

  return config;
};

export interface IAirtableConfig {
  apiKey: string;
  appKey: string;
}

export enum AirtableName {
  MODEL = 'models',
  MODEL_MODEL = 'model_model',
  DRAWINGS = 'drawings',
  SERVICES = 'services',
}

export enum AirtablePeriod {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  WEEK = 'week',
}

export enum AirtableUint {}

export interface IAirtableModel {
  number: string;
  description: string;
  unit: AirtableUint;
  note: string;
  interchangeable_with: string[];
  parents: string[]; // ModelModel(parent_number)
  children: string[] | IAirtableModel[]; // ModelModel(number)
  services: string[]; // Service (model)
  [key: string]: any;
}

export interface IAirtableModelModel {
  id: number;
  quantity: string;
  number: string; //Model (children)
  parent_number: string; // Model(parents)
  dwg_no: string;
  dwg_ref_no: string;
  [key: string]: any;
}

export interface IAirtableDrawing {
  name: string;
  model_model: string[];
  [key: string]: any;
}

export interface IAirtableService {
  name: string;
  instruction: string;
  conditions: string;
  recurring: string;
  calendar_internal: string;
  calendar_interval_unit: AirtablePeriod;
  running_hours_interval: string;
  alternative_internal: string;
  alternative_interval_description: string;
  service_group: string;
  model: string; // Model (services)
  [key: string]: any;
}

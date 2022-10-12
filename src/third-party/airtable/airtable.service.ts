import { AirtableUtil } from './airtable.util';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import {
  AirtableName,
  IAirtableDrawing,
  IAirtableModel,
  IAirtableModelModel,
  IAirtableService,
} from './airtable.interface';
import { QueryParams } from 'airtable/lib/query_params';
import { rangeTime } from 'src/common/common.util';

@Injectable()
export class AirtableService {
  private readonly logger = new Logger(AirtableService.name);

  constructor(private readonly config: ConfigService, private readonly airtableUtil: AirtableUtil) {}

  async getHierarchy() {
    const [models, modelRelations] = await Promise.all([
      this.airtableUtil.getAll<IAirtableModel>(AirtableName.MODEL),
      this.airtableUtil.getAll<IAirtableModelModel>(AirtableName.MODEL_MODEL),
    ]);
    this.logger.log(`total models: ${models.length}`);
    this.logger.log(`total modelRelationship: ${modelRelations.length}`);

    const buildHierarchy = () => {
      //Smoothly data and find root
      const root: IAirtableModel[] = [];
      const leaf: { [key: string]: IAirtableModel } = {};
      for (const model of models) {
        if (!model.fields.parents || !model.fields.parents.length) root.push({ _id: model.id, ...model.fields });
        else leaf[model.id] = model.fields;
      }
      const relations: { [key: string]: IAirtableModelModel } = modelRelations.reduce((list, model) => {
        list[model.id] = model.fields;
        return list;
      }, {});
      //Build tree
      const getLeaf = (record: IAirtableModel, level = 1) => {
        if (!record.children || !record.children.length) return null;
        record.children = record.children.map(child => {
          const relation = relations[child];
          if (!relation) return null;
          return {
            level,
            drawingId: relation.dwg_no,
            relationId: relation._id,
            ...leaf[relation.number],
          };
        });

        for (let i = 0; i < record.children.length; i++) {
          getLeaf(record.children[i], level + 1);
        }
      };
      for (const head of root) {
        getLeaf(head);
      }
      return root;
    };
    return buildHierarchy();
  }

  //REFACTOR IF the exam allow add more fields (add recordsID of model_model so just using formula filter)
  async getDrawings(params: QueryParams<IAirtableDrawing>) {
    const [records, modelRelations] = await Promise.all([
      this.airtableUtil.request<IAirtableDrawing>(AirtableName.DRAWINGS, params),
      this.airtableUtil.getAll<IAirtableModelModel>(AirtableName.MODEL_MODEL),
    ]);
    if (!records.length) return [];

    //SMOOTH DATA
    const relations: { [key: string]: IAirtableModelModel } = modelRelations.reduce((list, model) => {
      list[model.id] = model.fields;
      return list;
    }, {});
    const drawings = records.flat().map(record => {
      const list = new Set();
      for (const model_model of record.fields.model_model) {
        if (relations[model_model] && relations[model_model].parent_number) {
          list.add(relations[model_model].parent_number[0]);
        }
      }
      return {
        ...record.fields,
        models: [...list],
        _id: record.id,
      };
    });

    return drawings;
  }

  async getServicePlan(params: QueryParams<IAirtableService>, startDate = new Date()) {
    const records = await this.airtableUtil.getAll<IAirtableService>(
      AirtableName.SERVICES,
      // CAN'T using formula because not allow create more fields for formula if else statement
      params,
    );
    return records.map(({ fields, id }) => {
      if (fields.calendar_internal && fields.calendar_interval_unit) {
        fields.endDate = rangeTime(fields.calendar_interval_unit, startDate, parseInt(fields.calendar_internal, 10));
      } else if (fields.running_hours_interval) {
        fields.endDate = rangeTime('hour', startDate, parseInt(fields.running_hours_interval, 10));
      } else {
        fields.endDate = null;
      }
      return {
        ...fields,
        startDate,
        id,
      };
    });
  }
}

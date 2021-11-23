import fs from 'fs/promises';

import { Query, QueryOptions, QueryCondition, AndQueryCondition, OrQueryCondition } from './types';


export class FileModel {
  private filepath: string;
  private key: string;

  constructor(filepath: string, key: string) {
    this.filepath = filepath;
    this.key = key;
  }

  private async readAll (): Promise<unknown[]> {
    const buffer = await fs.readFile(this.filepath);
    const data = JSON.parse(buffer.toString());

    if (!data[this.key]) throw new Error('FileModel key is invalid!');

    return data[this.key];
  }

  private filterData (data: unknown[], query?: Query, options?: QueryOptions): unknown[] {
    const matchCondition = (data: unknown, condition: QueryCondition): boolean => {
      const key = Object.keys(condition)[0];
      const value = (<Record<string,unknown>>data)[key];

      const isString = typeof value === 'string';

      const { eq, like, in: inOp } = condition[key];

      if (eq) return eq === value;

      if (like) return isString && like.test(value);

      if (inOp) return isString && inOp.includes(value);

      return false;
    }

    const applyOptions = (data: unknown[], options?: QueryOptions): unknown[] => {
      if (!options) return data;

      const { offset, limit } = options;

      if (!offset) return data.slice(0, limit);

      if (!limit) return data.slice(offset);

      return data.slice(offset, offset + limit);
    }

    if (!query) return applyOptions(data, options);

    if ((<AndQueryCondition>query).and) {
      const { and } = query as AndQueryCondition;

      return applyOptions(
        data.filter((entry) => (and).every((condition) => matchCondition(entry, condition))),
        options,
      );
    }

    if ((<OrQueryCondition>query).or) {
      const { or } = query as OrQueryCondition;
      return applyOptions(
        data.filter((entry) => or.some((condition) => matchCondition(entry, condition))),
        options,
      );
    }

    if (Object.keys(query).length) {
      return applyOptions(
        data.filter((entry) => matchCondition(entry, query as QueryCondition)),
        options,
      );
    }

    return [];
  }

  async find (query?: Query, options?: QueryOptions): Promise<unknown[]> {
    const data = await this.readAll();

    return this.filterData(data, query, options);
  }
}

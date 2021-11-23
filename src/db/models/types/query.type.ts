
export type QueryCondition = { [s: string]: { eq?: string, like?: RegExp, in?: string[] } };

export type AndQueryCondition = { and: QueryCondition[] };

export type OrQueryCondition = { or: QueryCondition[] };

export type Query = QueryCondition | AndQueryCondition | OrQueryCondition;

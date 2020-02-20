
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CategoryCreateInput {
    name: string;
    description?: string;
}

export class WordInput {
    name: string;
    categoryId: GraphQLObjectId;
}

export class Category {
    name: string;
    description?: string;
}

export abstract class IMutation {
    abstract createCategory(data: CategoryCreateInput): Category | Promise<Category>;

    abstract createWord(data: WordInput): Word | Promise<Word>;
}

export abstract class IQuery {
    abstract categories(): Category[] | Promise<Category[]>;

    abstract findCategory(id: GraphQLObjectId): Category | Promise<Category>;

    abstract words(): Word[] | Promise<Word[]>;
}

export class Word {
    name?: string;
}

export type JSON = any;

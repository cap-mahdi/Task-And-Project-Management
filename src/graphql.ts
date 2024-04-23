
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class User {
    id: string;
    title: string;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;
}

type Nullable<T> = T | null;


/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    userId?: Nullable<string>;
    email?: Nullable<string>;
}

export interface IQuery {
    users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    user(userId: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;

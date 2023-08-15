/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AuthDto {
  email: string;
  password: string;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface CreateAccountDto {
  value: number;
  name: string;
  description: string;
}

export interface AccountDto {
  id: number;
  value: number;
  name: string;
  description: string;
  expenses: number;
  income: number;
  savingId?: number;
  saving?: AccountDto;
}

export interface UpdateAccountDto {
  /** @example "Salary" */
  name?: string;
  /** @example "Main account where i get salary and pay for the groceries" */
  description?: string;
}

export interface CreateOperationDto {
  accountId: number;
  value: number;
  type: string;
  title: string;
  description: string;
}

export interface OperationDto {
  accountId: number;
  created_at: string;
  description?: string;
  id: number;
  title: string;
  type: string;
  updated_at: string;
  userId: number;
  value: number;
}

export type UpdateOperationDto = object;

export interface CreateDepthDto {
  value: number;
  valueCovered: number;
  title: string;
  description: string;
  /** @format date-time */
  deadline: string;
}

export interface DeptDto {
  id: number;
  value: number;
  valueCovered: number;
  title: string;
  description: string;
  deadline: string;
}

export type UpdateDepthDto = object;

export interface PayDepthDto {
  /** Id of account from which you gonna pay the dept */
  accountId: number;
  value: number;
}

export interface ChartFiltersDto {
  data: Record<string, number[]>;
}

export interface ChartPointDto {
  date: string;
  value: number;
}

export interface ChartLineDto {
  lineKey: string;
  lineData?: ChartPointDto[];
}

export interface ChartDataDto {
  chartLines: ChartLineDto[];
}

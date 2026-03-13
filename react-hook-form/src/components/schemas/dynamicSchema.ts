export interface AdminFields {
  department: string;
  access_level: string;
}

export interface UserFields {
  interests: string[];
  subscriptions: string;
}

export type DynamicFields = UserFields | AdminFields;

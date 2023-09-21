export type User = {
  id: number;
  level: number;
  rank: number;
  experience: number;
  name: string;
};

export type LogState = {
  updated_at: Date;
  log_name: String;
  users: Array<User>;
};

export type AllLogStates = {
  [logname: string]: LogState;
};

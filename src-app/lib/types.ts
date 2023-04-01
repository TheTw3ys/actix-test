export interface FullCurrentState extends Omit<CurrentState, "users"> {
    users: { [id: string]: FullUser };
  };
  
  export type LogUser = {
    id: number;
    name: string;
    experience: number;
    level: number;
  };
  export type FullUser = LogUser & { rank: number };
  export interface CurrentState {
    updatedAt: Date;
    logname: string;
    users: { [id: string]: LogUser };
  }
export type User = {
  id: number,
  level: number,
  rank: number,
  experience: number,
  name: string,
}

export type LogState = {
  updatedAt: Date,
  logName: String,
  users: Array<User>,
}

export type AllLogStates = {
  updatedAt:Date,
  logs: Array<LogState>,
}
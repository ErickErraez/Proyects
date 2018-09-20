export enum Status {
  Online = "Online",
  Offline = "Offline",
  Busy = "Busy",
  AppearOffline = "AppearOffline",
  Away = "Away"
}
export interface User {
  nick: string;
  subnick?: string;
  friends?: any;
  age?: number;
  active: boolean;
  status: Status;
  uid: any;
  email: string;
  avatar?: string;
  direccion?: string;
}

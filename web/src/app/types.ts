export interface IUser {
  id: string;
  username: string;
  discriminator: number;
  email?: string;
  admin: boolean;
}

export interface IGuild {
  id: string;
  name: string;
  owner_id: string;
}

export interface IChannel {
  id: string;
  name: string;
  created_at: number;
}

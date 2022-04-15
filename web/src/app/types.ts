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

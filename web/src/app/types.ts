export interface IUser {
  id: string;
  username: string;
  discriminator: number;
  email?: string;
  admin: boolean;
}

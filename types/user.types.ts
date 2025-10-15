// types.ts
export type User = {
  id: string;
  name: string;
  email: string;
  token?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type Session = {
  id: string;
  deviceName: string;
  platform: string;
  timezone: string;
  ipAddress: string;
  valid: boolean;
  createdAt: string;
  expiresAt: string;
};

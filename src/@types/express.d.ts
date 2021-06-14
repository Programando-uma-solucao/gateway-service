declare namespace Express {
  export interface Request {
    user: {
      iat: number;
      exp: number;
      sub: string;
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}

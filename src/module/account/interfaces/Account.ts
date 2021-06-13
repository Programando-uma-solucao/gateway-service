export interface Account {
  _id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  oab?: string;
  password: string;
  sex: string;
  role: string;
  tags?: Array<string>;
}

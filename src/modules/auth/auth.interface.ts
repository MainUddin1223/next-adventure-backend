export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  role: 'user';
  email: string;
  contactNo: string;
  about: string;
  profileImg: string;
  password: string;
}

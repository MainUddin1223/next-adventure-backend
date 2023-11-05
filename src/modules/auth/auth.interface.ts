export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  name: string;
  email: string;
  contactNo: string;
  profileImg: string;
  about: string;
  password: string;
}

export interface IRegisterPayload extends ISignUpPayload {
  location: string;
}

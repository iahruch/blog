export class IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export class IAtuhResponce {
  idToken: string;
  email: string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered:	boolean;
}

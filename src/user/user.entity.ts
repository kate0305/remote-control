export class User {
  login: string;
  password: string;
  id = Date.now();

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}

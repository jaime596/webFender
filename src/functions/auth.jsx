class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    localStorage.setItem("authenticated", true);
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    localStorage.setItem("authenticated", false);
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return localStorage.getItem("authenticated");
  }

}

export default new Auth();

module.exports = nodefony.register('Provider', () => {

  const Provider = class Provider extends nodefony.Service {

    constructor(name, manager) {
      super(name, manager.container);
      this.manager = manager;
    }

    authenticate(token) {
      return new Promise((resolve, reject) => {
        if (token && this.supports(token)) {
          return resolve(token);
        }
        return reject(new Error("The token is not supported by this authentication provider " + this.name));
      });
    }

    refreshUser(user) {
      return user;
    }

    supports( /*token*/ ) {
      return true;
    }

  };

  return Provider;
});
module.exports = nodefony.register('Factory', () => {

  const Factory = class Factory extends nodefony.Service {

    constructor(name, security, settings = {}) {
      super(name, security.container, security.notificationsCenter);
      this.settings = settings ||  {};
      this.security = security;
      this.providerName = this.settings.provider;
      this.kernel.once("onPostReady", () => {
        if (!this.providerName) {
          this.providerName = this.security.providerName;
        }
        if (this.providerName !== this.security.providerName) {
          this.provider = this.security.getProvider(this.providerName);
        } else {
          this.provider = this.security.provider;
        }
      });
    }

    logger(pci, severity, msgid, msg) {
      if (!msgid) {
        msgid = `\x1b[36mFACTORY ${this.name}\x1b[0m`;
      }
      return super.logger(pci, severity, msgid, msg);
    }

    handle(context) {
      return this.authenticate(context)
        .then(token => {
          return token;
        })
        .catch(error => {
          throw error;
        });
    }

    authenticate(context) {
      return new Promise((resolve, reject) => {
        this.logger("FACTORY AUTHENTICATION " + this.name, "DEBUG");
        let token = null;
        try {
          token = this.createToken(context, this.providerName);
          if (!this.supportsToken(token)) {
            return reject(new Error("Factory " + this.name + " Token Unauthorized !! "));
          }
          return this.authenticateToken(token, this.provider)
            .then((token) => {
              token.setFactory(this.name);
              token.setProvider(this.providerName);
              return resolve(token);
            }).catch((e) => {
              return reject(e);
            });
        } catch (e) {
          return reject(e);
        }
      });
    }

    createToken( /* context, providerName*/ ) {}

    supportsToken( /*token*/ ) {
      return true;
    }

    authenticateToken(token, provider) {
      if (provider) {
        return provider.authenticate(token).then((token) => {
          return provider.loadUserByUsername(token.getUsername())
            .then((user) => {
              if (user) {
                token.setUser(user);
                this.logger(`TRY AUTHENTICATION  ${token.getUsername()}  PROVIDER ${provider.name}`, "DEBUG");
                return token;
              }
              throw Error(`user ${token.getUsername()} not found `);
            }).catch((error) => {
              throw error;
            });
        }).catch((error) => {
          throw error;
        });
      } else {
        return new Promise((resolve, reject) => {
          return reject(new Error(`authenticateToken Provider ${provider}`));
        });
      }
    }
  };
  return Factory;
});
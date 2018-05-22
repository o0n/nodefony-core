/*
 *	PASSPORT LOCAL  FACTORY
 */
const LocalStrategy = require('passport-local').Strategy;

module.exports = nodefony.registerFactory("passport-local", () => {

  const Factory = class localFactory extends nodefony.passeportFactory {

    constructor(security, settings) {
      super("local", security, settings);
    }

    getStrategy(options) {
      return new LocalStrategy(options, (username, password, done) => {
        this.logger("TRY AUTHENTICATION " + this.name + " : " + username, "DEBUG");
        let mytoken = new nodefony.security.tokens.userPassword(username, password);
        this.authenticateToken(mytoken).then((token) => {
          done(null, token);
          return token;
        }).catch((error) => {
          done(error, null);
          throw error;
        });
      });
    }

  };
  return Factory;
});
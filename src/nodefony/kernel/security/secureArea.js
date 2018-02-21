module.exports = nodefony.register("SecuredArea", function () {

  // context security
  const securedArea = class securedArea extends nodefony.Service {

    constructor(name, firewall) {
      super(name, firewall.container, firewall.notificationsCenter);
      this.firewall = firewall;
      this.router = this.get("router");
      this.sessionContext = "default";
      this.cors = null;
      this.pattern = /.*/;
      this.factories = [];
      //this.factory = null;
      this.nbFactories = 0;
      this.provider = null;
      this.providerName = null;
      this.formLogin = null;
      this.checkLogin = null;
      this.redirect_Https = false;
      this.defaultTarget = null;
      this.alwaysUseDefaultTarget = false;
      this.stateLess = false;
      this.anonymous = false;
      this.prependOnceListener("onReady", () => {
        try {
          if (this.providerName) {
            if (this.providerName in this.firewall.providerManager.providers) {
              this.provider = this.firewall.providerManager.getProvider(this.providerName);
            } else {
              if (this.anonymous) {
                this.providerName = "anonymous";
                this.provider = this.firewall.providerManager.getProvider("anonymous");
              } else {
                throw new Error(`Provider : ${this.providerName} not found in firewall ${this.name}`);
              }
            }
          } else {
            if (this.anonymous) {
              this.providerName = "anonymous";
              this.provider = this.firewall.providerManager.getProvider("anonymous");
            } else {
              this.providerName = "nodefony";
              this.provider = this.firewall.providerManager.getProvider("nodefony");
            }
          }
        } catch (e) {
          this.logger(this.name + "  " + e, "ERROR");
        }
      });
    }

    logger(pci, severity, msgid, msg) {
      if (!msgid) {
        msgid = "\x1b[36mCONTEXT SECURITY \x1b[31m" + this.name + " \x1b[0m";
      }
      return super.logger(pci, severity, msgid, msg);
    }

    handleCrossDomain(context) {
      let redirect = false;
      if (context.security.redirect_Https && context.protocol === "https" && context.originUrl.protocol === "http:") {
        redirect = "https";
      }
      if (context.crossDomain) {
        if (this.cors) {
          return this.cors.match(context, redirect);
        } else {
          if (redirect) {
            return null;
          }
          return 401;
        }
      }
    }

    handleError(context, e) {
      let error = null;
      switch (context.type) {
      case "HTTP":
      case "HTTPS":
      case "HTTP2":
        if (this.formLogin) {
          if (e.message) {
            this.logger(e.message, "DEBUG");
          } else {
            this.logger(e, "DEBUG");
          }
          if (e && e.status) {
            context.response.setStatusCode(e.code, e.message);
          } else {
            context.response.setStatusCode(401);
          }
          if (context.session &&
            (context.request.url.pathname !== this.formLogin) &&
            (context.request.url.pathname !== this.checkLogin) &&
            (!this.alwaysUseDefaultTarget)) {

            let target_path = null;
            let area = context.session.getMetaBag("area");
            if (area && area !== this.name) {
              context.session.clearFlashBag("default_target_path");
            } else {
              target_path = context.session.getFlashBag("default_target_path");
            }
            if (!target_path) {
              context.session.setFlashBag("default_target_path", context.request.url.pathname);
            } else {
              context.session.setFlashBag("default_target_path", target_path);
            }
            context.session.setMetaBag("area", this.name);
          }
          try {
            //context.resolver = this.overrideURL(context, this.formLogin);
            return this.redirect(context, this.formLogin);
          } catch (e) {
            error = new Error("Form Login route : " + this.formLogin + " this route not exist. Check Security config file");
            error.code =  500;
            return error;
          }
          if (!context.resolver.resolve) {
            error = new Error("Form Login route : " + this.formLogin + " this route not exist. Check Security config file");
            error.code =  500;
            return error;
          }
          if (!context.isAjax) {
            if (context.session && e.message !== "Unauthorized") {
              context.session.setFlashBag("session", {
                error: e.message
              });
            }
          } else {
            context.isJson = true;
            //context.setXjson(e);
            error = new Error(e.message);
            error.code = e.status;
            return error;
          }
        } else {
          if (e.status) {
            error = new Error(e.message);
            error.code = e.status;
            return error;
          } else {
            return e;
          }
        }
        break;
      case "WEBSOCKET":
      case "WEBSOCKET SECURE":
        if (e.status) {
          error = new Error(e.message);
          error.code = e.status;
          return error;
        }
        return e;
      }
    }

    handleFactories(context, index = 1) {
      return new Promise((resolve, reject) => {
        if (this.nbFactories) {
          try {
            this.factories[index - 1].handle(context)
              .then((token) => {
                return resolve(token);
              })
              .catch((e) => {
                this.factories[index - 1].logger(e, "ERROR");
                if (index === this.nbFactories) {
                  return reject(e);
                }
                return resolve(this.handleFactories(context, ++index));
              });
          } catch (e) {
            return reject(e);
          }
        } else {
          return resolve(null);
        }
      });
    }

    handle(context) {
      return new Promise((resolve, reject) => {
        return this.handleFactories(context)
          .then((token) => {
            let target = this.defaultTarget;
            try {
              if (token) {
                context.user = token.user;
                context.token = token;
              }
              if (context.session) {
                context.session.migrate();
                context.session.setMetaBag("security", {
                  firewall: this.name,
                  token: token.serialize()
                });
                if (context.user && context.user.lang) {
                  context.session.set("lang", context.user.lang);
                } else {
                  context.session.set("lang", context.translation.defaultLocale);
                }
                let target_path = context.session.getFlashBag("default_target_path");
                if (target_path) {
                  target = target_path;
                }
              }
            } catch (e) {
              return reject(e);
            }
            if (this.checkLogin) {
              try {
                context.resolver = this.overrideURL(context, this.checkLogin);
                //context.resolver = this.router.resolveName(context, this.checkLogin);
                return resolve(context);
              } catch (e) {
                throw e;
              }
            }
            if (!target) {
              return resolve(context);
            }
            try {
              context.resolver = this.overrideURL(context, target);
            } catch (e) {
              throw e;
            }
            if (context.isAjax) {
              context.isJson = true;
              return resolve(context);
            } else {
              return resolve(this.redirect(context, target));
            }
            return resolve(context);
          })
          .catch((error) => {
            if (!error) {
              error = new Error("undefined Error ");
              error.code = 401;
              return reject(error);
            }
            if (context.isAjax) {
              context.isJson = true;
            }
            let res = context.security.handleError(context, error);
            if (res) {
              return reject(res);
            }
            return resolve(context);
          });
      });
    }

    // Factory
    setFactory(auth, options) {
      if (auth) {
        if (auth in nodefony.security.factories) {
          let index = null;
          if (auth === "anonymous") {
            this.anonymous = true;
            index = this.factories.push(new nodefony.security.factories[auth](this, options));
          } else {
            this.factories.unshift(new nodefony.security.factories[auth](this, options));
            index = 0;
          }
          this.nbFactories++;
          this.logger("FACTORY " + auth + " registered ", "DEBUG");
          return this.factories[index];
        } else {
          this.logger("FACTORY :" + auth + "NOT registered ", "ERROR");
          throw new Error("FACTORY :" + auth + "NOT registered ");
        }
      }
    }

    getFactory(name) {
      if (name) {
        let index = this.factories.findIndex((factory) => {
          return factory.name === name;
        });
        if (index >= 0) {
          return this.factories[index];
        }
        return null;
      }
      return null;
    }

    setProvider(provider) {
      this.providerName = provider;
    }

    getProvider() {
      return this.provider;
    }

    setStateLess(state) {
      if (state === null) {
        return this.stateLess = true;
      }
      return this.stateLess = state || false;
    }

    overrideURL(context, myUrl) {
      if (myUrl) {
        context.method = "GET";
        context.request.url = url.parse(url.resolve(context.request.url, myUrl));
      }
      return this.router.resolve(context);
    }

    redirectHttps(context) {
      // no cache
      return context.redirectHttps(301, true);
    }

    redirect(context, url) {
      if (url) {
        // no cache
        return context.redirect(url, 301, true);
      }
      return context.redirect(context.request.url, 301, true);
    }

    match(context) {
      let url = context.request.url ? context.request.url.pathname : (context.request.resourceURL ? context.request.resourceURL.pathname : null);
      return this.pattern.exec(url);
    }

    setPattern(pattern) {
      this.regPartten = pattern;
      this.pattern = new RegExp(pattern);
    }

    setCors(crossSettings) {
      this.cors = this.firewall.corsManager.createCors(crossSettings);
      return this.cors;
    }

    setFormLogin(route) {
      this.formLogin = route;
    }

    setCheckLogin(route) {
      this.checkLogin = route;
    }

    setDefaultTarget(route) {
      this.defaultTarget = route;
    }

    setAlwaysUseDefaultTarget(data) {
      this.alwaysUseDefaultTarget = data;
    }

    setContextSession(context) {
      this.sessionContext = context;
    }

    setRedirectHttps(value) {
      this.redirect_Https = value ||  false;
    }
  };

  return securedArea;
});
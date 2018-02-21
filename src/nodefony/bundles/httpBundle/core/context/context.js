nodefony.register("Context", () => {


  const Context = class Context extends nodefony.Service {

    constructor(container, request, response, type) {
      super(type + " CONTEXT", container);
      this.type = type;
      this.set("context", this);
      this.kernelHttp = this.get("httpKernel");
      this.router = this.get("router");
      this.translation = this.kernelHttp.translation.createTranslation(this);
      this.set("translation", this.translation);
      this.resolver = null;
      this.nbCallController = 0;
      this.requestEnded = false;
      // session
      this.session = null;
      this.sessionService = this.get("sessions");
      this.sessionAutoStart = this.sessionService.sessionAutoStart;
      //parse cookies
      this.cookies = {};
      this.crossDomain = null;
      this.secureArea = null;
      this.security = null;
      this.user = null;
      this.token = null;
    }

    logger(pci, severity, msgid, msg) {
      if (!msgid) {
        msgid = this.type + " REQUEST";
      }
      return super.logger(pci, severity, msgid, msg);
    }

    clean() {
      this.kernelHttp = null;
      delete this.kernelHttp;
      this.router = null;
      delete this.router;
      this.crossDomain = null;
      delete this.crossDomain;
      this.secureArea = null;
      delete this.secureArea;
      this.security = null;
      delete this.security;
      this.user = null;
      delete this.user;
      this.token = null;
      delete this.token;
      if (this.resolver) {
        this.resolver.clean();
      }
      this.resolver = null;
      delete this.resolver;
      this.session = null;
      delete this.session;
      this.translation = null;
      delete this.translation;
      this.cookies = null;
      delete this.cookies;
      this.cookieSession = null;
      delete this.cookieSession;
      super.clean();
    }

    getRequest() {
      return this.request;
    }

    getResponse() {
      return this.response;
    }

    addCookie(cookie) {
      if (cookie instanceof nodefony.cookies.cookie) {
        this.cookies[cookie.name] = cookie;
      } else {
        let error = new Error("addCookie cookie not valid !!");
        this.logger(cookie, "ERROR");
        throw error;
      }
    }

    parseCookies() {
      return nodefony.cookies.cookiesParser(this);
    }

    getCookieSession(name) {
      if (this.cookies[name]) {
        return this.cookies[name];
      }
      return null;
    }
    hasSession() {
      return (!!this.cookieSession);
    }

    isValidDomain() {
      return this.kernelHttp.isValidDomain(this);
    }
    isCrossDomain() {
      return this.kernelHttp.corsManager.isCrossDomain(this);
    }

    getUser() {
      return this.user ||  null;
    }

    generateAbsoluteUrl(name, variables) {
      try {
        let host = this.request.url.protocol + "//" + this.request.url.host;
        return this.router.generatePath.call(this.router, name, variables, host);
      } catch (e) {
        throw e;
      }
    }

    getFlashBag(key) {
      if (this.session) {
        return this.session.getFlashBag(key);
      }
      return null;
    }

    setCookie(cookie) {
      if (cookie) {
        return this.response.addCookie(cookie);
      }
    }

    createCookie(name, value, settings) {
      try {
        let cookie = new nodefony.cookies.cookie(name, value, settings);
        return this.setCookie(cookie);
      } catch (e) {
        throw e;
      }
    }

  };
  return Context;
});
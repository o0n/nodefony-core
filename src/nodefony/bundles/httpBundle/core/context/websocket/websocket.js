nodefony.register.call(nodefony.context, "websocket", function () {

  const onClose = function (reasonCode, description) {
    if (!this.request) {
      this.logger('CLOSE : ' + this.remoteAddress + " " + reasonCode + " " + description, "INFO");
    } else {
      this.logger('CLOSE : ' + this.remoteAddress + " ORIGIN : " + this.origin + " " + reasonCode + " " + description, "INFO");
    }
    if (this.connection.state !== "closed") {
      try {
        this.response.drop(reasonCode, description);
      } catch (e) {
        this.logger('CLOSE : ' + this.remoteAddress + " ORIGIN : " + this.origin + " " + e.message, "ERROR");
      }
      this.fire("onClose", reasonCode, description, this.connection);
    } else {
      this.fire("onClose", reasonCode, description, this.connection);
    }
    this.fire("onFinish", this, reasonCode, description);
  };

  const websocket = class websocket extends nodefony.Context {

    constructor(container, request, type) {
      super(container, request, null, type);

      this.protocol = (type === "WEBSOCKET SECURE") ? "wss" : "ws";
      this.scheme = (type === "WEBSOCKET SECURE") ? "wss" : "ws";
      this.isJson = true;
      this.method = this.getMethod();
      this.response = new nodefony.wsResponse(null, this.container, this.type);
      this.request = request;
      this.request.method = this.method;
      this.remoteAddress = this.request.remoteAddress;
      this.origin = this.request.origin;
      this.acceptedProtocol = request.httpRequest.headers["sec-websocket-protocol"] || null;
      this.request.url = url.parse(this.scheme + "://" + this.request.host);
      this.request.url.hash = this.request.resourceURL.hash;
      this.request.url.search = this.request.resourceURL.search;
      this.request.url.query = this.request.resourceURL.query;
      this.request.url.pathname = this.request.resourceURL.pathname;
      this.request.url.path = this.request.resourceURL.path;
      this.url = url.format(this.request.url);
      this.port = this.request.url.port;

      this.parseCookies();
      this.cookieSession = this.getCookieSession(this.sessionService.settings.name);

      try {
        this.originUrl = url.parse(this.request.origin);
      } catch (e) {
        this.originUrl = url.parse(this.url);
      }

      // domain
      this.domain = this.getHostName();
      this.validDomain = this.isValidDomain();
      this.logger("FROM : " + this.remoteAddress + " ORIGIN : " + this.originUrl.host + " URL : " + this.url, "INFO");

      // LISTEN EVENTS
      this.listen(this, "onView", (result) => {
        if (this.response) {
          this.response.body = result;
        }
      });
      this.listen(this, "onResponse", this.send);
      this.once("onRequest", this.handle.bind(this));
      this.once("connect", () => {
        this.connect(this.resolver.acceptedProtocol);
      });
      //case proxy
      this.proxy = null;
      if (this.request.httpRequest.headers["x-forwarded-for"]) {
        this.proxy = {
          proxyServer: this.request.httpRequest.headers["x-forwarded-server"],
          proxyProto: this.request.httpRequest.headers["x-forwarded-proto"],
          proxyPort: this.request.httpRequest.headers["x-forwarded-port"],
          proxyFor: this.request.httpRequest.headers["x-forwarded-for"],
          proxyHost: this.request.httpRequest.headers["x-forwarded-host"],
          proxyVia: this.request.httpRequest.headers.via
        };
        this.logger("PROXY WEBSOCKET REQUEST x-forwarded VIA : " + this.proxy.proxyVia, "DEBUG");
      }
      this.crossDomain = this.isCrossDomain();
    }

    connect(acceptedProtocol) {
      this.connection = this.request.accept(acceptedProtocol || null, this.origin /*, this.request.cookies || null*/ );
      this.response.setConnection(this.connection);
      this.connection.on('close', onClose.bind(this));
      this.requestEnded = true;
      this.fire("onConnect", this, this.connection);
      this.logger("Connection origin : " + this.originUrl.host + " Protocol : " + acceptedProtocol || "Not Defined", "DEBUG");
      // LISTEN EVENTS SOCKET
      this.connection.on('message', this.handleMessage.bind(this));
    }

    getRemoteAddress() {
      return this.remoteAddress;
    }

    getHost() {
      return this.request.httpRequest.headers.host;
    }

    getHostName() {
      return this.request.url.hostname;
    }

    getUserAgent() {
      return this.request.httpRequest.headers['user-agent'];
    }

    getMethod() {
      return "WEBSOCKET";
    }

    clean() {
      //delete this.request ;
      this.request = null;
      if (this.response) {
        this.response.clean();
      }
      this.response = null;
      this.cookies = null;
      if (this.translation) {
        delete this.translation;
      }
      if (this.cookieSession) {
        delete this.cookieSession;
      }
      if (this.resolver) {
        this.resolver.clean();
      }
      this.resolver = null;
      delete this.resolver;
      this.kernelHttp = null;
      delete this.kernelHttp;
      this.router = null;
      delete this.router;
      //super.clean();
    }

    controller(pattern, data) {
      let container = this.kernelHttp.container.enterScope("subRequest");
      container.set("context", this);
      container.set("translation", this.translation);
      let control = null;
      let resolver = null;
      try {
        resolver = this.router.resolveName(this, pattern);
      } catch (e) {
        return this.fire("onError", this.container, e);
      }
      if (!resolver.resolve) {
        let error = new Error(pattern);
        error.code = 404;
        return this.fire("onError", this.container, error);
      }
      try {
        control = new resolver.controller(container, this);
        control.response = new nodefony.Response(null, container, this.type);
        if (data) {
          Array.prototype.shift.call(arguments);
          for (let i = 0; i < arguments.length; i++) {
            resolver.variables.push(arguments[i]);
          }
        }
      } catch (e) {
        return this.fire("onError", this.container, e);
      }
      return {
        resolver: resolver,
        controller: control,
        response: resolver.action.apply(control, resolver.variables)
      };
    }

    render(subRequest) {
      this.removeListener("onView", subRequest.controller.response.setBody);
      this.kernelHttp.container.leaveScope(subRequest.controller.container);
      switch (true) {
      case subRequest.response instanceof nodefony.Response:
      case subRequest.response instanceof nodefony.wsResponse:
        return subRequest.response.body;
      case subRequest.response instanceof Promise:
      case subRequest.response instanceof BlueBird:
        if (subRequest.controller.response.body === "") {
          let txt = "nodefony TWIG function render can't resolve async Call in Twig Template ";
          this.logger(txt, "ERROR");
          return txt;
        }
        return subRequest.controller.response.body;
      case nodefony.typeOf(subRequest.response) === "object":
        if (subRequest.resolver.defaultView) {
          return this.render({
            resolver: subRequest.resolver,
            controller: subRequest.controller,
            response: subRequest.controller.render(subRequest.resolver.defaultView, subRequest.response)
          });
        } else {
          throw new Error("default view not exist");
        }
        break;
      case typeof subRequest.response === "string":
        return subRequest.response;
      default:
        this.logger("nodefony TWIG function render can't resolve async Call in Twig Template ", "WARNING");
        return this.response.body;
      }
    }

    handleMessage(message) {
      this.response.body = message;
      try {
        if (!this.resolver) {
          this.resolver = this.router.resolve(this);
        } else {
          try {
            this.resolver.match(this.resolver.route, this);
          } catch (e) {
            this.request.reject();
            this.fire("onError", this.container, e);
            return;
          }
        }
        this.fire("onMessage", message, this, "RECEIVE");
        if (this.resolver.resolve) {
          return this.resolver.callController(message);
        } else {
          this.request.reject();
        }
      } catch (e) {
        this.fire("onError", this.container, e);
      }
    }

    handle(data) {
      try {
        this.translation.handle();
        if (!this.resolver) {
          this.resolver = this.router.resolve(this);
        } else {
          try {
            this.resolver.match(this.resolver.route, this);
          } catch (e) {
            this.request.reject();
            throw e;
          }
        }
        //WARNING EVENT KERNEL
        this.kernel.fire("onRequest", this, this.resolver);
        if (this.resolver.resolve) {
          return this.resolver.callController(data || null);
        } else {
          this.request.reject();
        }
      } catch (e) {
        this.fire("onError", this.container, e);
      }
    }

    handleError(container, error) {
      this.logger("Message : " + error.message, "ERROR");
    }

    send(data, type) {
      let myData = null;
      if (this.response) {
        if (data instanceof nodefony.wsResponse) {
          myData = this.response.body;
        } else {
          myData = data;
        }
        this.fire("onMessage", myData, this, "SEND");
        this.fire("onSend", this.response, this);
        return this.response.send(myData, type);
      }
      return null;
    }

    close(reasonCode, description) {
      if (this.response) {
        return this.response.close(reasonCode, description);
      }
    }

    drop(reasonCode, description) {
      return this.response.drop(reasonCode, description);
    }
  };
  return websocket;
});
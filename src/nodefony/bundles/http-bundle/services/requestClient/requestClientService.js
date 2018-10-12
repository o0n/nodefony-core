const request = require("request");

const defaultOptions = {

  method: 'GET',
  timeout: 1500,
  "User-Agent": `${nodefony.projectName}@${nodefony.projectVersion}`,
  //auth: null
  /*{
    user: null,
    pass: null,
    sendImmediately: true,
    bearer: null
  }*/
};


class Request extends nodefony.Service {

  constructor(baseUrl, options, service) {
    super("request", service.container, null, defaultOptions);
    this.baseUrl = null;
    this.service = service;
    let type = nodefony.typeOf(baseUrl);
    switch (true) {
    case type === "string":
      this.baseUrl = url.parse(baseUrl);
      if (options) {
        this.options = nodefony.extend(true, this.options, options);
      }
      break;
    case type === "object":
      if (baseUrl instanceof nodefony.Service) {
        this.service = baseUrl;
      } else {
        this.options = nodefony.extend(true, this.options, baseUrl);
      }
      break;
    default:
      throw new nodefony.requestError("Bad argument type", null, service.container);
    }
  }

  authenticate(myrequest, sendImmediately = true, bearer = null) {
    return myrequest.auth(this.options.auth.login, this.options.auth.passwd, sendImmediately, bearer);
  }

  http(uri, options, container) {
    let req = null;
    return new Promise((resolve, reject) => {
      try {
        let myurl = null;
        let myoptions = nodefony.extend(true, {}, this.options);
        let type = nodefony.typeOf(uri);
        switch (true) {
        case type === "string":
          if (uri === "") {
            if (this.baseUrl) {
              myurl = url.parse(this.baseUrl);
            } else {
              throw new nodefony.requestError("http request Bad url", null, container);
            }
          } else {
            if (this.baseUrl) {
              if (/^\//.test(uri)) {
                if (/\/$/.test(this.baseUrl)) {
                  uri = uri.replace(/\/(.*)/, "$1");
                }
                myurl = url.parse(`${this.baseUrl.href}${uri}`);
              } else {
                if (/\/$/.test(this.baseUrl)) {
                  myurl = url.parse(`${this.baseUrl.href}${uri}`);
                } else {
                  myurl = url.parse(`${this.baseUrl.href}/${uri}`);
                }
              }
            } else {
              myurl = url.parse(uri);
            }
          }

          if (options) {
            myoptions = nodefony.extend(true, myoptions, options);
          }
          myoptions.url = myurl;
          break;
        case type === "object":
          myoptions = nodefony.extend(true, myoptions, uri);
          break;
        default:
          throw new nodefony.requestError("http request Bad argument type", null, container);
        }
        this.logger(`${JSON.stringify(myoptions, null," ")}`, "DEBUG");
        req = request(myoptions, (error, response, body) => {
          if (error) {
            return reject(new nodefony.requestError(error, response, container));
          }
          let json = response.toJSON();
          if (json) {
            this.logger(`${json.request.method} ${json.request.uri.href}`, "INFO");
            this.logger(`${JSON.stringify(json, null," ")}`, "DEBUG");
          }
          return resolve({
            response: response,
            body: body,
            json: json
          });
        });
        return req;
      } catch (e) {
        return reject(new nodefony.requestError(e, null, container));
      }
    });
  }

  get(url, options = {}) {
    options.method = "GET";
    return this.http(url, options);
  }

  post(url, options) {
    options.method = "POST";
    return this.http(url, options);
  }

}

module.exports = class requestClient extends nodefony.Service {

  constructor(container) {
    super("requestClient", container);
    this.request = this.create(this);
  }

  create(baseUrl, options) {
    return new Request(baseUrl, options, this);
  }

  http(url, options, container) {
    return this.request.http(url, options, container);
  }


};
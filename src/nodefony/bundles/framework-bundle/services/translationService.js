let translate = {};
let langs = [];
const reg = /^(..){1}_?(..)?$/;

/*
 *
 *
 *	PULGIN READER
 *
 *
 */
const pluginReader = function () {
  // TODO
  let getObjectTransXML = function () {};
  let getObjectTransJSON = function (file, bundle, callback, parser) {
    if (parser) {
      file = this.render(file, parser.data, parser.options);
    }
    if (callback) {
      callback(JSON.parse(file));
    }
  };
  let getObjectTransYml = function (file, bundle, callback, parser) {
    if (parser) {
      file = this.render(file, parser.data, parser.options);
    }
    if (callback) {
      callback(yaml.load(file));
    }
  };
  return {
    xml: getObjectTransXML,
    json: getObjectTransJSON,
    yml: getObjectTransYml,
    xliff: null
  };
}();

const reader = function (service) {
  let func = service.get("reader").loadPlugin("translating", pluginReader);
  return function (result, bundle, locale, domain) {
    return func(result, bundle, service.nodeReader.bind(service, locale, domain));
  };
};

const Translation = class Translation extends nodefony.Service {

  constructor(context, service) {
    super("transaltion", context.container, context.notificationsCenter);
    this.context = context;
    this.service = service;
    this.setParameters("translate", translate);
    this.defaultDomain = service.defaultDomain;
    this.defaultLocale = service.defaultLocale;
    this.langs = langs;
  }

  trans(value, domain = null, local = null) {
    let str = null;
    let mylocal = null;
    let myDomain = null;
    try {
      myDomain = this.getTransDefaultDomain(domain);
      if (domain && nodefony.typeOf(domain) === "array" && domain.length) {
        if (domain[0]) {
          myDomain = domain[0];
        }
        if (domain[1]) {
          local = domain[1];
        }
      } else {
        if (domain) {
          myDomain = domain;
        }
      }
      mylocal = this.setLocal(local);
      str = this.getParameters("translate." + mylocal + "." + myDomain + "." + value) || value;
    } catch (e) {
      this.logger(e, "ERROR");
      return value;
    }
    return str;
  }

  getLangs() {
    return this.langs;
  }

  getLocale() {
    return this.defaultLocale;
  }

  setLocal(Lang) {
    if (!Lang) {
      return this.defaultLocale;
    }
    let res = reg.exec(Lang || this.defaultLocale);
    if (res) {
      if (res[2]) {
        return res[0];
      } else {
        return res[1] + "_" + res[1];
      }
    }
    return this.defaultLocale;
  }

  trans_default_domain(domain) {
    this.defaultDomain = domain;
  }

  getTransDefaultDomain() {
    return this.defaultDomain;
  }

  getLang() {
    let Lang = null;
    let query = this.context.request.query;
    if (!this.context.session) {
      if (query) {
        Lang = query.lang;
        if (Lang) {
          this.defaultLocale = Lang;
        }
      }
    } else {
      if (query) {
        let queryGetlang = query.lang;
        if (this.context.user) {
          if (queryGetlang) {
            Lang = queryGetlang;
          } else {
            Lang = this.context.session.get("lang") || this.context.user.lang;
          }
        } else {
          Lang = queryGetlang || this.context.session.get("lang");
        }
      }
    }
    this.defaultLocale = this.setLocal(Lang);

    if (this.context.session) {
      this.context.session.set("lang", this.defaultLocale);
    }
    if (!this.service.getParameters("translate." + this.defaultLocale)) {
      this.service.getFileLocale(this.defaultLocale);
    } else {
      if (!this.service.getParameters("translate." + this.defaultLocale + "." + this.defaultDomain)) {
        this.service.getFileLocale(this.defaultLocale);
      }
    }
    return this.defaultLocale;
  }
  handle() {
    this.service.engineTemplate.extendFilter("trans", this.trans.bind(this));
    return this.getLang();
  }
};

module.exports = class translation extends nodefony.Service {

  constructor(container) {
    super("I18N", container, container.get("notificationsCenter"));
    this.defaultLocale = this.getParameters("kernel.system.locale");
    this.engineTemplate = this.get("templating");
    this.setParameters("translate", translate);
    this.defaultDomain = "messages";
    this.reader = reader(this);
  }

  boot() {
    this.listen(this, "onBoot", () => {
      let dl = this.getParameters("bundles.app").App.locale;
      if (dl) {
        this.defaultLocale = dl;
      }
      this.getFileLocale(dl);
      this.logger("default Local APPLICATION ==> " + this.defaultLocale, "DEBUG");

      this.engineTemplate.extendFunction("getLangs", this.getLangs.bind(this));
      this.getConfigLangs(this.getParameters("bundles.app.lang"));
    });
    translate[this.defaultLocale] = {};
  }

  getConfigLangs(config) {
    for (let ele in config) {
      langs.push({
        name: config[ele],
        value: ele
      });
    }
    return langs;
  }
  getLangs() {
    return this.langs;
  }

  nodeReader(locale, domain, value) {
    if (locale) {
      if (!translate[locale]) {
        translate[locale] = {}; //nodefony.extend(true, {}, translate[this.defaultLocale]);
      }
    }
    if (domain) {
      if (!translate[locale][domain]) {
        translate[locale][domain] = nodefony.extend(true, {}, translate[this.defaultLocale][domain]);
      }
      nodefony.extend(true, translate[locale][domain], value);
    } else {
      nodefony.extend(true, translate[locale], value);
    }
  }
  createTranslation(context) {
    return new Translation(context, this);
  }
  getFileLocale(locale) {
    for (let bundle in this.kernel.bundles) {
      this.kernel.bundles[bundle].registerI18n(locale);
    }
  }
  getLocale() {
    return this.defaultLocale;
  }
};
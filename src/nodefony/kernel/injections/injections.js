module.exports = nodefony.register("injection", function () {

  // plugin Reader
  const pluginReader = function () {
    const importXmlConfig = function (file, prefix, callback, parser) {
      if (parser) {
        file = this.render(file, parser.data, parser.options);
      }
      let services = [];
      let parameters;

      this.xmlParser.parseString(file, (err, node) => {
        //console.log(require('util').inspect(node, {depth: null}));
        //console.log('\n\n');
        if (err) {
          this.logger("INJECTION xmlParser.parseString : " + err, 'WARNING');
        }
        if (!node) {
          return node;
        }
        for (let key in node) {
          switch (key) {
          case 'parameters':
            parameters = this.xmlToJson.call(this, node[key][0].parameter);
            break;

          case 'services':
            services = this.xmlToJson.call(this, node[key][0].service);
            break;
          }
        }
        if (callback) {
          nomarlizeXmlJson.call(this, services, parameters, callback);
        }
      });
    };
    const nomarlizeXmlJson = function (services, parameters, callback) {
      for (let key in services) {
        for (let param in services[key]) {
          let values = null;
          switch (param) {
          case 'argument':
            values = [];
            for (let elm = 0; elm < services[key][param].length; elm++) {
              if (services[key][param][elm].type && services[key][param][elm].id) {
                if (services[key][param][elm].type == 'service') {
                  values.push('@' + services[key][param][elm].id);
                }
              }
            }
            services[key]['arguments'] = values;
            delete services[key][param];
            break;
          case 'property':
            values = {};
            for (let elm = 0; elm < services[key][param].length; elm++) {
              if (services[key][param][elm].type && services[key][param][elm].id && services[key][param][elm].name) {
                if (services[key][param][elm].type == 'service') {
                  values[services[key][param][elm].name] = '@' + services[key][param][elm].id;
                }
              }
            }
            services[key].properties = values;
            delete services[key][param];
            break;

          case 'call':
            values = [];
            for (let elm = 0; elm < services[key][param].length; elm++) {
              let tab = [];
              for (let sparam in services[key][param][elm]) {
                switch (sparam) {
                case 'method':
                  tab[0] = services[key][param][elm][sparam];
                  break;
                case 'argument':
                  let args = [];
                  for (let selem = 0; selem < services[key][param][elm][sparam].length; selem++) {
                    if (services[key][param][elm][sparam][selem].type && services[key][param][elm][sparam][selem].id) {
                      if (services[key][param][elm][sparam][selem].type == 'service') {
                        args.push('@' + services[key][param][elm][sparam][selem].id);
                      }
                    }
                  }
                  tab[1] = args;
                  break;
                }
              }
              values.push(tab);
            }
            services[key].calls = values;
            delete services[key][param];
            break;
          case 'scope':
            break;
          }
        }
      }
      if (callback) {
        renderParameters.call(this, callback, services, parameters);
      }
    };
    const renderParameters = function (callback, services, parameters) {
      if (parameters && Object.keys(parameters).length > 0 && typeof (services) === 'object' && Object.keys(services).length > 0) {
        services = JSON.parse(this.render(JSON.stringify(services), parameters));
      }
      callback(services);
    };
    const getServicesXML = function (file, bundle, parser, callback) {
      importXmlConfig.call(this, file, '', callback, parser);
    };
    const getServicesJSON = function (file, bundle, parser, callback) {
      if (parser) {
        file = this.render(file, parser.data, parser.options);
      }
      let json = JSON.parse(file);
      if (callback) {
        renderParameters.call(this, callback, json.services, json.parameters);
      }
    };
    const getServicesYML = function (file, bundle, parser, callback) {
      if (parser) {
        file = this.render(file, parser.data, parser.options);
      }
      let json = yaml.load(file);
      if (callback) {
        renderParameters.call(this, callback, json.services, json.parameters);
      }
    };
    const javascript = function (file, bundle, parser, callback) {
      try {
        callback(this.loader.load(file, true));
      } catch (e) {
        throw e;
      }
    };
    return {
      xml: getServicesXML,
      json: getServicesJSON,
      yml: getServicesYML,
      javascript: javascript
    };
  }();

  const regService = new RegExp("^(.+)Service$");
  const reg = /constructor\s*\((.*)\)/;
  /**
   * CLASS INJECTOR
   */
  const Injector = class Injector extends nodefony.Service {
    constructor(name, service, container) {
      super(name, container);
      this.services = nodefony.services;
      try {
        this.Class = this.getServiceClass(service);
        this.className = this.getServiceName(this.Class);
        this.classArgs = Injector.getArguments.call(this.Class);
        this.injections = this.findInjections(service.arguments);
        this.calls = this.getServiceCall(service);
        this.setParameters("services." + this.name, {
          class: this.Class,
          name: this.name,
          orderArguments: false,
          calls: service.calls
        });
      } catch (e) {
        this.logger(e, "ERROR");
        throw e;
      }
    }

    getServiceClass(service) {
      let Class = null;
      switch (nodefony.typeOf(service.class)) {
      case "array":
        Class = this.services[service.class[0]];
        break;
      case "function":
        Class = service.class;
        break;
      case "string":
        Class = this.services[service.class];
        break;
      default:
        throw new Error("Service Name " + this.className + " bad Class");
      }
      if (!Class) {
        throw new Error("Service Name " + this.className + " class not found");
      }
      return Class;
    }

    getServiceName(Class) {
      if (Class) {
        let res = regService.exec(Class.name);
        if (res) {
          return res[1];
        }
        return Class.name;
      }
    }

    getServiceCall(service) {
      let ele = null;
      if (service.calls) {
        ele = {};
        for (let i = 0; i < service.calls.length; i++) {
          let method = null;
          let args = null;
          switch (nodefony.typeOf(service.calls[i])) {
          case "array":
            method = service.calls[i][0];
            args = service.calls[i][1];
            break;
          case "object":
            method = service.calls[i].method;
            args = service.calls[i].arguments;
            break;
          default:
            this.logger(service.calls, 'ERROR');
            throw new Error("Service bad Calls config ");
          }
          ele[method] = this.findInjections(args);
        }
      }
      return ele;
    }

    startService() {
      try {
        let instance = this.reflect();
        this.set(this.name, instance);
        if (this.calls) {
          for (let call in this.calls) {
            if (instance[call]) {
              this.call(instance, instance[call], this.calls[call]);
            } else {
              this.logger('Method ' + call + ' in service ' + this.name + ' not found', "ERROR");
              continue;
            }
          }
        }
        instance.logger('STARTED ', 'DEBUG');
        return instance;
      } catch (e) {
        this.logger(e, "ERROR");
        throw e;
      }
    }

    static getArguments() {
      let str = this.toString();
      let m = str.match(reg);
      if (m) {
        // case class
        m = m[1].replace(/\s/g, '');
        return m.split(',');
      } else {
        // case function
        m = str.match(new RegExp(this.name + "\s*\((.*)\)"));
        if (m) {
          m = m[1].replace(/\s/g, '');
          return m.split(',');
        } else {
          throw new Error("Service :" + this.name + " constructor not find");
        }
      }
    }

    reflect() {
      try {
        return Reflect.construct(this.Class, this.injections);
      } catch (e) {
        console.log("ERRROR SERVICE CLASS " + this.name + " " + e.message, "ERROR");
        throw e;
      }
    }

    /*static reflectEs5(Class, args) {
      try {
        Array.prototype.unshift.call(args, Class);
        return new(Function.prototype.bind.apply(Class, args));
      } catch (e) {
        console.log("ERRROR SERVICE CLASS " + Class.name + " " + e.message, "ERROR");
        throw e;
      }
    }*/
    call(context, func, args) {
      try {
        func.apply(context, args);
      } catch (e) {
        throw e;
      }
    }

    findInjections(args) {
      let tab = [];
      if (args instanceof Array) {
        for (let elm = 0; elm < args.length; elm++) {
          switch (nodefony.typeOf(args[elm])) {
          case "string":
            let name = null;
            switch (args[elm][0]) {
            case '@':
              name = args[elm].substring(1);
              let service = this.get(name);
              if (service) {
                tab.push(service);
              } else {
                this.logger("Injection Service  : " + name + " not found !!", "ERROR");
              }
              break;
            default:
              tab.push(args[elm]);
            }
            break;
          default:
            tab.push(args[elm]);
          }
        }
      }
      return tab;
    }
  };

  /*
   *  CLASS INJECTION
   */
  const Injection = class Injection extends nodefony.Service {

    constructor(container) {

      super("injection", container, container.get("notificationsCenter"));

      this.reader = function (context) {
        const func = context.get("reader").loadPlugin("injection", pluginReader);
        return function (result, bundle, parser) {
          return func(result, bundle, parser, context.nodeReader.bind(context));
        };
      }(this);
    }

    nodeReader(jsonServices) {
      for (let lib in jsonServices) {
        if (jsonServices[lib].class) {
          try {
            let injector = this.setInjector(lib, jsonServices[lib]);
            injector.startService();
          } catch (e) {
            throw e;
          }
        }
      }
    }

    setInjector(name, service) {
      try {
        return new Injector(name, service, this.container);
      } catch (e) {
        throw e;
      }
    }

  };
  return Injection;
});

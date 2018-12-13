/**
 *   SERVIVE Mongoose
 */
const Mongoose = require('mongoose');
Mongoose.Promise = BlueBird;

const defaultconfigServer = {
  host: "localhost",
  port: 27017
};

const defaultConfigConnection = {
  //useMongoClient: true,
  reconnectTries: Number.MAX_VALUE,
  autoReconnect: true,
  socketTimeoutMS: 0,
  keepAlive: true,
  useNewUrlParser: true
};

module.exports = class mongoose extends nodefony.orm {

  constructor(container, kernel, autoLoader) {
    super("mongoose", container, kernel, autoLoader);
    this.engine = Mongoose;
    this.engine.set('useCreateIndex', true);
  }

  boot() {
    super.boot();
    this.kernel.listen(this, "onBoot", () => {
      this.settings = nodefony.extend({}, defaultconfigServer, this.bundle.settings.mongoose);
      if (this.settings.connectors && Object.keys(this.settings.connectors).length) {
        for (let name in this.settings.connectors) {
          this.createConnection(name, this.settings.connectors[name]);
        }
      } else {
        process.nextTick(() => {
          this.logger('onOrmReady', "DEBUG", "EVENTS MOOGODB");
          this.fire('onOrmReady', this);
          this.ready = true;
        });
      }
    });

    this.kernel.listen(this, "onReady", () => {
      this.displayTable("INFO");
    });
  }

  createConnection(name, config) {
    if (!name) {
      throw new Error("Mongodb createConnnetion no name connection");
    }
    let host = config.host || this.settings.host;
    let port = config.port || this.settings.port;
    let url = `mongodb://${host}:${port}/${config.dbname}`;

    let settings = nodefony.extend(true, {}, defaultConfigConnection, config.settings);
    settings.promiseLibrary = BlueBird;
    return this.engine.createConnection(url, settings)
      .then((db) => {
        this.connections[name] = db;
        db.on('close', () => {
          this.closeConnetion(name, db);
        });
        db.on('reconnect', () => {
          this.logger(`Reconnection to mongodb database ${name}`, 'INFO');
          this.fire('onReconnect', name, db);
          //this.createConnection(name, config);
          this.connections[name] = db;
        });
        db.on('timeout', () => {
          this.logger(`Timeout to mongodb database ${name}`, 'INFO');
          this.fire('onTimeout', name, db);
        });
        db.on('parseError', (error) => {
          this.logger(`ParseError on mongodb database ${name}`, 'ERROR');
          this.logger(error, 'ERROR');
        });
        db.on('error', (error) => {
          this.logger(`Error on mongodb database ${name}`, 'ERROR');
          this.logger(error, 'ERROR');
        });
        db.on('reconnectFailed', (error) => {
          this.logger(`Error on mongodb database reconnect Failed ${name}`, 'ERROR');
          this.logger(error, 'ERROR');
        });
        db.on('disconnected', () => {
          this.logger(`mongodb database disconnected ${name}`, 'WARNING');
        });
        this.fire("onConnect", name, db);
        //this.logger("Connect to " + name + " : " + url);
        return db;
      }).catch(error => {
        this.logger(`Cannot connect to mongodb ( ${host}:${port}/${config.dbname} )`, "ERROR");
        this.logger(error, "ERROR");
        /*if (this.timeoutid) {
          clearTimeout(this.timeoutid);
        }
        this.timeoutid = setTimeout(() => {
          this.timeoutid = null;
          //this.createConnection(name, config);
        }, settings.reconnectInterval * 1000);*/
      });
  }

  closeConnetion(name, connection) {
    if (!name) {
      throw new Error("Close connection no name connection !!");
    }
    this.fire('onClose', name, connection);
    this.logger(`Close connection to mongodb database ${name}`, 'WARNING');
    if (this.connections[name]) {
      delete this.connections[name];
    }
  }

  displayTable(severity = "DEBUG") {
    let options = {
      head: [
        `${this.name.toUpperCase()} CONNECTIONS NAME`,
        "NAME DATABASE",
        "DRIVER",
        "URI"
      ]
    };
    let table = this.kernel.cli.displayTable(null, options);
    //let tab = [];
    for (let dbname in this.settings.connectors) {
      let conn = ["", "", "mongodb", ""];
      conn[0] = dbname;
      for (let data in this.settings.connectors[dbname]) {
        switch (data) {
          case "dbname":
            conn[1] = this.settings.connectors[dbname][data];
            break;
          case "host":
            conn[3] = this.settings.connectors[dbname][data];
            break;
          case "port":
            conn[3] += ":" + this.settings.connectors[dbname][data];
            break;
        }

      }
      table.push(conn);
    }
    if (this.kernel && this.kernel.type === "CONSOLE") {
      severity = "DEBUG";
    }
    this.logger("ORM CONNECTORS LIST  : \n" + table.toString(), severity);
  }

};
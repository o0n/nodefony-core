const Sequelize = require("sequelize");
const Op = Sequelize.Op;

nodefony.register.call(nodefony.session.storage, "sequelize", function () {

  const finderGC = function (msMaxlifetime, contextSession) {
    let mydate = new Date(new Date() - msMaxlifetime);
    let query = {};
    query.attributes = ['context', 'updatedAt', 'session_id'];
    query.force = true;
    query.where = {
      context: contextSession,
      updatedAt: {
        //$lt: mydate
        [Op.lt]: mydate
      }
    };
    if (!this.entity) {
      return Promise.resolve(true);
    }
    return this.entity.destroy(query)
      .then((results) => {
        let severity = "DEBUG";
        if (results) {
          severity = "INFO";
        }
        this.manager.logger("Context : " + (contextSession || "default") + " GARBAGE COLLECTOR ==> " + results + "  DELETED", severity);
        return results;
      }).catch((error) => {
        throw error;
      });
  };

  const dbSessionStorage = class dbSessionStorage {

    constructor(manager) {
      this.manager = manager;
      this.orm = this.manager.get("sequelize");
      this.orm.on("onOrmReady", () =>{
        this.entity = this.orm.getEntity("session");
      });
      /*this.manager.kernel.once( "onReady", () => {
        this.entity = this.orm.getEntity("session");
      });*/
      this.gc_maxlifetime = this.manager.settings.gc_maxlifetime;
      this.contextSessions = [];
    }

    start(id, contextSession) {
      try {
        return this.read(id, contextSession);
      } catch (e) {
        throw e;
      }
    }

    open(contextSession) {
      if (this.orm.kernel.type !== "CONSOLE") {
        this.gc(this.gc_maxlifetime, contextSession);
        if (!this.entity) {
          return Promise.resolve(0);
        }
        return this.entity.count({
          where: {
            "context": contextSession
          }
        }).then((sessionCount) => {
          this.manager.logger("CONTEXT " + (contextSession ? contextSession : "default") + " SEQUELIZE SESSIONS STORAGE  ==>  " + this.manager.settings.handler.toUpperCase() + " COUNT SESSIONS : " + sessionCount, "INFO");
        });
      }
    }

    close() {
      this.gc(this.gc_maxlifetime);
      return true;
    }

    destroy(id, contextSession) {
      let where = {
        session_id: id
      };
      if (contextSession) {
        where.context = contextSession;
      }
      return this.entity.findOne({
          where: where
        })
        .then((result) => {
          if (result) {
            return result.destroy({
              force: true
            }).then((session) => {
              this.manager.logger("DB DESTROY SESSION context : " + session.context + " ID : " + session.session_id + " DELETED");
            }).catch((error) => {
              this.manager.logger("DB DESTROY SESSION context : " + contextSession + " ID : " + id, "ERROR");
              throw error;
            });
          }
        }).catch((error) => {
          throw error;
        });
    }

    gc(maxlifetime, contextSession) {
      let msMaxlifetime = ((maxlifetime || this.gc_maxlifetime) * 1000);
      if (contextSession) {
        finderGC.call(this, msMaxlifetime, contextSession);
      } else {
        if (this.contextSessions.length) {
          for (let i = 0; i < this.contextSessions.length; i++) {
            finderGC.call(this, msMaxlifetime, this.contextSessions[i]);
          }
        }
      }
    }

    read(id, contextSession) {
      let myWhere = null;
      if (contextSession) {
        myWhere = {
          where: {
            session_id: id,
            context: (contextSession)
          }
        };
      } else {
        myWhere = {
          where: {
            session_id: id
          }
        };
      }
      return this.entity.findOne(myWhere)
        .then((result) => {
          if (result) {
            return {
              id: result.session_id,
              flashBag: result.flashBag,
              metaBag: result.metaBag,
              Attributes: result.Attributes
            };
          } else {
            return {};
          }
        }).catch((error) => {
          this.manager.logger(error, "ERROR");
          throw error;
        });
    }

    write(id, serialize, contextSession) {

      let data = nodefony.extend({}, serialize, {
        session_id: id,
        context: contextSession || "default"
      });
      return this.entity.findOne({
        where: {
          session_id: id,
          context: (contextSession || "default")
        }
      }).then((result) => {
        if (result) {
          return result.update(data, {
            where: {
              session_id: id,
              context: (contextSession || "default")
            }
          }).then(function () {
            return serialize;
          }).catch(function (error) {
            throw error;
          });
        } else {
          return this.entity.create(data, {
              isNewRecord: true
            })
            .then((session) => {
              this.manager.logger("ADD SESSION : " + session.session_id + (session.username ? " username :" + session.username : ""), "DEBUG");
              return session;
            }).catch((error) => {
              throw error;
            });
        }
      }).catch((error) => {
        if (error) {
          throw error;
        }
      });
    }
  };
  return dbSessionStorage;
});

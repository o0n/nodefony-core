let builderInstall = null;
let builderGenerater = null;
let builderTools = null;
let builderPM2 = null;
try {
  builderInstall = require(path.resolve(__dirname, "install", "install.js"));
  builderGenerater = require(path.resolve(__dirname, "generate", "generate.es6"));
  builderTools = require(path.resolve(__dirname, "tools", "tools.es6"));
  builderPM2 = require(path.resolve(__dirname, "tools", "pm2.es6"));
} catch (e) {
  throw e;
}

module.exports = class cliStart extends nodefony.cliKernel {

  constructor() {
    super("nodefony", null, null, {
      asciify: false,
      autostart: false,
      signals: true,
      clean: true,
      promiseRejection: true,
      version: nodefony.version,
      events:{
        nbListeners: 60,
        captureRejections:true
      }
    });
    this.choices = [];
    this.cmd = null;
    this.args = [];
    this.promise = null;
    this.started = false;
    this.reloadMenu = false;
    this.keepAlive = false;
    this.commander.usage(`[options] <command:task:action> [args...]
                  [options] <command:action> [args...]
                  [options] <action> [args...]`);
    // EVENTS ACTION
    this.commander.arguments(`<cmd> [args...]`)
      .action((cmd, args, commander) => {
        //this.logger(`Commnand : ${cmd} Arguments : ${args}`, "DEBUG", "CLI EVENT ACTION");
        //this.cmd = cmd ? cmd.toLowerCase() : null;
        this.cmd = cmd;
        this.rawCommand = cmd;
        this.args = args;
        return commander;
      });
    // INIT
    this.initialize();
  }

  async setCommand(cmd, args = []) {
    //this.logger(`Commnand : ${cmd} Arguments : ${args}`, "DEBUG", "COMMAND");
    this.clearCommand();
    if (cmd) {
      process.argv.push(cmd);
    }
    await this.parseCommand(process.argv.concat(args));
    return await this.onStart(this.cmd, this.args);
  }

  onStart(cmd = this.cmd, args = this.args) {
    //this.logger(`Commnand : ${cmd} Arguments : ${args}`, "DEBUG", "CLI ONSTART");
    this.interactive = this.commander.interactive || false;
    if (!cmd && !process.argv.slice(2).length && (!process.argv[2])) {
      this.buildMenu();
      this.interactive = true;
      return this.showMenu()
        .catch((e) => {
          if (!this.keepAlive) {
            if (this.reloadMenu) {
              return this.showMenu(true, this.reloadMenu);
            }
            if (e) {
              this.logger(e, "ERROR");
              return this.terminate(e.code || 1);
            }
            return this.terminate(1);
          }
        });
    }
    if (!cmd && this.interactive) {
      this.buildMenu();
      return this.showMenu()
        .catch((e) => {
          if (!this.keepAlive) {
            if (this.reloadMenu) {
              return this.showMenu(true, this.reloadMenu);
            }
            if (e) {
              this.logger(e, "ERROR");
              return this.terminate(e.code || 1);
            }
            return this.terminate(1);
          }
        });
    }
    return this.start(cmd, args)
      .then((result) => {
        if (!this.keepAlive) {
          if (this.reloadMenu) {
            return this.showMenu(true, this.reloadMenu);
          }
          if (typeof result === "number") {
            return this.terminate(result);
          }
          return this.terminate(0);
        }
        return result;
      })
      .catch((e) => {
        if (!this.keepAlive) {
          if (this.reloadMenu) {
            return this.showMenu(true, this.reloadMenu);
          }
          if (e) {
            this.logger(e, "ERROR");
            return this.terminate(e.code || 1);
          }
          return this.terminate(1);
        }
      });
  }

  async initialize() {
    this.initHelp();
    this.initOptions();
    await this.parseCommand(process.argv);
    let res = null;
    if (res = process.argv.slice(2).length && process.argv[2]) {
      // event action not fire when help command
      if (res === "--help" || res === "-h") {
        return await this.onStart("help");
      }
    }
    return await this.onStart();
  }

  /*async onCommand(cmd = this.cmd, args = this.args) {
    //this.cmd = cmd ? cmd.toLowerCase() : null;
    //this.args = args;
    this.parseNodefonyCommand();
    return await this.onStart(cmd, args);
  }*/

  clearCommand() {
    this.cmd = null;
    this.args.length = 0;
    this.clearNodefonyCommand();
    while (process.argv.length > 2) {
      process.argv.pop();
    }
  }

  initHelp() {
    this.commander.on('--help', () => {
      if (!nodefony.isTrunk) {
        this.setTitleHelp(this.clc.cyan("nodefony"));
        this.setHelp("", "create [-i] name [path]", "Create New Nodefony Project");
        this.setTitleHelp(this.clc.cyan("PM2 Process Manager 2"));
        this.setHelp("", "stop name", "Stop Production Project");
        this.setHelp("", "reload name", "Reload Production Project");
        this.setHelp("", "delete name", "Delete Production Project from PM2 management");
        this.setHelp("", "restart name", "Restart Production Project");
        this.setHelp("", "list", "List all Production Projects ");
        this.setHelp("", "logs [name] [nblines]", "Stream pm2 logs  [name] is project name  and [nblines] to show ");
        this.setHelp("", "kill", "Kill PM2 daemon ");
      }
    });
  }

  initOptions() {
    this.setOption('-d, --debug ', 'Nodefony debug');
    this.setOption('-h, --help ', 'Nodefony help');
    this.setOption('-v, --version ', 'Nodefony version');
    this.setOption('-f, --force ', 'Force disable interactive mode');
    this.setOption('-i, --interactive ', 'Nodefony cli Interactive Mode');
    this.setOption('-j, --json', 'Nodefony json response');
  }

  showBanner(data) {
    super.showBanner(data);
    if (nodefony.projectName !== "nodefony") {
      this.logger(`WELCOME PROJECT : ${nodefony.projectName} ${nodefony.projectVersion}`);
    } else {
      this.logger(`WELCOME NODEFONY CLI ${nodefony.version}`);
    }
  }

  reloadPromt(clear) {
    if (clear) {
      this.clear();
    }
    this.reloadMenu = true;
    //this.clearCommand();
    return Promise.resolve();
  }

  showMenu(noAscii = false, reload = false) {
    if (!noAscii) {
      return this.showAsciify("NODEFONY")
        .then((data) => {
          this.showBanner(data);
          return this.runMenu(reload);
        })
        .catch((e) => {
          throw e;
        });
    }
    return this.runMenu(reload);
  }

  async start(command, args) {
    //this.logger(`Commnand : ${command} Arguments : ${args}`, "DEBUG", "CLI START");
    this.started = true;
    switch (command) {
      case "showmenu":
        return this.reloadPromt();
      case "create":
        try {
          return this.createProject(command, args, this.interactive);
        } catch (e) {
          throw e;
        }
        break;
      case "rebuild":
        try {
          if (nodefony.isTrunk) {
            return this.rebuild()
              .then((cwd) => {
                this.parseNodefonyCommand("nodefony:rebuild", [cwd]);
                return nodefony.start(command, args, this);
              })
              .then(() => {
                return this.installProject()
                  .then(() => {
                    return this.buildProject()
                      .then((cwd) => {
                        this.parseNodefonyCommand("nodefony:build", [cwd]);
                        return nodefony.start(command, args, this);
                      });
                  });
              });
          }
          this.showHelp();
          this.logger("No nodefony trunk detected !", "WARNING");
          break;
        } catch (e) {
          throw e;
        }
        break;
      case "build":
        try {
          if (nodefony.isTrunk) {
            return this.installProject()
              .then(() => {
                return this.buildProject()
                  .then((cwd) => {
                    this.parseNodefonyCommand("nodefony:build", [cwd]);
                    return nodefony.start(command, args, this);
                  });
              });
          }
          this.showHelp();
          this.logger("No nodefony trunk detected !", "WARNING");
          break;
        } catch (e) {
          throw e;
        }
        break;
      case "install":
        if (nodefony.isTrunk) {
          return this.installProject()
            .then((...args) => {
              return nodefony.start(command, args, this)
                .then((...args) => {
                  return args;
                })
                .catch((e) => {
                  throw e;
                });
            });
        }
        this.showHelp();
        this.logger("No nodefony trunk detected !", "WARNING");
        break;
      case "version":
        try {
          return process.stdout.write(nodefony.version);
        } catch (e) {
          throw e;
        }
        break;
      case "help":
        if (!nodefony.isTrunk) {
          return this.showHelp();
        } else {
          return await nodefony.start(command, args, this)
            .then(() => {
              return this.showHelp();
            })
            .catch(() => {
              return this.showHelp();
            });
        }
        break;
      case "certificates":
        return this.generateCertificates();
      default:
        this.parseNodefonyCommand(command, args);
        if (nodefony.isTrunk) {
          try {
            if (this.kernel) {
              return this.matchCommand();
            }
            return await nodefony.start(command, args, this);
          } catch (e) {
            try {
              if (this.rawCommand) {
                //return require(path.resolve(this.rawCommand));
              } else {
                //this.showHelp();
              }
              throw e;
            } catch (e) {
              //this.showHelp();
              //this.logger(`Command Not Found  ${this.cmd} ${this.args}`, "ERROR");
              //this.logger(e, "ERROR", "MODULE");
              //this.terminate(1);
              throw e;
            }
          }
        } else {
          try {
            return await nodefony.start(this.rawCommand, args, this);
          } catch (e) {
            try {
              if (this.rawCommand) {
                //return require(path.resolve(this.rawCommand));
              } else {
                //return this.showHelp();
              }
              throw e;
            } catch (e) {
              //this.showHelp();
              //this.logger(`Command Not Found  ${this.cmd} ${this.args}`, "ERROR");
              //this.logger(e, "ERROR", "MODULE");
              //this.terminate(1);
              throw e;
            }
          }
        }
    }
  }

  buildMenu() {
    this.generateString = `Generater`;
    this.startString = "Start Servers";
    if (nodefony.isTrunk) {
      if (nodefony.builded) {
        this.choices.push(`${this.startString} Development`);
        this.choices.push(`${this.startString} Pre-Production`);
        this.choices.push(`${this.startString} Production`);
        this.choices.push(`Install Project`);
        this.choices.push(`Rebuild Project`);
        this.choices.push(`${this.generateString}`);
        this.choices.push(`Tools`);
        this.choices.push(`PM2 Tools`);
        this.choices.push(`Run Test`);
      } else {
        this.choices.push(`Build Project`);
        this.choices.push(`${this.generateString}`);
        this.choices.push(`Tools`);
        this.choices.push(`PM2 Tools`);
      }
    } else {
      this.choices.push(`Create Nodefony Project`);
      this.choices.push(`PM2 Tools`);
    }
    this.choices.push(this.getSeparator());
    this.choices.push("Help");
    this.choices.push("Quit");
  }

  interaction(choices) {
    return this.prompt([{
        type: 'list',
        name: 'command',
        message: ' Nodefony CLI : ',
        default: 0, //(choices.length - 1),
        pageSize: choices.length,
        choices: choices,
        filter: (val) => {
          switch (val) {
            case "Quit":
              return "exit";
            case "Help":
              return "help";
            case `${this.startString} Development`:
              return "development";
            case `${this.startString} Production`:
              return "production";
            case `${this.startString} Pre-Production`:
              return "pre-production";
            case `Create Nodefony Project`:
              return "project";
            case `${this.generateString}`:
              return "generate";
            case `Run Test`:
              return "test";
            case `Install`:
            case `Install Framework`:
            case `Install Project`:
              return "install";
            case `Build`:
            case `Build Project`:
              return "build";
            case `Rebuild Project`:
              return "rebuild";
            case `PM2 Tools`:
              return "pm2";
            case `Tools`:
              return "tools";
            default:
              console.log("\n");
              this.logger(`command not found : ${val}`, "INFO");
              this.terminate(1);
          }
        }
      }])
      .then((response) => {
        return nodefony.extend(this.response, response);
      });
  }

  runMenu(reload = false) {
    return this.interaction(this.choices)
      .then(() => {
        this.reloadMenu = reload || this.reloadMenu;
        switch (this.response.command) {
          case "project":
            return this.createProject(null, null, true);
          case "rebuild":
            return this.setCommand("rebuild");
          case "build":
            return this.setCommand("build");
          case "install":
            return this.setCommand("install");
          case "generate":
            return this.generateCli(true);
          case "pm2":
            return this.pm2Cli(true);
          case "tools":
            return this.toolsCli(true);
          case "development":
            return this.setCommand("development");
          case "production":
            return this.setCommand("production");
          case "pre-production":
            return this.setCommand("preprod");
          case "test":
            return this.setCommand("unitest:launch:all");
          case "exit":
            this.logger("QUIT");
            return this.terminate(0);
          default:
            return this.setCommand("help");
            //return this.setCommand(null, ["-h"]);
        }
      })
      .catch((e) => {
        throw e;
      });
  }

  gitInit(project, response) {
    let gitP, cwd, git;
    try {
      cwd = path.resolve(project.location, project.name);
      gitP = require('simple-git/promise');
      git = gitP(cwd);
    } catch (e) {
      throw e;
    }
    return git.init()
      .then(() => {
        return git.add(path.resolve(cwd, '*'))
          .then(() => {
            return git.addConfig('user.name', response.authorFullName)
              .then(() => {
                return git.addConfig('user.email', response.authorMail)
                  .then(() => {
                    return git.commit("first commit!");
                  });
              });
          });
      });
  }

  createProject(command, args, interactive = false) {
    try {
      if (command === "create") {
        if (!args[0]) {
          args[0] = "nodefony-starter";
          //let error = new Error("Project name empty Unauthorised Please enter a valid project name ");
          //this.logger(error, "ERROR");
          //this.terminate(1);
        }
      }
      let project = new nodefony.builders.project(this, command, args);
      return project.run(interactive)
        .then((obj) => {
          return this.gitInit(project, obj.response)
            .then(() => {
              let cwd = path.resolve(project.location, project.name);
              this.logger(`Create Project ${obj.response.name} complete`, "INFO");
              this.cd(cwd);
              return this.installProject(cwd)
                .then(() => {
                  return this.buildProject(cwd)
                    .then((cwd) => {
                      try {
                        nodefony.checkTrunk(cwd);
                        this.parseNodefonyCommand("nodefony:build", [cwd]);
                        return nodefony.start(command, args, this);
                      } catch (e) {
                        throw e;
                      }
                    }).catch((e) => {
                      this.logger(e, "ERROR");
                      throw e;
                    });
                }).catch((e) => {
                  this.logger(e, "ERROR");
                  throw e;
                });
            }).catch((e) => {
              if (e.code || e.code === 0) {
                this.logger(e, "INFO");
                this.terminate(e.code);
              }
              this.logger(e, "ERROR");
              this.terminate(e.code || 1);
            });
        })
        .catch((e) => {
          throw e;
        });
    } catch (e) {
      throw e;
    }
  }

  installProject(cwd = path.resolve(".")) {
    try {
      let installer = new builderInstall(this);
      return installer.install(cwd)
        .then((ret) => {
          this.logger("Install Complete");
          return ret;
        }).catch((e) => {
          this.logger(e, "ERROR");
          throw e;
        });
    } catch (e) {
      this.logger(e, "ERROR");
      throw e;
    }
  }

  rebuild(cwd = path.resolve(".")) {
    try {
      let installer = new builderInstall(this);
      return installer.rebuild(cwd)
        .then((ret) => {
          this.logger(`Rebuild Complete : ${cwd}`);
          return ret;
        }).catch((e) => {
          this.logger(e, "ERROR");
          throw e;
        });
    } catch (e) {
      this.logger(e, "ERROR");
      throw e;
    }
  }

  buildProject(cwd = path.resolve(".")) {
    try {
      let installer = new builderInstall(this);
      return installer.build(cwd)
        .then((ret) => {
          this.logger("Build Complete");
          return ret;
        }).catch((e) => {
          this.logger(e, "ERROR");
          throw e;
        });
    } catch (e) {
      this.logger(e, "ERROR");
      throw e;
    }
  }

  generateCli(interactive) {
    let generater = new builderGenerater(this);
    return generater.run(interactive);
  }

  toolsCli(interactive) {
    let generater = new builderTools(this);
    return generater.run(interactive);
  }

  pm2Cli(interactive) {
    let generater = new builderPM2(this);
    return generater.run(interactive);
  }

  generateCertificates(cwd = path.resolve(".")) {
    try {
      let installer = new builderInstall(this);
      return installer.generateCertificates(cwd)
        .then(() => {
          let directory = path.resolve(cwd, "config", "certificates");
          let config = path.resolve(cwd, "config", "openssl");
          this.logger(`Certificates build with config : ${config}`);
          let res = this.ls(directory);
          this.logger(`See Generated Certificates in directory : ${directory} \n${res.stdout}`);
          this.logger("Generate Certificates Complete");
          return cwd;
        }).catch((e) => {
          this.logger(e, "ERROR");
          throw e;
        });
    } catch (e) {
      this.logger(e, "ERROR");
      throw e;
    }
  }

};

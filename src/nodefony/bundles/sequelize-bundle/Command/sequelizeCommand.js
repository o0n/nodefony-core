const syncTask = require(path.resolve(__dirname, "syncTask.js"));
const queryTask = require(path.resolve(__dirname, "queryTask.js"));
const entityTask = require(path.resolve(__dirname, "entityTask.js"));
const generateTask = require(path.resolve(__dirname, "generateTask.js"));
const createTask = require(path.resolve(__dirname, "createTask.js"));

class sequelizeCommand extends nodefony.Command {
  constructor(cli, bundle) {
    super("sequelize", cli, bundle);
    this.setTask("create", createTask);
    this.setTask("sync", syncTask);
    this.setTask("query", queryTask);
    this.setTask("entity", entityTask);
    this.setTask("generate", generateTask);
  }
}
module.exports = sequelizeCommand;

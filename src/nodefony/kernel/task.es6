module.exports = nodefony.register("Task", () => {

  /**
   *
   * command:task:action
   */
  class Task extends nodefony.Service {
    constructor(name, command) {
      super(name, command.container, command.notificationsCenter);
      this.command = command;
      this.cli = this.command.cli;
      this.json = this.command.json;
      this.interactive = this.command.interactive;
    }

    showBanner() {
      return this.cli.asciify(`      ${this.command.name} ${this.name}`)
        .then((data) => {
          if (this.json) {
            return data;
          }
          this.cli.clear();
          let color = this.cli.clc.blueBright.bold;
          console.log(color(data));
          this.cli.blankLine();
          return data;
        })
        .catch((e) => {
          return e;
        });
    }

    run(args) {
      if (this.interactive) {
        return this.interaction(args)
          .then((response) => {
            return this.generate(args, response);
          });
      } else {
        return this.generate(args, null);
      }
    }

    generate() {
      return Promise.reject(new Error(`Task Class : ${this.name} error has not generate method `));
    }

    interaction() {
      return Promise.reject(new Error(`Task Class : ${this.name} has not interaction method no interactive mode`));
    }

    logger(pci, severity, msgid, msg) {
      try {
        if (!msgid) {
          msgid = `COMMAND ${this.command.name} TASK ${this.name}`;
        }
        return super.logger(pci, severity, msgid, msg);
      } catch (e) {
        console.log(e, "\n", pci);
      }
    }

    showHelp(help = "") {
      return help;
    }

    setHelp(command, description) {
      this.cli.displayTable([
        ["", this.cli.clc.green(command), description]
      ], this.command.optionsTables);
    }

    terminate(code) {
      return this.cli.terminate(code);
    }

  }

  return Task;
});
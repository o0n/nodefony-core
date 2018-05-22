module.exports = nodefony.registerCommand("decoders", function () {

  const decoders = class decoders extends nodefony.cliKernel {

    constructor(container, command, options) {

      super("decoders", container, container.get("notificationsCenter"), options);

      let cmd = command[0].split(":");
      let args = command[1];
      switch (cmd[1]) {
      case "bcrypt":
        if (args[0] && args[1]) {
          let bcrypt = new nodefony.encoders.bcrypt({
            saltRounds: args[2] || null
          });
          let res = bcrypt.isPasswordValid(args[0], args[1]);
          this.logger(`Is passport valid  : ${res}`);
        } else {
          throw new Error("no passwordField ");
        }
        break;
      default:
        throw new Error(`decoder : ${cmd[1]} not defined`);
      }
      this.terminate(0);
    }
  };

  return {
    name: "decoders",
    commands: {
      dencodeBcrypt: ["decoders:bcrypt password 'encoded'", "Decoded password Bcrypt Example : dencoders:Bcrypt test '$2b$10$8du22L5ki0XMH.r.FHK'"],
    },
    cli: decoders
  };
});
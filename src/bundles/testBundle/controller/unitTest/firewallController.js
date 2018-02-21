module.exports = class firewallController extends nodefony.controller {

  constructor(container, context) {
    super(container, context);
    this.firewall = this.get("security");
  }

  localAction() {
    return this.renderJson(this.context.security.name);
  }

  digestAction() {
    return this.renderJson(this.context.security.cors.headers);
  }

  basicAction() {
    return this.renderJson(this.context.security.cors.headers);
  }

};
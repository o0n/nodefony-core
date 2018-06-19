module.exports = class installProject extends nodefony.Builder {

  constructor(cli) {
    super(cli);
  }

  install() {
    return new Promise((resolve, reject) => {
      try {
        this.installFramework();
        return this.cli.npmInstall()
          .then(() => {
            return resolve(this.generateCertificates());
          }).catch((e) => {
            this.logger(e, "ERROR");
          });
      } catch (e) {
        return reject(e);
      }
    });
  }

  generateCertificates() {
    return new Promise((resolve, reject) => {
      let cmd = null;
      try {
        cmd = this.cli.spawnSync(path.resolve("bin", "generateCertificates.sh"), {}, {
          cwd: path.resolve("bin")
        });
        return resolve(cmd.status);
      } catch (e) {
        console.log(e);
        return reject(e);
      }
    });
  }

  installFramework() {
    try {
      let tmp = path.resolve("tmp");
      this.checkDirectoryExist(tmp);
      let upload = path.resolve("tmp", "upload");
      this.checkDirectoryExist(upload);
      let bin = path.resolve("bin");
      this.checkDirectoryExist(bin);
      let databases = path.resolve("app", "Resources", "databases");
      this.checkDirectoryExist(databases);
      let web = path.resolve("web");
      this.checkDirectoryExist(web);
      let js = path.resolve("web", "js");
      this.checkDirectoryExist(js);
      let css = path.resolve("web", "css");
      this.checkDirectoryExist(css);
      let images = path.resolve("web", "images");
      this.checkDirectoryExist(images);
      let fonts = path.resolve("web", "fonts");
      this.checkDirectoryExist(fonts);
      let assets = path.resolve("web", "assets");
      this.checkDirectoryExist(assets);
      js = path.resolve("web", "assets", "js");
      this.checkDirectoryExist(js);
      css = path.resolve("web", "assets", "css");
      this.checkDirectoryExist(css);
      images = path.resolve("web", "assets", "images");
      this.checkDirectoryExist(images);
      fonts = path.resolve("web", "assets", "fonts");
      this.checkDirectoryExist(fonts);
    } catch (e) {
      throw e;
    }

  }

  checkDirectoryExist(directory) {
    if (!this.cli.exists(directory)) {
      try {
        this.cli.mkdir(directory);
        this.logger(`Create directory ${directory}`);
      } catch (e) {
        throw e;
      }
    }
  }

  removeFile(directory, recurse) {
    if (this.cli.exists(directory)) {
      try {
        if (recurse) {
          this.cli.rm("-rf", directory);
        } else {
          this.cli.rm("-f", directory);
        }
        this.logger(`Remove directory ${directory}`);
      } catch (e) {
        throw e;
      }
    }
  }

  clear() {
    try {
      let web = path.resolve("web");
      this.removeFile(web, true);
      let modules = path.resolve("node_modules");
      this.removeFile(modules, true);
      let tmp = path.resolve("tmp");
      this.removeFile(tmp, true);
      let npmLock = path.resolve("package-lock.json");
      this.removeFile(npmLock);
      let yarnLock = path.resolve("yarn.lock");
      this.removeFile(yarnLock);
      this.installFramework();
    } catch (e) {
      throw e;
    }
  }

};
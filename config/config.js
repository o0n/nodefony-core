/**
 *  NODEFONY FRAMEWORK
 *
 *       KERNEL CONFIG
 *
 *   Domain listen : Nodefony can listen only one domain ( no vhost )
 *     Example :
 *      domain :  0.0.0.0      // for all interfaces
 *      domain :  [::1]        // for IPV6 only
 *      domain :  192.168.1.1  // IPV4
 *      domain :  mydomain.com // DNS
 *
 *   Domain Alias : string only "<<regexp>>" use domainCheck : true
 *     Example :
 *      domainAlias:[
 *        "^127.0.0.1$",
 *        "^localhost$",
 *        ".*\\.nodefony\\.com",
 *        "^nodefony\\.eu$",
 *        "^.*\\.nodefony\\.eu$"
 *      ]
 */
const path = require("path");

module.exports = {
  system: {
    domain: "0.0.0.0",
    domainAlias: [
      "^127.0.0.1$",
      "^localhost$"
    ],
    httpPort: 5151,
    httpsPort: 5152,
    domainCheck: false,
    locale: "en_en",
    /**
     * BUNDLES CORE
     */
    security: true,
    realtime: true,
    monitoring: true,
    mail: true,
    documentation: true,
    unitTest: true,
    redis: false,
    mongo: false,
    elastic: false,
    /**
     * SERVERS
     */
    servers: {
      statics: true,
      protocol: "1.1", //  2.0 || 1.1
      http: true,
      https: true,
      ws: true,
      wss: true,
      certificats: {
        key: path.resolve("config", "certificates", "server", "privkey.pem"),
        cert: path.resolve("config", "certificates", "server", "fullchain.pem"),
        ca: path.resolve("config", "certificates", "ca", "nodefony-root-ca.crt.pem"),
        options: {
          rejectUnauthorized: true
        }
      }
    },
    /**
     * DEV SERVER
     */
    devServer: {
      inline: true,
      hot: false,
      hotOnly: false,
      overlay: true,
      logLevel: "info", // none, error, warning or info
      progress: false,
      protocol: "https",
      websocket: true
    },
    /**
     *  BUNDLES LOCAL REGISTRATION
     *
     *       bundles:{
     *         "hello-bundle" : "file:src/bundles/hello-bundle"
     *         "test-bundle"  : path.resolve("src", "bundles", "test-bundle")
     *       }
     */
    bundles: {
      "test-bundle": path.resolve("src", "bundles", "test-bundle"),
      "users-bundle": path.resolve("src", "nodefony", "cli", "builder", "bundles", "users-bundle"),
      "demo-bundle": "file:src/bundles/demo-bundle",
      //"monitor-bundle": "file:src/bundles/monitor-bundle",
      //"blackdashboardreact-bundle": "file:src/bundles/blackdashboardreact-bundle",
      //"blackdashboardvue-bundle": "file:src/bundles/blackdashboardvue-bundle"
    },
    /**
     * SYSLOG NODEFONY
     */
    log: {
      active: true
    }
  },
  /**
   *       ASSETS CDN
   *
   *       You set cdn with string
   *       CDN :    "cdn.nodefony.com",
   *       or
   *       CDN:
   *          global: "cdn.nodefony.com",
   *       or
   *       CDN:{
   *         stylesheet:[
   *           "cdn.nodefony.com"
   *         ],
   *         javascript:[
   *           "cdn.nodefony.com"
   *         ],
   *         image:[
   *           "cdn.nodefony.com",
   *           "cdn.nodefony.fr"
   *         ],
   *         font:[
   *           "cdn.nodefony.com"
   *         ]
   *      },
   */
  CDN: null,

  /**
   *  ENGINE TEMPLATE
   *
   *       TWIG
   *       https://github.com/justjohn/twig.js
   *
   */
  templating: "twig",

  /**
   * ENGINE ORM
   *       sequelize || mongoose
   *   orm : mongoose
   */
  orm: "sequelize",

  /**
   * NODE.JS PACKAGE MANAGER
   *
   *       npm
   *       yarn
   */
  packageManager: "yarn"

};
module.exports = {

  /**
   *    WATCHERS
   *
   *  watchers Listen to changes, deletion, renaming of files and directories
   *  of different components
   *
   *  For watch all components
   *      watch:                    true
   *  or
   *      watch:{
   *        controller:             true
   *        config:                 true        // only  routing and services
   *        views:                  true
   *        translations:           true
   *        webpack:                true
   *      }
   *
   */
  watch: false,

  headers: {
    http: {},
    https: {}
  },

  cors: {
    "allow-origin": "*",
    "Access-Control": {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "ETag, Authorization,  X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Expose-Headers": "WWW-Authenticate ,X-Json",
      "Access-Control-Max-Age": 10
    }
  },

  "passport-jwt": {
    refreshToken: true
  }


};

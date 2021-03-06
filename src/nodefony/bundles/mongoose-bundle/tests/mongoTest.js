/*
 *   MODEFONY FRAMEWORK UNIT TEST
 *
 *   MOCHA STYLE
 *
 *   In the global context you can find :
 *
 *	nodefony : namespace to get library
 *	kernel :   instance of kernel who launch the test
 *
 *
 *
 */
const assert = require('assert');
//const http = require("http");

describe("BUNDLE mongo", function () {

  describe('CORE', function () {

    beforeEach(function () {});

    before(function () {});

    // EXAMPLE  NODEFONY
    it("NAMESPACE LOADED", function (done) {
      // check nodefony namespace
      assert.equal(typeof nodefony, "object");
      // check instance kernel
      assert.equal(kernel instanceof nodefony.kernel, true);
      done();
    });
  });

});
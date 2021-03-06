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
const http = require("http");

describe("BUNDLE socketio", function(){

	describe('CORE', function(){

		beforeEach(function(){
		})

		before(function(){
		})

		// EXAMPLE  NODEFONY
		it("NAMESPACE LOADED", function(done){
			// check nodefony namespace
			assert.equal( typeof nodefony, "object" );
			// check instance kernel
			assert.equal( kernel instanceof nodefony.kernel, true)
			done();
		});
	});

	describe('ROUTE', () => {

		beforeEach( () => {
		});

		before( () =>{
		});

		it("ROUTE socketio ", (done) => {
			let options = {
				hostname: kernel.settings.system.domain,
				port: kernel.settings.system.httpPort,
				path: "/socketio",
				method: 'GET'
			};

			let request = http.request(options, (res) => {
				assert.equal(res.statusCode, 200);
				assert.equal(res.headers.server, "nodefony");
				res.setEncoding('utf8');
				res.on('data',  (chunk) => {
					// check result here
				});
        res.on('end', () => {
          done();
        });
			})
			request.end();
		});

	});
});

const assert = require('assert');

const request = require("request");
const http = require("http");

describe("NODEFONY BUNDLE ELASTICSEARCH", () => {

  describe('CONFIGURATIONS ', () => {

    /*it("KERNEL", function(done){
    	console.log( kernel.settings.system.version );
    	done();
    });*/

  });

  describe('Connection', () => {

    beforeEach(async () => {
      global.elastic = kernel.get("elastic");
      let conn = await global.elastic.getConnection("main");
      global.client = conn.client;

    });

    it("HEALF-SERVICE", async () => {
      let res = await global.client.cluster.health();
      assert.deepStrictEqual(res.statusCode, 200);
    });

    it("PING-SERVICE", async () => {
      let res = await global.client.ping();
      res = await global.client.info();
    });

  });


  describe('create Index', () => {
    /*beforeEach(async () => {
      const { Client } = require('@elastic/elasticsearch');
      global.client  = new Client({ node: 'http://localhost:9200' });
    });*/

    beforeEach(async () => {
      global.elastic = kernel.get("elastic");
      let conn = await global.elastic.getConnection("main");
      global.client = conn.client;

    });

    it("INDEX-CREATE", async () => {
      const { body } = await global.client.indices.exists({
        index:"game-of-thrones"
      });
      if ( ! body ){
        // Let's start by indexing some data
        await global.client.index({
          index: 'game-of-thrones',
          // type: '_doc', // uncomment this line if you are using {es} ≤ 6
          body: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
          }
        });

        await global.client.index({
          index: 'game-of-thrones',
          // type: '_doc', // uncomment this line if you are using {es} ≤ 6
          body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
          }
        });

        await global.client.index({
          index: 'game-of-thrones',
          // type: '_doc', // uncomment this line if you are using {es} ≤ 6
          body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs a whetstone.'
          }
        });
      }
      await global.client.indices.refresh({ index: 'game-of-thrones' });

    });

    it("INDEX-SARCH", async () => {
        // Let's search!
      const { body } = await global.client.search({
        index: 'game-of-thrones',
        // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
        body: {
          query: {
            match: { quote: 'winter' }
          }
        }
      });
      assert.deepStrictEqual(body.timed_out, false);
      assert.deepStrictEqual(body.hits.total.value, 1);
      assert.deepStrictEqual(body.hits.hits[0]._source.character, "Ned Stark");
      assert.deepStrictEqual(body.hits.hits[0]._source.quote, "Winter is coming.");
    });

  });


  describe('request index', () => {
    beforeEach(async () => {
      global.elastic = kernel.get("elastic");
      let conn = await global.elastic.getConnection("main");
      global.client = conn.client;

      global.options = {
        hostname: kernel.settings.system.domain,
        port: kernel.settings.system.httpPort,
        method: 'GET'
      };
    });

    it("INDEX-REQUEST", (done) => {
      global.options.path = '/test/elastic/index';
      var request = http.request(global.options, function (res) {
        assert.equal(res.statusCode, 200);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          const res = JSON.parse(chunk);
          assert.deepStrictEqual(res.body.found, true);
          assert.deepStrictEqual(res.body._id, "1");
          assert.deepStrictEqual(res.body._source.package.name, "nodefony-core");
          done();
        });
      });
      request.end();
    });

    it("INDEX-REQUEST", (done) => {
      global.options.path = '/test/elastic/index/2';
      var request = http.request(global.options, function (res) {
        assert.equal(res.statusCode, 200);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          const res = JSON.parse(chunk);
          assert.deepStrictEqual(res.body.found, true);
          assert.deepStrictEqual(res.body._id, "1");
          assert.deepStrictEqual(res.body._source.package.name, "nodefony-core");
          done();
        });
      });
      request.end();
    });

  });

});

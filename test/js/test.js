'use strict';

var chalk = require('chalk');
var shell = require('shelljs');
var Bluebird = require('bluebird');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var _ = require('lodash');
chai.should();
chai.use(chaiAsPromised);

chai.should();
shell.config.silent = true;

describe('SQLSN Run', function() {

  this.timeout(50000);

  beforeEach(function(){
    shell.pushd('test/sql');
  });

  var sqlplusOutputShouldMatch = function(output) {
    // 0. replace [ and ] in *.test.sql with "
    // 1. split output on \n into array and for each line
    // 2. split output on " into linePartsArray
    // 3. linePartsArray[1].should.be.equal(linePartsArray[3])
    _.forEach(output.split('\n'), function(line) {
      var linePartsArray = line.split('"');
      if (linePartsArray.length === 5) {
        linePartsArray[1].should.be.equal(linePartsArray[3]);
      }
    });
  };

  it('sqlsn-core should load sqlns-run module', function(done) {
    shell.exec('sql /nolog @run_module_should_load.test.sql', function(code, output) {
      code.should.be.equal(0);
      // run module
      output.should.match(/command run_script \[\.\.\/\.\.\/lib\/command\/run_script\.sql\] should be defined/g);
      output.should.match(/command run_dir_begin \[\.\.\/\.\.\/lib\/command\/run_dir_begin\.sql\] should be defined/g);
      output.should.match(/command run_dir \[\.\.\/\.\.\/lib\/command\/run_dir\.sql\] should be defined/g);
      output.should.match(/command run_dir_end \[\.\.\/\.\.\/lib\/command\/run_dir_end\.sql\] should be defined/g);
      // stack module
      output.should.match(/command stack_create \[\.\.\/\.\.\/oradb_modules\/sqlsn-stack\/lib\/command\/create\.sql\] should be defined/g);
      output.should.match(/command stack_push \[\.\.\/\.\.\/oradb_modules\/sqlsn-stack\/lib\/command\/push\.sql\] should be defined/g);
      output.should.match(/command stack_pop \[\.\.\/\.\.\/oradb_modules\/sqlsn-stack\/lib\/command\/pop\.sql\] should be defined/g);
      done();
    });
  });

  it('walk tree should work', function(done) {
    shell.exec('sql /nolog @walk_tree.test.sql', function(code, output) {
      code.should.be.equal(0);
      done();
    });
  });

});

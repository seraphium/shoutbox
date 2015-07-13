/**
 * Created by jackiezhang on 15/7/11.
 */
var should = require('should');

exports.testPony = function(test)
{
    //test.expect(2);
    //test.ok(true, "this should be passed");
    var xx = true;
    xx.should.equal(false);
    test.done();
}

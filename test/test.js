/* Test Generated via Boo. :-)*/

const expect = require('chai').expect;
describe('Test Suite', function( ) {
    it('Should do scenario', function( ) {
        browser.url('http://localhost:3000/');
        expect($('body h2').getHTML(false)).to.be.equal('What is this ');

    });
})
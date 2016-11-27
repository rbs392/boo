describe('Test wdio', () =>  {
  it("does somethiing", function(done){
    this.timeout(100000);
    browser.url('/');
    $('.form-control').setValue("http://freebookspot.es/");
    $('.btn[type="submit"]').click();
    console.log($('.form-control').attr());
    browser.pause(10000)
    browser.end();
    done()
  })
});

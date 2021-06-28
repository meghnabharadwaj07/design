const request = require('supertest');

// user mock data
const mockUserData = {
  donorName: 'tester',
  donorAddress:'testeraddress pincode 700033',
  donorEmail: 'tester@strapi.com',
  donorPhone: '9433967927',
  onorItemList: {
    "bookshelf": {
        "type": "string"
      },
  },
};
  it('should create a user', async done => {
    
    await request(strapi.server) // app server is an instance of Class: http.Server
      .get("/donors")
      .expect(200)
      .then(data => {
        expect(data.body.jwt).toBeDefined();
      });
      done();
});





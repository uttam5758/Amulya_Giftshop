let chai = require("chai");

let chaiHttp = require("chai-http");

let server = require("../server");

// assertion style


chai.should();

chai.use(chaiHttp);

describe("florashop User API TEST", () => {
 // test the product route
 
  describe("POST /api/products", () => {
    it("It should get products", (done) => {
      chai

        .request(server)

        .get("/api/v2/products")

        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });
  });
});





describe("florashop review API TEST", () => {
 // test the product route
 
  describe("POST /api/reviews", () => {
    it("It should get products review", (done) => {
      chai

        .request(server)

        .get("/api/v2/reviews")

        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });
});
describe("florashop review API TEST", () => {
  // test the product route
  
   describe("POST /api/reviews", () => {
     it("It should get products review", (done) => {
       chai
 
         .request(server)
 
         .delete("/api/v2/admin/reviews")
 
         .end((err, res) => {
           res.should.have.status(404);
 
           done();
         });
     });
   });
 });
 










process.env.NODE_ENV = "test"

const app = require("../../server");
const chai = require("chai");
const chaiHttp  = require("chai-http");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Pet", () => {
    describe("GET /", () => {
        // Test to create a new pet record
        it("should create a pet record", (done) => {
            chai.request(app)
                .post('/api/pets')
                .send({
                    name: 'Juno',
                    image: 'https://cdn.orvis.com/images/DBS_Westie_1280.jpg',
                    dob: '2016-01-01',
                    address: '650 Chapel Street, South Yarra, VIC 3141'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Test to create a new pet record without pet name
        it("should not create a pet record without pet name", (done) => {
            chai.request(app)
                .post('/api/pets')
                .send({
                    image: 'https://cdn.orvis.com/images/DBS_Westie_1280.jpg',
                    dob: '2016-01-01',
                    address: '650 Chapel Street, South Yarra, VIC 3141'
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
        // Test to create a new pet record with invalid dob format
        it("should not create a pet record without a valid dob", (done) => {
            chai.request(app)
                .post('/api/pets')
                .send({
                    name: 'Juno',
                    image: 'https://cdn.orvis.com/images/DBS_Westie_1280.jpg',
                    dob: 'INVALID DATE',
                    address: '650 Chapel Street, South Yarra, VIC 3141'
                })
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
        // Test to get all pets record
        it("should get all pets record", (done) => {
            chai.request(app)
                .get('/api/pets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.length(1);
                    done();
                });
        });
        // Test to get single pet record
        it("should get a single pet record", (done) => {
            const id = 1;
            chai.request(app)
                .get(`/api/pets/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        // Test to get single pet record
        it("should not get a single pet record", (done) => {
            const id = 5;
            chai.request(app)
                .get(`/api/pets/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        // ... Rest of the tests ...
    });
});
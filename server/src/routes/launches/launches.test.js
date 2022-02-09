const request = require('supertest');

const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe('Launches API', () => {

    beforeAll(async () => await mongoConnect());

    afterAll(async () => await mongoDisconnect());
    
    describe('Test GET /launches', () => {
        test('It should respond with 200 success' , async () => {
            const response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        })
    })
    
    describe('Test POST /launches', () => {
        const testLauchData = {
            mission: "USS34S",
            rocket: "EXO1S1",
            destination: "Kepler-62 f",
            launchDate: "Jan 4,2029"
        }
        const lauchDataWithoutDate = {
            mission: "USS34S",
            rocket: "EXO1S1",
            destination: "Kepler-62 f",
        }
        const launchDatewithInvalidDate = {
            mission: "USS34S",
            rocket: "EXO1S1",
            destination: "Kepler-62 f",
            launchDate: "Jananna"
        }
        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(testLauchData)
                .expect('Content-Type', /json/)
                .expect(201);
            const requestDate = new Date(testLauchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
            expect(response.body).toMatchObject(lauchDataWithoutDate)
        })
        test('It should catch missing required property', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(lauchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400);
            expect(response.body).toStrictEqual({
                error: "Missing Required value!"
            })
        })
        test('Is should catch invalid date', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDatewithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400);
            expect(response.body).toStrictEqual({
                error: "Invalid Date!"
            })
        })
    })
})
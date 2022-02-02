const request = require('supertest');
const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200 success' , async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    })

})

describe('Test POST /launches', () => {

    const testLauchData = {
        mission: "USS34S",
        rocket: "EXO1S1",
        destination: "Kepler-442 b",
        launchDate: "Jan 4,2029"
    }

    const lauchDataWithoutDate = {
        mission: "USS34S",
        rocket: "EXO1S1",
        destination: "Kepler-442 b",
    }
    
    const launchDatewithInvalidDate = {
        mission: "USS34S",
        rocket: "EXO1S1",
        destination: "Kepler-442 b",
        launchDate: "Jananna"
    }

    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .post('/launches')
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
            .post('/launches')
            .send(lauchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Missing Required value!"
        })
    })

    test('Is should catch invalid date', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDatewithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Invalid Date!"
        })


    })

})
const request = require('supertest');
const app = require('../server'); // Replace this with the path to your Express app
const bcrypt = require('bcrypt');

const User = require('../models/Nasa_User');

describe('POST /NasaUser/add', () => {
    it('should add a new NasaUser', async () => {
        const newUser = {
            username: 'Test User',
            email: 'testuser@example.com',
            password: 'testpassword'
        };

        // Hash the password before adding the user
        newUser.password = await bcrypt.hash(newUser.password, 10);

        const res = await request(app)
            .post('/NasaUser/add')
            .send(newUser);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual('New NasaUser Added to Database Successfully');
    }, 15000);
});

describe('POST /NasaUser/login', () => {
    it('should login an existing NasaUser with correct credentials', async () => {
        const credentials = {
            email: 'ssamantha@gmail.com',
            password: 'samantha1234',
        };

        const res = await request(app)
            .post('/NasaUser/login')
            .send(credentials);

        expect(res.statusCode).toEqual(200);
        expect(res.body.accessToken).toBeDefined();
    });

    it('should return 401 if login credentials are incorrect', async () => {
        const credentials = {
            email: 'shainii@gmail.com',
            password: 'incorrectpassword',
        };

        const res = await request(app)
            .post('/NasaUser/login')
            .send(credentials);

        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual('Email and the password mismatch');
    });
});

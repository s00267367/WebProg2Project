import request from "supertest";
import { app } from "../../src/app";
import { ObjectId } from "mongodb";

let dishId : ObjectId;


describe('GET /dishes', () => {

    it('returns all dishes', async () => {

        const response = await request(app)
            .get('/api/v1/dishes');

        expect(response.status).toBe(200);

    });

});



describe ('POST /dishes', () => {

    it('creates a valid dish', async () => {

        const response = await request(app)
            .post('/api/v1/dishes')
            .send({
                make: "Ford",
                model: "Focus",
                year: 2020
            });


        expect(response.status).toBe(201);
        dishId = response.body._id;
        console.log("Created dish with ID:", dishId);
    });

});

describe('GET /dishes/:id', () => {
    it('returns a dish by ID', async () => {

        const response = await request(app)
            .get(`/api/v1/dishes/${dishId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', dishId.toString());
    });
});

describe ('PUT /dishes/:id', () => {

    it('updates a dish by ID', async () => {
        const response = await request(app)
            .put(`/api/v1/dishes/${dishId}`)
            .send({
                make: "Toyota",
                model: "Camry",
                year: 2021
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('make', 'Toyota');
        expect(response.body).toHaveProperty('model', 'Camry');
        expect(response.body).toHaveProperty('year', 2021);
    });
});

describe('DELETE /dishes/:id', () => {
    it('deletes a dish by ID', async () => {
        const response = await request(app)
            .delete(`/api/v1/dishes/${dishId}`);
        expect(response.status).toBe(200);
    });
});

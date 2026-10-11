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
                name: "Brownie",
                price: 8,
                ingredients: [
                    {
                    name: "chocolate",
                    quantity: "100g"
                    },
                    {
                    name: "vegetable oil",
                    quantity: "50ml"
                    },
                    {
                    name: "sugar",
                    quantity: "50g"
                    },
                    {
                    name: "flour",
                    quantity: "50g"
                    }
                ],
                allergens: [
                    {
                    name: "dairy",
                    ingredients: ["chocolate"]    
                    },
                    {
                    name: "gluten",
                    ingredients: ["flour"]
                    }
                ],
                availability: {
                    menu: "dessert",
                    special: false
                }
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
                name: "Updated Brownie",
                price: 10,
                ingredients: [
                    {
                    name: "chocolate",
                    quantity: "100g"
                    },
                    {
                    name: "vegetable oil",
                    quantity: "50ml"
                    },
                    {
                    name: "sugar",
                    quantity: "50g"
                    },
                    {
                    name: "flour",
                    quantity: "50g"
                    }
                ],
                allergens: [
                    {
                    name: "dairy",
                    ingredients: ["chocolate"]    
                    },
                    {
                    name: "gluten",
                    ingredients: ["flour"]
                    }
                ],
                availability: {
                    menu: "dessert",
                    special: true
                }
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Brownie');
        expect(response.body).toHaveProperty('price', 10);
        expect(response.body).toHaveProperty('availability.special', true);
    });
});

describe('DELETE /dishes/:id', () => {
    it('deletes a dish by ID', async () => {
        const response = await request(app)
            .delete(`/api/v1/dishes/${dishId}`);
        expect(response.status).toBe(200);
    });
});

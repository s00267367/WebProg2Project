import request from "supertest";
import { app } from "../../src/app";
import { ObjectId } from "mongodb";

let dishId : ObjectId;

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

describe ('POST /dishes', () => {

    it('it fails to create a valid dish due to missing ingredient field', async () => {
        const response = await request(app)
            .post('/api/v1/dishes')
            .send({
                name: "Brownie",
                price: 8, 
                              
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

        expect(response.status).toBe(400);
    });

});

describe('GET /dishes', () => {

    it('returns all dishes', async () => {

        const response = await request(app)
            .get('/api/v1/dishes');

        expect(response.status).toBe(200);

    });

});

describe('GET /dishes/menu/breakfast', () => {

    it('returns all dishes for the breakfast menu', async () => {

        const response = await request(app)
            .get('/api/v1/dishes/menu/breakfast');

        expect(response.status).toBe(200);

    });

});

describe('GET /dishes/menu/lunch', () => {

    it('returns all dishes for the lunch menu', async () => {

        const response = await request(app)
            .get('/api/v1/dishes/menu/lunch');

        expect(response.status).toBe(200);

    });

});

describe('GET /dishes/menu/dinner', () => {

    it('returns all dishes for the dinner menu', async () => {

        const response = await request(app)
            .get('/api/v1/dishes/menu/dinner');

        expect(response.status).toBe(200);

    });

});

describe('GET /dishes/menu/dessert', () => {

    it('returns all dishes for the dessert menu', async () => {

        const response = await request(app)
            .get('/api/v1/dishes/menu/dessert');

        expect(response.status).toBe(200);

    });

});

describe('GET /dishes/menu/:menu', () => {

    it('fails to return all dishes for an invalid menu', async () => {

        const response = await request(app)
            .get('/api/v1/dishes/menu/invalid');

        expect(response.status).toBe(400);

    });

});

describe('GET /dishes/special/true', () => {
    it('returns all dishes for a specific special status', async () => {

        const response = await request(app)
            .get('/api/v1/dishes/special/true');

        expect(response.status).toBe(200);

    });
});

describe('GET /dishes/special/false', () => {
    it('returns all dishes for a false special status', async () => {

        const response = await request(app)
            .get('/api/v1/dishes/special/false');

        expect(response.status).toBe(200);

    });
});

describe('GET /dishes/special/:special', () => {
    it('fails to return dishes for an invalid special status', async () => {

        const response = await request(app)
            .get('/api/v1/dishes/special/invalid');

        expect(response.status).toBe(400);
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

describe('GET /dishes/:id', () => {
    it('fails to return a dish by ID', async () => {
        const response = await request(app)
            .get(`/api/v1/dishes/6acbec704c2f25fe28d5954b`);

        expect(response.status).toBe(404);
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

describe ('PUT /dishes/:id', () => {

    it('fails to update a dish by ID as it cannot be found', async () => {
        const response = await request(app)
            .put(`/api/v1/dishes/6acbec704c2f25fe28d5954b`)
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

        expect(response.status).toBe(404);
    });
});

describe ('PUT /dishes/:id', () => {

    it('fails to update a dish by ID due to invalid data (no name provided)', async () => {
        const response = await request(app)
            .put(`/api/v1/dishes/${dishId}`)
            .send({
                
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

        expect(response.status).toBe(400);
    });
});

describe('DELETE /dishes/:id', () => {
    it('deletes a dish by ID', async () => {
        const response = await request(app)
            .delete(`/api/v1/dishes/${dishId}`);
        expect(response.status).toBe(200);
    });
});

describe('DELETE /dishes/:id', () => {
    it('fails to delete a dish by ID', async () => {
        const response = await request(app)
            .delete(`/api/v1/dishes/6acbec704c2f25fe28d5954b`);
        expect(response.status).toBe(404);
    });
});
import { createDishZSchema } from "../../src/models/dishes";

const validDish = {
  "name": "Vegetable Soup",
  "price": 6.00,
  "ingredients": [
    {
      "name": "carrots",
      "quantity": "100g"
    },
    {
      "name": "potatoes",
      "quantity": "100g"
    },
    {
      "name": "onions",
      "quantity": "50g"
    },
    {
      "name": "vegetable stock",
      "quantity": "300ml"
    },
    {
      "name": "cream",
      "quantity": "30ml"
    }
  ],
  "allergens": [
    {
      "name": "dairy",
      "ingredients": ["cream"]
    },
    {
      "name": "possible celery",
      "ingredients": ["vegetable stock"]
    }
  ],
  "availability": {
    "menu": "lunch",
    "special": false
  }

}

describe('Test Dish Validation', () => {
    it('should pass for the following valid data', () => {

        expect(() => createDishZSchema.parse(
            validDish)).not.toThrow();
    });
    it('should fail for the following data - no source ingredient for allergens', () => {

        expect(() => createDishZSchema.parse(
            { ...validDish, "allergens": [
    {
      "name": "dairy",
      "ingredients": undefined    
    },
    {
      "name": "gluten",
      "ingredients": undefined
    }
    ] })).toThrow();
    });
    it('should fail for the menu not being in the enum ', () => {
        expect(() => createDishZSchema.parse(
        { ...validDish, "availability": {
    "menu": "Tuesday",
    "special": false
    }})).toThrow();
    });
    it('should fail for the unparsaable price ', () => {

        expect(() => createDishZSchema.parse(
            { ...validDish, "price": 'wrong price' })).toThrow();
    });
    it('should fail for the too short price ', () => {

        expect(() => createDishZSchema.parse(
            { ...validDish, "price": '' })).toThrow();
    });
    it('should fail for the missing name ', () => {

        expect(() => createDishZSchema.parse(
            { ...validDish, "name": undefined })).toThrow();
    });
    it('should fail for the missing price ', () => {

        expect(() => createDishZSchema.parse(
            { ...validDish, "price": undefined })).toThrow();
    });
    it('should fail for the missing ingredients ', () => {

        expect(() => createDishZSchema.parse(
            { ...validDish, "ingredients": undefined })).toThrow();
    });
    it('should pass for the missing allergens ', () => {

        expect(() => createDishZSchema.parse(
            { ...validDish, "allergens": undefined })).not.toThrow();
    });
    it('should fail for the missing availability ', () => {

        expect(() => createDishZSchema.parse(
            { ...validDish, "availability": undefined })).toThrow();
    });
    it('should fail for the unparsable special bool ', () => {

        expect(() => createDishZSchema.parse(
            { ...validDish, availability: {
                ...validDish.availability,
                special: 'not a bool'
            }})).toThrow();
    });


});

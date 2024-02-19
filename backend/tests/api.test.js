const request = require('supertest');
const app = require('../server');
const assert = require('assert'); 


describe('GET /api/products', () => {
    it('should return all products', async () => {
        const res = await request(app).get('/api/products');
        assert.equal(res.status, 200);
        assert.ok(Array.isArray(res.body));
        assert.ok(res.body[0].id); 
        assert.ok(res.body[0].name);
    });
});

describe('GET /api/products/:id', () => {

    it('should return a product by id', async () => {
      const res = await request(app).get('/api/products/1');
      
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.id, '1');
    });
  
    it('should return 404 if product not found', async () => {
      const res = await request(app).get('/api/products/999');  
      assert.equal(res.statusCode, 404);
    });
  
  });


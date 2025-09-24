require('dotenv').config({ path: './env.txt' });
const request = require('supertest');
const app = require('./server.js');
const { createClient } = require('@supabase/supabase-js');

// Use environment variables for Supabase credentials
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

beforeAll(() => {
    // This runs once before all tests
});

afterAll(async () => {
    //No need to close Supabase client
});

beforeEach(async () => {
 // This runs before each individual test
 // We clean the table and seed it with known data for a predictable state.
  // Delete all carpark records
  await supabase.from('carparks').delete().neq('id', 0);

  // Insert test carpark data
  await supabase.from('carparks').insert([
    {
      name: 'Bugis Junction',
      weekday_rate: '$1.20/30min',
      weekend_rate: '$1.50/30min',
      night_parking: 'Available: $4 after 8pm',
      region: 'Central'
    },
    {
      name: 'Plaza Singapura',
      weekday_rate: '$1.00/30min',
      weekend_rate: '$1.20/30min',
      night_parking: 'Not Available',
      region: 'Central'
    }
    // Add more test records as needed
  ]);
});

// Main test suite
describe('Carparks API', () => {
 // Test cases will go here
 //READ operations:
    describe('GET /api/carparks', () => {
        it('should return all carparks', async () => {
            const res = await request(app).get('/api/carparks');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[0].name).toBe('Bugis Junction');
        });
    });

    describe('GET /api/carparks/region/:region', () => {
        it('should return carparks in the specified region', async () => {
            const res = await request(app).get('/api/carparks/region/Central');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(2); // Assuming 2 carparks in Central region
            expect(res.body[0].region).toBe('Central');
        });
    });

    describe('GET /api/carparks/name/:name', () => {
        it('should return carparks matching the specified name', async () => {
            const res = await request(app).get('/api/carparks/name/Bugis');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(1); // Assuming 1 carpark with 'Bugis' in its name
            expect(res.body[0].name).toBe('Bugis Junction');
        });

        it('should return 404 if the carpark is not found', async () => {
            const response = await request(app).get('/api/carparks/name/NonExistentCarpark');
            expect(response.statusCode).toBe(404);
        });
    });
});
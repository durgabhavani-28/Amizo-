const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGODB_URI;
let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client.db('amizo');
}

exports.handler = async function(event, context) {
  const db = await connectToDatabase();
  const restaurants = db.collection('restaurants');

  try {
    if (event.httpMethod === 'GET') {
      // Get all restaurants
      const allRestaurants = await restaurants.find({}).toArray();
      return { statusCode: 200, body: JSON.stringify(allRestaurants) };
    } else if (event.httpMethod === 'POST') {
      // Add a new restaurant
      const data = JSON.parse(event.body);
      if (!data.name || !data.cuisine) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
      }
      const result = await restaurants.insertOne(data);
      return { statusCode: 201, body: JSON.stringify({ message: 'Restaurant added', id: result.insertedId }) };
    } else if (event.httpMethod === 'PUT') {
      // Update a restaurant
      const data = JSON.parse(event.body);
      if (!data.id) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing restaurant id' }) };
      }
      const id = new ObjectId(data.id);
      delete data.id;
      await restaurants.updateOne({ _id: id }, { $set: data });
      return { statusCode: 200, body: JSON.stringify({ message: 'Restaurant updated' }) };
    } else if (event.httpMethod === 'DELETE') {
      // Delete a restaurant
      const data = JSON.parse(event.body);
      if (!data.id) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing restaurant id' }) };
      }
      const id = new ObjectId(data.id);
      await restaurants.deleteOne({ _id: id });
      return { statusCode: 200, body: JSON.stringify({ message: 'Restaurant deleted' }) };
    } else {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};

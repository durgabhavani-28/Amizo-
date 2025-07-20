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
  const orders = db.collection('orders');

  try {
    if (event.httpMethod === 'GET') {
      // Get all orders for a user
      const userEmail = event.queryStringParameters && event.queryStringParameters.email;
      if (!userEmail) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing user email' }) };
      }
      const userOrders = await orders.find({ userEmail }).toArray();
      return { statusCode: 200, body: JSON.stringify(userOrders) };
    } else if (event.httpMethod === 'POST') {
      // Place a new order
      const data = JSON.parse(event.body);
      if (!data.userEmail || !data.items || !Array.isArray(data.items)) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
      }
      data.status = 'Processing';
      data.createdAt = new Date();
      const result = await orders.insertOne(data);
      return { statusCode: 201, body: JSON.stringify({ message: 'Order placed', id: result.insertedId }) };
    } else if (event.httpMethod === 'PUT') {
      // Update order status
      const data = JSON.parse(event.body);
      if (!data.id || !data.status) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing order id or status' }) };
      }
      const id = new ObjectId(data.id);
      await orders.updateOne({ _id: id }, { $set: { status: data.status } });
      return { statusCode: 200, body: JSON.stringify({ message: 'Order status updated' }) };
    } else {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};

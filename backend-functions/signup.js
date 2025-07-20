const { MongoClient } = require('mongodb');

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
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { fullName, email, password } = JSON.parse(event.body);

  if (!fullName || !email || !password) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  try {
    const db = await connectToDatabase();
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return { statusCode: 409, body: JSON.stringify({ error: 'User already exists' }) };
    }

    await users.insertOne({ fullName, email, password });

    return { statusCode: 201, body: JSON.stringify({ message: 'User created successfully' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};

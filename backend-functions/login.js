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

  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  try {
    const db = await connectToDatabase();
    const users = db.collection('users');

    const user = await users.findOne({ email, password });
    if (!user) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }

    // For simplicity, returning user info without token
    return { statusCode: 200, body: JSON.stringify({ message: 'Login successful', user: { fullName: user.fullName, email: user.email } }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};

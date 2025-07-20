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
  const users = db.collection('users');

  try {
    if (event.httpMethod === 'GET') {
      // Get user profile by email
      const email = event.queryStringParameters && event.queryStringParameters.email;
      if (!email) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing email' }) };
      }
      const user = await users.findOne({ email }, { projection: { password: 0 } });
      if (!user) {
        return { statusCode: 404, body: JSON.stringify({ error: 'User not found' }) };
      }
      return { statusCode: 200, body: JSON.stringify(user) };
    } else if (event.httpMethod === 'PUT') {
      // Update user profile
      const data = JSON.parse(event.body);
      if (!data.email) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing email' }) };
      }
      const email = data.email;
      delete data.email;
      await users.updateOne({ email }, { $set: data });
      return { statusCode: 200, body: JSON.stringify({ message: 'Profile updated' }) };
    } else {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};

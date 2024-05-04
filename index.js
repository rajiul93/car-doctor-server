// xDMbhGEZsaH6ea3F
// car-doctor

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});

const uri =
  `mongodb+srv://${process.env.DB_user}:${process.env.DB_key}@cluster0.hefn8jo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.listen(port, () => {
  console.log(`server is running`);
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const carDoctor = client.db("car-doctor");
    const carServiceCollection = carDoctor.collection("carServiceCollection");

    app.get("/service", async (req, res) => {
      const cursor = carServiceCollection.find();
      const result = await cursor.toArray();
      console.log(result);
      res.send(result)
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

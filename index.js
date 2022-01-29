const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId
const app = express();
const port = 5000;
//  user: fish-crm
//  pass: XjEJAYWFr466wBMF

//middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://fish-crm:XjEJAYWFr466wBMF@cluster0.ln4sk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("Basic-crm");
      const speciesCollection = database.collection("species");
      const dailygrowthCollection = database.collection("dailygrowth");
      const feedsizeCollection = database.collection("feedsize");
      const speciesReferenceCollection = database.collection("speciesReference");


      // Save Species Ref
      app.post('/species-reference', async (req, res)=>{
        const newFeed = req.body;
        const resultThree = await speciesReferenceCollection.insertOne(newFeed);
        res.json(resultThree);
      });

      // // List Species Ref
      app.get('/species-reference', async(req,res)=>{
        const cursor = speciesReferenceCollection.find({});
        const species = await cursor.toArray();
        res.send(species)
      })

      
      // GET API OF SPECIES
      app.get('/species', async(req,res)=>{
        const cursor = speciesCollection.find({});
        const species = await cursor.toArray();
        res.send(species)
      })

      // GET API OF DAILY GROWTH
      app.get('/database', async(req,res)=>{
        const growth = dailygrowthCollection.find({});
        const dailygrowth = await growth.toArray();
        res.send(dailygrowth)
      })
      // GET API OF Feed SIZE
      app.get('/feed', async(req,res)=>{
        const rate = feedsizeCollection.find({});
        const feedsize = await rate.toArray();
        res.send(feedsize)
      })


     // POST API OF SPECIES
     app.post('/species', async (req, res)=>{
        const newSpecies = req.body;
        const result = await speciesCollection.insertOne(newSpecies);
        console.log('Get the new data', req.body);
        res.json(result);
      })

     // POST API OF DAILY GROWTH
     app.post('/database', async (req, res)=>{
        const newData = req.body;
        const resultTwo = await dailygrowthCollection.insertOne(newData);
        console.log('Get the new data', req.body);
        res.json(resultTwo);
      })
     // POST API OF Feed SIZE
     app.post('/feed', async (req, res)=>{
        const newFeed = req.body;
        const resultThree = await feedsizeCollection.insertOne(newFeed);
        console.log('Get the new data', req.body);
        res.json(resultThree);
      })

      // DELETE API OF SPECIES
      app.delete('/species/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await speciesCollection.deleteOne(query);
        console.log('Deleting the data with id', result);
        res.json(result)
      })
      // DELETE API OF DAILY GROWTH
      app.delete('/database/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const resultTwo = await dailygrowthCollection.deleteOne(query);
        console.log('Deleting the data with id', resultTwo);
        res.json(resultTwo)
      })
      // DELETE API OF Feed SIZE
      app.delete('/feed/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const resultThree = await feedsizeCollection.deleteOne(query);
        console.log('Deleting the data with id', resultThree);
        res.json(resultThree)
      })

      // UPDATE API of Species
      app.put('/species/:id/:fish/:oxygen',async(req,res)=>{
        const id = req.params.id;
        const fish = req.params.fish;
        const oxygen = req.params.oxygen;
        const query = {_id: ObjectId(id)};
        const newValues ={$set:{fish:fish,oxygendemand:oxygen}}
        const result = await speciesCollection.updateOne(query,newValues)
        console.log('Updating the data with id', result);
        res.json(result)
      })

      // UPDATE API OF DAILY GROWTH
      app.put('/database/:id/:fishtype/:age/:bodyweight',async(req,res)=>{
        const id = req.params.id;
        const fishtype = req.params.fishtype;
        const age = req.params.age;
        const bodyweight = req.params.bodyweight;
        console.log(id,fishtype , age, bodyweight);
        const query = {_id: ObjectId(id)};
        const newValues ={$set:{fishtype:fishtype, age: age, bodyweight: bodyweight}}
        const resultTwo = await dailygrowthCollection.updateOne(query,newValues)
        console.log('Updating the data with id', resultTwo);
        res.json(resultTwo)
      })
      // UPDATE API of Feed-size
      app.put('/feed/:id/:fishtype/:feedtype/:bodyweight/:feedrate/:frequency',async(req,res)=>{
        const id = req.params.id;
        const fishtype = req.params.fishtype;
        const feedtype = req.params.feedtype;
        const bodyweight = req.params.bodyweight;
        const feedrate = req.params.feedrate;
        const frequency = req.params.frequency;
        const query = {_id: ObjectId(id)};
        const newValues ={$set:{fishtype:fishtype, feedtype:feedtype, bodyweight: bodyweight, feedrate: feedrate, frequency: frequency}}
        const resultThree = await feedsizeCollection.updateOne(query,newValues)
        console.log('Updating the data with id', resultThree);
        res.json(resultThree)
      })
    } 
    finally { 
      // await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Running my CRUD Server')
});

app.listen(port, ()=>{
    console.log('Running server on port', port);
})
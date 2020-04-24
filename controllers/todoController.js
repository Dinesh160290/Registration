var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var urlEncodedParser = bodyparser.urlencoded({extended : false});
var data = [{name : 'Dinesh',age:'20',city:'palladam',state:'TN',zip:'641664'}];

























/* mongoose.connect('mongodb+srv://test:test@nodeexpress-l4xyj.mongodb.net/test?retryWrites=true&w=majority',function(err){
    if(err) throw err;
});

//creating a schema
var todoSchema = new mongoose.Schema({
    name:String,
    age:String,
    city:String,
    state:String,
    zip:String
});

var todo = mongoose.model('Todo',todoSchema);
*/

module.exports = function(app){




app.get('/',function(req, res) {

});

app.delete('/todo/:id',urlEncodedParser,function(req, res) {


    console.log(req.params.id);

   const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://test:test@nodeexpress-l4xyj.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(function(error) {
        if(error) throw error;
        const collection = client.db("firstapp").collection("Todo");

        var seqid = { seq: parseInt(req.params.id) };

        collection.deleteOne(seqid, function(err, resp) {
            if(err) throw err;
            console.log("One Document Deleted"); 
           
        });
        res.json(seqid);
    });


});

app.post('/update',urlEncodedParser,function(req, res) {

    var reqBody = req.body;

    var seqid = parseInt(reqBody.seq);

    delete reqBody.seq;

    console.log(reqBody);

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://test:test@nodeexpress-l4xyj.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(function(error) {

        if(error) throw error;
        const collection = client.db("firstapp").collection("Todo");
        // perform actions on the collection object

        var query = { 'seq' : seqid };
        var newvalues = { $set: reqBody };
        collection.updateOne(query, newvalues, function(ferr, todoData) {
            if(ferr) throw ferr;
            console.log("1 Document Updated");
            res.json(query);
        });
    }); 


});


app.get('/todo/:id/:mode',function(req, res) {
    var id   = req.params.id;
    var mode = req.params.mode;

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://test:test@nodeexpress-l4xyj.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(function(error) {

        if(error) throw error;
        const collection = client.db("firstapp").collection("Todo");
        // perform actions on the collection object

        var query = { 'seq' : parseInt(req.params.id) };
        collection.findOne(query, function(ferr, todoData) {
            if(ferr) throw ferr;
            console.log(todoData);
            res.render('update',{data : todoData,mode : 'UPDATE'});
           // res.render('todo',{data : todoData});
        });
        

    }); 

    client.close();





});


app.post('/todo',urlEncodedParser,function(req, res) {
    //var todoCollection = null;
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://test:test@nodeexpress-l4xyj.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(function(error) {

        if(error) throw error;
        const collection = client.db("firstapp").collection("Todo");
        // perform actions on the collection object


        var min = 10000;
        var max = 99999;
        var num = Math.floor(Math.random() * (max - min + 1)) + min;

        var reqBody = req.body;
        reqBody.seq = num;
        collection.insertOne(reqBody, function(err, res) {
            if(err) throw err;
            console.log("One Document Inserted"); 
        });

        var sortOrder = {name  : -1};
        collection.find().sort(sortOrder).limit(3).toArray(function(ferr, todoData) {
            if(ferr) throw ferr;
            res.render('todo',{data : todoData,mode : 'CREATE'});
        });
        

    }); 

    client.close();
});


};
var express = require('express');
var isset = require('isset');

var todoController = require('./controllers/todoController');

var app = express();



//View Engine
app.set('view engine','ejs');

//middleware
app.use(express.static('./public'));

todoController(app);

app.get('/todo',function(req, res){
    //var data = [{name : 'Dinesh',age:'20',city:'palladam',state:'TN',zip:'641664'}];


    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://test:test@nodeexpress-l4xyj.mongodb.net/test?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(function(error) {

        if(error) throw error;
        const collection = client.db("firstapp").collection("Todo");
        
        var sortOrder = {name  : -1};
        collection.find().sort(sortOrder).limit(3).toArray(function(ferr, todoData) {
            if(ferr) throw ferr;
            res.render('todo',{data : todoData,mode : 'CREATE'});
        });
        

    }); 

    client.close();
});


app.listen(3000);

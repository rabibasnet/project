var express = require('express');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var connection = require("express-myconnection");
var basePath = "/service";

var app = express();

app.use(bodyParser.json());  //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ //to support URL-encoded bodies
    extended:true
}));

// Create Sql Connection
app.use(connection(mysql, {        
    host     : 'localhost',
    user     : 'root',        
    password : 'password',
    database : 'project'
},'request'));

var getDeleteObj={
    student:{
        "url":basePath+"/studenttable/:studentId",
        "query":"DELETE FROM studenttable WHERE studentId = ?",
        "ids":["studentId"]
    },
    teacher:{
        "url":basePath+"/teachertable/:teacherId",
        "query":"DELETE FROM teachertable WHERE teacherId = ?",
        "ids":["teacherId"]
    },
    class:{
        "url":basePath+"/classtable/:classId",
        "query":"DELETE FROM classtable WHERE classId = ?",
        "ids":["classId"]
    },
     
    session:{
        "url":basePath+"/sessiontable/:sessionId",
        "query":"DELETE FROM sessiontable WHERE sessionId = ?",
        "ids":["sessionId"]
    },
    batch:{
        "url":basePath+"/batchtable/:batchId",
        "query":"DELETE FROM batchtable WHERE batchId = ?",
        "ids":["batchId"]
    }
}
var getPutObj={
    student:{
        "url":basePath+"/studenttable/:studentId",
        "query":"UPDATE studenttable SET ? WHERE studentId = ?",
        "ids":["studentId"]
    },
     teacher:{
        "url":basePath+"/teachertable/:teacherId",
        "query":"UPDATE teachertable SET ? WHERE teacherId = ?",
        "ids":["teacherId"]
    },
    class:{
        "url":basePath+"/classtable/:classId",
        "query":"UPDATE classtable SET ? WHERE classId = ?",
        "ids":["classId"]
    },
     session:{
        "url":basePath+"/sessiontable/:sessionId",
        "query":"UPDATE sessiontable SET ? WHERE sessionId = ?",
        "ids":["sessionId"]
    },
      batch:{
        "url":basePath+"/batchtable/:batchId",
        "query":"UPDATE batchtable SET ? WHERE batchId = ?",
        "ids":["batchId"]
    }
    
}

var getPostObj={
    studenttable:{
        query:"INSERT INTO studenttable set ?",
        url:basePath+"/studenttable",
        ids:[]
    },
    
    teachertable:{
        query:"INSERT INTO teachertable set ?",
        url:basePath+"/teachertable",
        ids:[]
    },
     classtable:{
        query:"INSERT INTO classtable set ?",
        url:basePath+"/classtable",
        ids:[]
    },
     sessiontable:{
        query:"INSERT INTO sessiontable set ?",
        url:basePath+"/sessiontable",
        ids:[]
    },
      batchtable:{
        query:"INSERT INTO batchtable set ?",
        url:basePath+"/batchtable",
        ids:[]
    }
    
    
}
var getServiceObj = {
    studenttable:{
        query:"SELECT * FROM studenttable",
        url:basePath+"/studenttable",
        ids:[]
    },
    studenttableUnique:{
        query:"SELECT * FROM studenttable where studentId=?",
        url:basePath+"/studenttable/:studentId",
        ids:["studentId"]
    },
     teachertable:{
        query:"SELECT * FROM teachertable",
        url:basePath+"/teachertable",
        ids:[]
    },
    teachertableUnique:{
        query:"SELECT * FROM teachertable where teacherId=?",
        url:basePath+"/teachertable/:teacherId",
        ids:["teacherId"]
    },
       classtable:{
        query:"SELECT * FROM classtable",
        url:basePath+"/classtable",
        ids:[]
    },
    classtableUnique:{
        query:"SELECT * FROM classtable where classId=?",
        url:basePath+"/classtable/:classId",
        ids:["classId"]
    },
        sessiontable:{
        query:"SELECT * FROM sessiontable",
        url:basePath+"/sessiontable",
        ids:[]
    },
    sessiontableUnique:{
        query:"SELECT * FROM sessiontable where sessionId=?",
        url:basePath+"/sessiontable/:sessionId",
        ids:["sessionId"]
    },
    batchtable:{
        query:"SELECT * FROM batchtable",
        url:basePath+"/batchtable",
        ids:[]
    },
    batchtableUnique:{
        query:"SELECT * FROM batchtable where batchId=?",
        url:basePath+"/batchtable/:batchId",
        ids:["batchId"]
    }
    
    
};

//console.log("Hello World");
for(var key in getServiceObj){
    console.log(getServiceObj[key].url);
    getServices(getServiceObj[key].url,getServiceObj[key].ids,getServiceObj[key].query);
}

for(var key in getPostObj){
 postServices(getPostObj[key].url,getPostObj[key].ids,getPostObj[key].query);
}

for(var key in getPutObj){
 putServices(getPutObj[key].url,getPutObj[key].ids,getPutObj[key].query);
}
for(var key in getDeleteObj){
 deleteServices(getDeleteObj[key].url,getDeleteObj[key].ids,getDeleteObj[key].query);
}
function getServices(url,ids,query){
    app.get(url,function(req,res,next){   
       req.getConnection(function(err, connection) {
          if (err) return next(err);
          connection.query(query,req.params[ids], function(err, results) {
            if (err){
              console.log(err);
              return next("Mysql error, check your query");  
            }         
            res.json(results);
          });      
        });   
    });
}

function postServices(url,ids,query){
    app.post(url,function(req,res,next){
        var reqObj = req.body;
        req.getConnection(function(err, connection){
            if (err) return next(err);
            connection.query(query,reqObj,function(err,results){
                if (err){
                    console.log(err);
                    return next("Mysql error, check your query ");  
                }         
                res.json(results);
            });
        });
    });
}

function putServices(url,ids,query){
    app.put(url,function(req,res,next){
        var id=req.params[ids];
        var reqObj = req.body;
        req.getConnection(function(err, connection){
            if (err) return next(err);
            connection.query(query,[reqObj,id],function(err,results){
                if (err){
                    console.log(err);
                    return next("Mysql error, check your query ");  
                }         
                res.json(results);
            });
        });
    });
}

function deleteServices(url,ids,query){
    app.delete(url,function(req,res,next){
        req.getConnection(function(err, connection){
            if (err){
                return next(err);
            }
            connection.query(query, req.params[ids], function(err, results){
                if (err){
                    console.log(err);
                }
                res.json(results);
            })
        })
        
    })
}

//Hosting static files
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.redirect('/views/main.html');
});




app.listen(8082,function(req,res){
    
	//console.log("Listening to port 8082: localhost:8082");
});
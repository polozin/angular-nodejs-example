const express = require('express');
const path = require('path');
const fs = require('fs');
const dataPath = path.join(__dirname, 'data');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;



app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/my-app/dist/angular-nodejs-example/"));

app.get('/api/file', (req, res) => {
    if(req.query.name === ''){
          readDirectory(res);
    }
    else{
        readFile(req.query.name, res);
    }
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/my-app/dist/angular-nodejs-example/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
function readFile(fileName, res){
    fs.readFile(`${dataPath}/${fileName}.json`, 'utf8', function (err,data) {
        if (err) {
            console.log('error reading file ' + err )
             res.json(`error reading file ${fileName}`);
            return
        }
       res.json(data);
    });
}
function readDirectory(res) {
    fs.readdir(dataPath, function (err, files) {
        //handling error
        if (err) {
            console.log('Unable to scan directory: ' + err);
            res.json(['Unable to scan directory: ']);
            return;

        }
        let filesList = [];
        //listing all files using forEach
        files.forEach(function (file) {
            // push only json files
            if( file.indexOf('.json') != -1 && file.indexOf('.json' === file.length - '.json'.length)){
                filesList.push({name: file.substr(0, file.length - '.json'.length )});
            }
        });
        res.json(filesList);
})
}
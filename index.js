var express = require('express');
var app = express();
var path = require('path')

app.set('port', (process.env.PORT || 6000));

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  
});


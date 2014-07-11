var http = require('http');
var splitter = require('./../functions/splitter.js');


var postHTML =
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post">' +
  'Your Fist Name: <input name="first_name"><br>' +
  'Your Last Name: <input name="last_name"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
 
http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('POSTed: ' + body);
 
    if (body != '')
    {
        var hash = formValues(body);
 
         console.log("input1 = " + hash["first_name"]);
         console.log("input2 = " + hash["last_name"]);
		 // some new lines by W.Eenkhoorn to check if sumbissoin not empty
		 //let's do a switch 
		 
		 switch(hash){
			 case hash["first_name"]:
			 	if(hash["first_name"]==''){
				 	res.writeHead(200);
				 	res.write('You did not fill in your name');
				 	return;
				 	
			 	} break;
			 case hash["last_name"]:
			 	if(hash["last_name"]==''){
				 	res.writeHead(200);
				 	res.write('You did not fill in your lastname');
				 	return;
				 	
			 	} break;	
			 	
		 }
		
		 
         res.writeHead(200);
         res.write('Hello ' + hash["first_name"] + ', ' + hash["last_name"] + '!');
         res.end();
         return;
    }
 
    res.writeHead(200);
    res.end(postHTML);
  });
}).listen(7777);

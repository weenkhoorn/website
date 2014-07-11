var http = require('http');
var splitter = require('../scripts/splitter.js');


var postHTML =
  '<html><head><title>Simple Post and Check script</title></head>' +
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
        var error = [];
        var hash = splitter.formValues(body);
 
         console.log("input1 = " + hash["first_name"]);
         console.log("input2 = " + hash["last_name"]);
		 // some new lines by W.Eenkhoorn to check if sumbissoin not empty
		 // try 1; let's do a switch ; this won't work because a switch won't handle arrays
		 // so we have to check another way
		 // let's set an error 
		 		 
		 if(Array.isArray(hash)){
			 //so from here we know it's an array
			 
			 if(hash['first_name'] =='' || hash['first_name'] == null){
				error.push('* Fill in first name <br>');  
			 }
			 
			 if(hash['last_name'] =='' || hash['first_name'] ==null){
				 error.push('* Fill in last name <br>');
			 }
			 
			 //so now we know that their could be an error let;s do somthing with it!
			 // we'll create a message
			 if(error.length > 0 ){
				var showErrorLines = ''; 
				for(i=0; i<error.length; i++){
					showErrorLines += error[i];
				}				 
				
				 //show some html with a back link
				 var errorHtml = '<html><head><title>Post Example</title></head>' +
				 '<body>' + showErrorLines +
				 '<a href="/" >Go Back</a>'+
				 '</body></html>';
				 
			    res.writeHead(200);
				res.write(errorHtml);
				res.end();
				return; 
			 }
			 
		 }else{
		 	// since we do expect an araay ther must be somthing wrong!!
			res.writeHead(200);
			res.write('something went wrong!');
			res.end(); 
		 }
		
		 // if everything is oke show names
         res.writeHead(200);
         res.write('Hello ' + hash["first_name"] + ', ' + hash["last_name"] + '!');
         res.end();
         return;
    }
 
    res.writeHead(200);
    res.end(postHTML);
  });
}).listen(7777);

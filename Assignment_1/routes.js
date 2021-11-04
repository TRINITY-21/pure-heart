const fs = require('fs');

const requestHandler = (req, res) => {

  const url = req.url;

  const method = req.method;

  if (url === '/') {

    res.write('<html>');

    res.write('<head><title> Home </title></head>');

    res.write('<h2>Welcome to this page, happy surfing!</h2>');

    res.write('<ul><li>Miss Bala</li></ul>');

    res.write('<ul><li>Kofi Manu</li></ul>');

    res.write(

      '<body style = "color:red">'+

      '<form action="/create-user" method="POST"><input type="text" name="username"> Username '+

      '<button type="submit">Send</button></form></body>'
    );

    res.write('</html>');

    return res.end();
  }
  
  if (url === '/create-user' && method === 'POST') {

    const body = [];

    req.on('data', chunk => {

      body.push(chunk);

    });

    return req.on('end', () => {

      const parsedBody = Buffer.concat(body).toString();

      const users = parsedBody.split('=')[1];

      console.log("All Users to console", users)

      fs.writeFile('users.txt', users, err => {

        res.statusCode = 302;

        return res.end();
      });

      res.write('<html>');
    
      res.write('<head><title>All Users</title><head>');
    
      res.write(`<body><h1>Welcome, ${users}</h1></body>`);
      
      res.write('</html>');
    
      res.end();

    });
 
  }

 
};


exports.handler = requestHandler;

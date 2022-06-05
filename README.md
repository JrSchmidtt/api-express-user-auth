## **Api User Auth**

* Code developed for academic purposes.
* Some operations to demonstrate the usage of KnexJs.

## Install and Run
1. Clone the repository : `git clone https://github.com/JrSchmidtt/api-express-user-auth`
2. Install [node.js](https://nodejs.org/en/) to run 
3. Install [Visual Studio Code](https://code.visualstudio.com/) to edit 
4. Install [HeidiSQL](https://www.heidisql.com) and import database.sql
5. Open the powershell Terminal in Visual studio and run the command ``` npm install ``` in folder to install the dependencies
6. Run the command ```node index.js``` in the folder with the usage examples

## Endpoints

### GET ```/user```
Returns the list of all registered users only for authenticated administrators.
#### request:
```javascript
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:8080/user',
  'headers': {
    'Authorization': 'Bearer AUTHENTICATED-ADMIN-ACCOUNT-TOKEN'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```
#### response:
```json
[
    {
        "id": 19,
        "name": "Dixie",
        "email": "dfurber4@sakura.ne.jp",
        "role": 0
    },
    {
        "id": 25,
        "name": "admin",
        "email": "admin@server.com",
        "role": 1
    }
]
```

### GET```/user/:id```
Returns information of a specific account.
#### request:
```javascript
var request = require('request');
var options = {
var  request  =  require('request');
var  options  = {
'method': 'GET',
'url': 'http://localhost:8080/user/25',
'headers': {'Authorization': 'Bearer AUTHENTICATED-ADMIN-ACCOUNT-TOKEN',}
};
request(options, function (error, response) {
if (error) throw  new  Error(error);
console.log(response.body);
});
```
#### response:
```json
{
"id":  25,
"email":  "admin@server.com",
"role":  1,
"name":  "admin"
}
```

### POST ```/user```
Create a new user account.
#### request:
```javascript
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:8080/user',
  'headers': {
    'Authorization': 'Bearer AUTHENTICATED-ADMIN-ACCOUNT-TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "email": "admin@server.com",
    "name": "admin",
    "password": "0808",
    "role": "1"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```
#### response:
```json
{
    "status": "200",
    "desc": "User has been created",
    "user": "admin",
    "email": "admin@server.com"
}
```

### POST ```/login```
Create an admin authorized token.
#### request:
```javascript
var  request  =  require('request');
var  options  = {
'method': 'POST',
'url': 'http://localhost:8080/login',
'headers': {
'Content-Type': 'application/json'
},
body: JSON.stringify({

"email": "admin@server.com",
"password": "SUPER-SECURE-PASSWORD"})

};
request(options, function (error, response) {
if (error) throw  new  Error(error);
console.log(response.body);
});
```
#### response:
```json
{
"token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHNlcnZlci"
}
```

### POST ```/recoverPassword```
Generate a password reset token.
#### request:
```javascript
var  request  =  require('request');
var  options  = {
'method': 'POST',
'url': 'http://localhost:8080/recoverPassword',
'headers': {
'Authorization': 'Bearer AUTHENTICATED-ADMIN-ACCOUNT-TOKEN',
'Content-Type': 'application/json'
},
body: JSON.stringify({

"token": "username@server.com"

})
};
request(options, function (error, response) {
if (error) throw  new  Error(error);
console.log(response.body);
});
```
#### response:
```json
{
"status":  "200",
"desc":  "Recover Token has been created",
"token":  "dc907a89-9097-47c1-b951-3f64244ff59a",
}
```

### POST ```/changePassword```
Change an account password.
#### request:
```javascript
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:8080/changePassword',
  'headers': {
    'Authorization': 'Bearer AUTHENTICATED-ADMIN-ACCOUNT-TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "token": "9f97107e-d048-4c10-9c1a-60f09d2ca008",
    "password": "NEW-PASSWORD"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

```
#### response:
```json
{
"status":  "200",
"desc":  "Password updated"
}
```

### POST```/user/:id```
Update account information.
#### request:
```javascript
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:8080/user/25',
  'headers': {
    'Authorization': 'Bearer AUTHENTICATED-ADMIN-ACCOUNT-TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "New Name",
    "email": "new@email.com",
    "role": "1"
  })
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
```
#### response:
```json
{
"status":  "200",
"user":  "25",
"desc":  "has been updated"
}
```

### DELETE```/user/:id```
Delete the account passed to the backend.
#### request:
```javascript
var  request  =  require('request');
var  options  = {
'method': 'DELETE',
'url': 'http://localhost:8080/user/9',
'headers': {
'Authorization': 'Bearer AUTHENTICATED-ADMIN-ACCOUNT-TOKEN'}
};
request(options, function (error, response) {
if (error) throw  new  Error(error);
console.log(response.body);
});
```
#### response:
```json
{
"status":  "200",
"user":  "17",
"desc":  "has been deleted"
}
```


## Contributing

1. [Fork the repository](https://github.com/JrSchmidtt/api-express-user-auth/fork)!
2. Clone your fork: `git clone https://github.com/JrSchmidtt/api-express-user-auth`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request :D

## Author

**Api User Auth** © [JrSchmidt](https://github.com/JrSchmidtt).  
Authored and maintained by Schmidt#9639.



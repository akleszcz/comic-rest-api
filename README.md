# Comic REST API
## Getting started

API server is running at https://comic-rest.azurewebsites.net/api
Example endpoint: https://comic-rest.azurewebsites.net/api/volumes

To run this project locally:
- Clone this repo: `git clone git@github.com:akleszcz/comic-rest-api.git`
- Edit config.js to provide custom secret used for jwt verification and connection string to a MongoDB Database
- Run `npm start` to start the local server on default port 3000

## Functionality
This API is meant to work with comic reader website that can be found [here](https://github.com/akleszcz/comic). It provides endpoints to fetch comic volumes, chapters and pages resources. It also allows to create or delete a chapter and handles user login.

### Future functionality
Features that are planned to be added in the future:
- regular (non-admin) account creation
- volume creation and deletion
- page creation and deletion

## Dependencies
This project uses:
- [expressjs](https://github.com/expressjs/express) - the server
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - for generating JSON Web Tokens used in authentication
- [mongoose](https://github.com/Automattic/mongoose) - for object-document mapping
- bcrypt-nodejs - implementation of bcrypt algorithm to hash users' passwords
- [shortid](https://github.com/dylang/shortid) - for generating url-friendly unique ids

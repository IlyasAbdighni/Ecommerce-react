# Online Shop

## The system already has an admin.

    email: admin@admin.com

    pw: adminadmin

## Links

Github Repo: https://github.com/IlyasAbdighni/Ecommerce-react

WebSite hosted at Heroku: https://webprogramming-react.herokuapp.com/

Document: https://github.com/IlyasAbdighni/Ecommerce-react/blob/master/Documentation.pdf

Youtube video: https://youtu.be/pmmPtAxCxsY

## Achieved points:

1.  Users can register;
2.  Users can Login;
3.  The system has an admin who can add products;
4.  Every user can view his/her own profile;
5.  Every user has a encrypted password;
6.  Instant search;
7.  Server can perform authentication
8.  Server can perform authorization, server will identify users by their role. Regular user role is 'Customer', admin user role is 'Admin';
9.  Admin can see active users list;
10. Simple notification was added;

## Getting Started

These instructions will get you start this project locally.

### Prerequisites

First you have to have Node, npm or yarn installed on your computer.

### Installing


In this application I have package.json. One for the nodejs server, the other one for the client. Client was created using "create-react-app"; But either in these folders, you can install packages in the same way as follows:

```
npm run install
```

Or

```
yarn install
```

## Running the server

"yarn dev" will start a development server. If you change any server file, the server will automatically restart.
```
yarn dev
```

or

```
yarn start
```

## Running the client

cd into client, and

```
yarn start
```

This will start the webpack dev server which will serve the client UI.

### How it works

The server doesn't know about the client. In the future if we want to build an app for this system. We don't have to worry about the API, because it is there already.

In 'api' folder, you can see the api for admin, user, product.


## Deployment

I used heroku to depley the app. Following command will deploy the web app on heroku.

```
git push heroku master
```

## Built With

* [Node](https://nodejs.org/en/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [NPM](https://www.npmjs.com/) - npm is the package manager for JavaScript
* [Yarn](https://yarnpkg.com/lang/en/) - Fast, reliable, and secure dependency management.
* [Express JS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [MongoDB](https://docs.mongodb.com/) - MongoDB is a free and open-source cross-platform document-oriented NoSQL database program.
* [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Optimized bcrypt in plain JavaScript with zero dependencies.
* [Mongoose](http://mongoosejs.com/) - Mongoose is elegant mongodb object modeling for node.js.
* [JsonWebToken](https://jwt.io/) - JSON Web Tokens are an open, industry standard method for representing claims securely between two parties.
* [React JS](https://reactjs.org/) - It is a JavaScript library for building user interfaces.
* [React Router Dom](https://reacttraining.com/react-router/web/example/basic) - Dynamic routing React js.
* [Redux](https://redux.js.org/) - Redux is a predictable state container for JavaScript apps.
* [React-toastify](https://github.com/fkhadra/react-toastify) - React notification made easy.

## Authors

* **Yiliyasi Aboduaini** - *Initial work* - [IlyasAbdighni](https://github.com/IlyasAbdighni/Ecommerce-react)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

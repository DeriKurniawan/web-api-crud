var mongoose = require( 'mongoose' );
var mongoDB = 'mongodb://localhost/web-api-express';


// Create the database connection
mongoose.connect(mongoDB);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + mongoDB);
});

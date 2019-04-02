/* below is new addition from junwei */
const express = require('express');
const mysql = require('mysql');
var https = require('https');


const mysql_config = {
      host: '18.144.46.90',
      user: 'team11',
      password: 'csc648Team11@',
      port: 3306,
      database: 'team11db',
    };

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
/* above is new addition from junwei */

/* const express = require('express'); */

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');

/* Debug is used for printing message on cosole in different categories.
Run "DEBUG=* node app.js" to get all message or run "DEBUG=app node app.js"
to get messages for this file only. */
const debug = require('debug')('app');

/* Morgan is used for logging http request in the console */
const morgan = require('morgan');

app.use(morgan('tiny'));

/* allows to call static items in public folder such as images */
app.use(express.static('./public'));

const aboutRouter = require('./src/routes/aboutRoutes');
const mysqlRouter = require('./src/routes/mysqlRoutes');
const listingRoutes = require('./src/routes/listingRoutes');

app.use('/about/', aboutRouter);
app.use('/mysql/', mysqlRouter);
app.use('/listing/', listingRoutes);

global.DATABASE = new Database(mysql_config);//global database reference

// app.get('/', (req, res) => {
//   database = new Database(mysql_config);
//   database.query('SELECT title, price, address FROM listings', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The address is: ', results[0].address);
//     console.log('The address is: ', results[1].address);
//     console.log('The length: ', results.length);
//     var length = results.length;
//   });
//   const something = "helloworld";
//   res.render('index', {something : something});
// });
app.get('/', (req, res) => {
    res.redirect('/listing/');
    //res.render('listing/index');
});

app.listen(80, function() {
  debug('listening on port 80');
});

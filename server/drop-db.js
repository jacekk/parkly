const MongoClient = require('mongodb').MongoClient;
const { dbDropLogger } = require('./utils/loggers');

// Connection URL
const mongodbUrl = 'mongodb://localhost:27017/parkly';

MongoClient.connect(mongodbUrl, function(connectErr, db) {
    if (connectErr) {
        console.error('Migration status: HE DED', connectErr);
        dbDropLogger.error('DB connection error');
        process.exit(1);
    }

    Promise.all([
        db
            .collection('parkingLocations')
            .drop()
            .then(d => {
                console.log('parkingLocations', d);
                dbDropLogger.info('parkingLocations dropped');
            }),
        db
            .collection('parkingEntries')
            .drop()
            .then(d => {
                console.log('parkingEntries', d);
                dbDropLogger.info('parkingEntries dropped');
            }),
    ])
        .then(() => {
            console.log('Migration status: ITS FINE BOI');
            dbDropLogger.info('Migration status: ITS FINE BOI');
            process.exit(0);
        })
        .catch(promiseErr => {
            console.error('Migration status: KAPUT', promiseErr);
            dbDropLogger.error('Migration status: KAPUT');
            process.exit(1);
        });
});

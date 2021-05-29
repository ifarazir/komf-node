const mongoose = require('mongoose');
const Promise = require('bluebird');

const mongoDBConnection = async () => {
    Promise.promisifyAll(mongoose);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('debug', process.env.NODE_ENV === "development" ? true : false);
    return mongoose
        .connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`, {
            useNewUrlParser: true
        });
};

module.exports = {
    mongoDBConnection
};

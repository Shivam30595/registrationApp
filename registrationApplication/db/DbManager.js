// let db = require("mongodb");
let mongoClient = require("mongodb").MongoClient;
let configProperties = require("./config.json");
let connection;
let dbConnection;

async function getMongoConnection() {

    let uri = configProperties.dbUrl;
    let client = new mongoClient(uri, { useUnifiedTopology: true });
    connection = connection ? connection : await client.connect();
    return connection;
}

let getDbConnection = async function () {
    connection = connection ? connection : await getMongoConnection();
    dbConnection = dbConnection ? dbConnection : connection.db(configProperties.dbName);
    return dbConnection;
};

module.exports.getDbConnection = getDbConnection;

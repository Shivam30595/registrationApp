let getDbConnection = require("../db/DbManager");
const collection_name = "attendance";
let sendEmail = require('../server/gmail/sendEmail')

module.exports = (router) => {
    router.post("/registerUser", async (req, res) => {
        try {
            let data = {
                "name": req.body.userName,
                "email": req.body.email,
                "phone": req.body.phoneNumber,
                "age": req.body.age,
                "dob": req.body.dob,
                "gender": req.body.gender
            }
            const dbConnection =  await getDbConnection.getDbConnection();
            let insertedData = await dbConnection.collection(collection_name).insertOne(data);
            sendEmail.sendMail();
            return res.status(200).json(insertedData);
        } catch(e) {
            return res.status(500).json(e)
        }
    });
    router.get("/allUser", async (req, res) => {
        const dbConnection =  await getDbConnection.getDbConnection();
        dbConnection.collection(collection_name).find({})
            .toArray()
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {return res.status(500).json(error)});

    });
    router.get("/checkEmail", async (req, res) => {
        const dbConnection =  await getDbConnection.getDbConnection();
        dbConnection.collection(collection_name).find({
            $or: [
            {email : req.query.email},
            {phone : req.query.phone}
            ]
        })
            .toArray()
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch((error) => {return res.status(500).json(error)});

    });
    return router;
};

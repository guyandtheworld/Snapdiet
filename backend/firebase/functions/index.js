const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.getData = functions.https.onRequest((req, res) => {
    return admin.database().ref('/data').once('value',(snapshot) => {
        res.send(
            JSON.stringify(snapshot.val())
        );
    })
});

exports.addData = functions.https.onRequest((req, res) => {
    const data = req.body.data;
    return admin.database().ref('/').child("data").set(data).then((snapshot) => {
        return res.redirect(303, snapshot.ref);
    });
});

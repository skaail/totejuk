const express = require('express');
const app = express();
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const path = require('path')

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

var admin = require("firebase-admin");


admin.initializeApp({
    credential: admin.credential.cert(require('./key/admin.json')),
  databaseURL: "https://porn-roll-default-rtdb.firebaseio.com"
});

const db = getFirestore();

app.get("/", async (req, res)=> {
    try{
        const videoRef = db.collection("musicas")
        const response = await videoRef.get()
        let responseArr = []
        response.forEach(doc => {
            responseArr.push({...doc.data(), id: doc.id})
        })
        res.render('index', {data: responseArr})
    }catch(err){
        res.send(err)
    }
})

app.get("/update/:id", async (req, res)=> {
    try{
        db.collection("musicas").doc(req.params.id).update({Qtd: admin.firestore.FieldValue.increment(1)});
        res.json(responseArr)
    }catch(err){
        res.send(err)
    }
})

app.listen(5000, () => {console.log("Express server listening on port 5000")});
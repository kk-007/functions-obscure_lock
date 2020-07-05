const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
var request = require('request');
admin.initializeApp();

app.get('/getStatus', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        let locker_id = req.query.id;
        const db = admin.firestore();
        let locker = db.collection('locker').doc(locker_id).get();
        let doc = await locker;
        let obj = doc.data();
        res.send(obj);
    }
});

app.get('/getData', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        const db = admin.firestore();
        let res_data=[];
        let querySnapshot = await db.collection("block_data").get()
        querySnapshot.forEach(function(doc) {
            //console.log(doc.id, " => ", doc.data());
            res_data.push(doc.data());
        });
        res.send(res_data);
    }
});


app.get('/logInCheck', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        let id = req.query.uid;
        let pass = req.query.upass;
        const db = admin.firestore();
        let locker = db.collection('user').doc(id).get();
        let doc = await locker;
        let obj = doc.data();
        if(obj && obj.pass === pass){
            res.send(true);    
        }
        res.send(false);
    }
});

app.get('/lalaWeight', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        let locker_id =  req.query.id;
        const db = admin.firestore();
        let locker = db.collection('locker').doc(locker_id).get();
        let doc = await locker;
        let obj = doc.data();
        res.send(obj.lala);
    }
});

app.get('/getPass', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        let locker_id = req.query.id;
        const db = admin.firestore();
        let locker = db.collection('locker').doc(locker_id).get();
        let doc = await locker;
        let obj = doc.data();
        res.send(String(obj.pass));
    }
});

app.get('/getFlag', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        let locker_id = req.query.id;
        const db = admin.firestore();
        let locker = db.collection('locker').doc(locker_id).get();
        let doc = await locker;
        let obj = doc.data();
        res.send(String(obj.status));
    }
});

app.get('/openLocker', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        let locker_id = req.query.id;
        let user_id = req.query.u_id;
        user_id = "Temp User";
        const db = admin.firestore();
        let ref = db.collection('locker').doc(locker_id);
        let _data = await ref.get();
        let data = _data.data();
        data.status = true;
        data.user_id=user_id;
        console.log(data);
        await ref.set(data);
        res.send("DONE");
    }
});

app.get('/closeLocker', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        let locker_id = req.query.id;
        let user_id = req.query.u_id;
        user_id = "Temp User";
        const db = admin.firestore();
        let ref = db.collection('locker').doc(locker_id);
        let _data = await ref.get();
        let data = _data.data();
        data.status = false;
        data.user_id=user_id;
        console.log(data);
        await ref.set(data);
        res.send("DONE");
    }
});


app.get('/doTransaction', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        let locker_id = req.query.id;
        let user_id = req.query.u_id;
        let status = req.query.status;
        let weight = req.query.weight;

        // user_id = "Temp User"
        let data = {
            locker_id:locker_id,
            status:status,
            timestemp: new Date().getTime(),
            user_id: user_id,
            weight : weight
        };
        console.log(data);
        const db = admin.firestore();
        let locker = db.collection('block_data').add(data);
        let doc = await locker;
        //block-chain
        let locker_info = db.collection('block_chain').doc("obscure_lock").get();
        let doc_data = await locker_info;
        let obj = doc_data.data();
        if(obj.available){
            //let blockchain_url = obj.url+'/storeData?d='+data;
            var options = {
                'url': obj.url+"/setData",
                json:true,
                method:'GET',
                qs:data
            };
            let block_chain_req =  new Promise(function (resolve, reject) {
                request(options, function (err, resp) {
                   if (err) {
                      //console.log(err);
                      reject({err: err});
                   }
                    else resolve(resp);
                });
             });
             try{
                let res_b_c = await block_chain_req;
                res.send("DONE");
             }catch(err){
                 res.send(err);
             }
        }
    }
});

app.get('/testApi', async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        let locker_id = req.query.locker_id;
        let user_id = req.query.user_id;
        let status = req.query.status;
        let weight = req.query.weight;
        let data = {
            locker_id:locker_id,
            status:status,
            timestemp: new Date().getTime(),
            user_id: user_id,
            weight : weight
        };
        const db = admin.firestore();
        let locker_info = db.collection('block_chain').doc("obscure_lock").get();
        let doc_data = await locker_info;
        let obj = doc_data.data();
        if(obj.available){
            //let blockchain_url = obj.url+'/storeData?d='+data;
            var options = {
                'url': obj.url+'/setData',
                json:true,
                method:'GET',
                qs:data
            };
            let block_chain_req =  new Promise(function (resolve, reject) {
                request(options, function (err, resp) {
                   if (err) {
                      //console.log(err);
                      reject({err: err});
                   }
                    else resolve(resp);
                });
             });
             try{
                let res_b_c = await block_chain_req;
                res.send("DONE");
             }catch(err){
                 res.send(err);
             }
        }
    }
});

exports.API = functions.https.onRequest(app);

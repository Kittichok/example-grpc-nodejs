
const express = require('express')
const app = express()
const path = require('path');
app.use('/static', express.static(__dirname+'/static'))
var mess = 'Hello World!';
console.log(path.join(__dirname));
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))


app.get('/api', (req, res) => {
    res.send(get_grpc())
})

app.listen(80, () => console.log('Example app listening on port 80!'))

function get_grpc(){
    const grpc = require('grpc')
    const PROTO_PATH = './api.proto'
    const ApiService = grpc.load(PROTO_PATH).ApiService
    const client = new ApiService('127.0.0.1:50051',
    grpc.credentials.createInsecure())
    var mess;
    await client.test({}, (err, res) => {
        if (!err) {
            console.log(res);
            console.log('successfully fetch list mock data')
            mess = res;
        } else {
            mess = err;
        }
    })
    console.log(mess)
    return mess;
}


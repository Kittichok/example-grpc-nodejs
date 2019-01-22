
function get_grpc(){
    const grpc = require('grpc')
    const PROTO_PATH = './api.proto'
    const ApiService = grpc.load(PROTO_PATH).ApiService
    const client = new ApiService('127.0.0.1:50051',
    grpc.credentials.createInsecure())
    var mess;
    client.test({}, (err, res) => {
        console.log('test')
        if (!err) {
            console.log('successfully fetch list mock data')
            console.log(res)
            mess = res;
        } else {
            console.error(err)
        }
    })
    return mess
}

// get_grpc();
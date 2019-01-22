const grpc = require('grpc')
const notesProto = grpc.load('api.proto')
const server = new grpc.Server()
var mock_data = [
    { id: '1', name: 'name 1', message: 'mess 1'},
    { id: '2', name: 'name 2'},
    {message: 'mess 3'}
]

server.addService(notesProto.ApiService.service, {
    test: (_, callback) => {
        console.log('service calling');
        callback(null, mock_data)
    },
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()
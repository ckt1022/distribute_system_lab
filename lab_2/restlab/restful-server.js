const server = require('fastify')();

let john = {
    name: "john",
    age: 18,
    attack: 100,
    defense: 100
};

let tom = {
    name: "tom",
    age: 19,
    attack: 105,
    defense: 90
};

let hogRiders = [john, tom];

server.get('/hogRider', function (req, res) {
    //console.log(req.hostname,req.body)
    //console.log(res)
    return hogRiders;
});

server.get('/hogRider/:name', function (req, res) {
    // 請依Lab說明寫作
    // 使用req.params.name可以取得:name的內容
    let result = hogRiders.find(element => element.name == req.params.name);

    if (result != undefined){
        return result;
    }else{
        return {error: "not found"}
    }
});

server.post('/hogRider', function (req, res) {
    // 請依Lab說明寫作
    let newRider = req.body
    hogRiders.push(newRider)
    return {count: hogRiders.length};
});

server.put('/hogRider/:name', function (req, res) {
    // 請依Lab說明寫作
    let put_data = req.body
    let index = hogRiders.findIndex(element => element.name === req.params.name);
    hogRiders[index] = put_data

    return hogRiders[index];
});


//server.listen(3000, "127.0.0.1");

server.listen({ port: 3000, host: '127.0.0.1' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
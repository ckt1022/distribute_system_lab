const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('owl_post.proto', {});
const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;

const client = new owlPostProto.OwlPost('localhost:50051', grpc.credentials.createInsecure());

// 使用 argument 傳入學生姓名
const pickup_code = process.argv[2];

// 查詢信件狀態
client.trackLetter({ pickupCode: pickup_code }, (err, response) => {
    if (!err) {

        // 此部分不用實作
        // 但需要透過觀察此檔案，來完成 proto 檔案中的實作

        console.log(`查詢信件狀態(尾號 ${pickup_code})：${response.status}\n學生: ${response.studentName}\n學院: ${response.house}\n`);

    } else {
        console.error(`查詢信件狀態(尾號 ${pickup_code}) ${err.details}`);
    }
    client.close()
});
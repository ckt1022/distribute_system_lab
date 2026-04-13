const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('owl_post.proto', {});
const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;

const client = new owlPostProto.OwlPost('localhost:50051', grpc.credentials.createInsecure());

// 發送錄取信件並查詢信件狀態
client.sendLetter({ studentName: "Harry Potter" }, (err, response) => {
    if (!err) {
        // 印出寄送結果，格式如下：
        // 霍格華茲錄取通知已寄出！
        // 學生: Harry Potter
        // 學院: 格蘭芬多
        // 追蹤碼: 2896072c-f85f-4f0c-990c-d151b3f3af56-441
        // Hint: response 是從 server 中取得的資料，學生資料皆是來自 server。
        // Hint: 可以使用 response.<變數名稱> 來取得資料，請參考 proto 檔案中的定義。

        // ==== 請完成實作 (以下) ====
        // ex: console.log(`內容`);
        console.log("霍格華茲錄取通知已寄出!")
        console.log("學生: ",response.studentName)
        console.log("學院: ",response.house)
        console.log("追蹤碼: ",response.trackingId)
        // ==== 請完成實作 (以上) ====
    } else {
        console.error(err.details);
    }
    client.close()
});
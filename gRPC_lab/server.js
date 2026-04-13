const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('owl_post.proto', {});
const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
const uuid = require('uuid');

// 預設模擬資料庫
const houses = ["格蘭芬多", "赫夫帕夫", "拉文克勞", "史萊哲林"]; // 學院名稱
const letters = {}; // 用來模擬信件資料庫

// 實作 SendLetter 方法
function sendLetter(call, callback) {
    // 生成隨機的追蹤碼, 附加後三位取貨碼, 例如： 2896072c-f85f-4f0c-990c-d151b3f3af56-441
    const tracking_id = uuid.v4() + "-" + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const house = houses[Math.floor(Math.random() * houses.length)]; // 隨機分配學院
    
    // 印出寄送信件的資訊
    // 格式如下：
    // 寄送信件給 <學生名稱>, 學院：格蘭芬多, 追蹤碼：2896072c-f85f-4f0c-990c-d151b3f3af56-441
    // Hint: <學生名稱> 是從 client 中取得的學生名稱、追蹤碼是 tracking_id。
    // Hint: 可以使用 call.request.<變數名稱> 來取得來自 client 的變數，變數名稱可以參考 proto 檔案中的定義。
    
    // ==== 請完成實作 (以下) ==== 
    const studentName = call.request.studentName
    console.log(`寄送信件給 ${studentName}, 學院:${house}, 追蹤碼:${tracking_id}\n`)
    // ==== 請完成實作 (以上) ==== 

    // 貓頭鷹信件的所有狀態, 一共 10 種狀態
    const letter_status = [
        "正在進行魔法處理", 
        "正在等待鄧不力多的魔法指示", 
        "貓頭鷹迷路了",
        "貓頭鷹正在休息",
        "咆嘯信已送達",
        "信件被迫返回魔法部",
        "信件已被食死徒攔截",
        "信件仍待在隱形信箱中",
        "已送達學院，正在尋找正確的宿舍門牌",
        "已轉交給尼可勒梅的時間轉換器管理員"
    ];

    // 取得信件狀態
    letters[tracking_id] = { 
        student: call.request.studentName, 
        house: house, 
        status: letter_status[tracking_id.slice(-1)],
    };

    // 請參考 trackLetter 的實作，完成 sendLetter 的 callback 實作
    // Hint: 這裡需要回傳學生姓名、學院名稱、追蹤碼
    // Hint: 可以使用 call.request.<變數名稱> 來取得來自 client 的變數，
    // <變數名稱>可以參考 proto 檔案中的定義。

    // ==== 請完成實作 (以下) ====
    
    callback(null,{
        studentName: studentName,
        house: house,
        trackingId: tracking_id
    });
    // ==== 請完成實作 (以上) ==== 
}

// 實作 TrackLetter 方法
function trackLetter(call, callback) {
    const pickup_code = call.request.pickupCode;

    let tracking_id = null;
    // 檢查後三位 取件碼是否和信件中的追蹤碼相同 (無須改動)
    for (let id in letters) {
        if (id.endsWith("-" + pickup_code)) {
            tracking_id = id;
            break;
        }
    }

    if (letters[tracking_id]) {
        console.log(`查詢信件狀態 (尾碼 ${pickup_code}): ${letters[tracking_id].status}`);  
        
        callback(null, { 
            studentName: letters[tracking_id].student,
            house: letters[tracking_id].house,
            status: letters[tracking_id].status 
        });
    } else {
        console.error(`查詢信件狀態 (尾碼 ${pickup_code}): 信件不存在`);

        callback({
            code: grpc.status.NOT_FOUND,
            details: "找不到該信件"
        });
    }
}

// 建立 gRPC 伺服器
const server = new grpc.Server();
server.addService(owlPostProto.OwlPost.service, { sendLetter, trackLetter });

// 綁定端口並啟動伺服器
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log("gRPC 伺服器已啟動，監聽 50051 埠");
    console.log("歡迎使用貓頭鷹郵件服務！\n");
    console.log("寄送信件，請輸入指令： node client.js");
    console.log("查詢信件狀態，請輸入指令： node track.js <編號末三碼>");
    server.start();
});

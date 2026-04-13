1.B
2.A
3.const owlPostProto = grpc.loadPackageDefinition(packageDefinition).owlpost;
4.string代表的是傳送資料的型別，後面接的數字代表該參數欄位編號，用來序列化的識別
5.查詢信件狀態(尾號 XXX) 找不到該信件
6.會回傳 "咆嘯信已送達" 因為10種狀態的決定是靠尾數 --> status: letter_status[tracking_id.slice(-1)]
7.把名稱用底線命名，會造成回傳變成undefine
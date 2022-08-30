const express = require('express')
const app = express()
const port = 3002
const request = require('request');

app.use(express.json());

app.get('/', (req, res) => {
  res.send("3002 domain")
})


app.get('/student', (req, res) => {
    
    // 요청을 보내는 모듈
  request.get({
    // 가져온 데이터를 어떻게 읽을건지 정의
    // 텍스트의 경우 :: application/text
    header: {'content-type':'application/json'},
    // 가져올 데이터의 주소
    url: 'http://127.0.0.1:3001/student',
    // body: "",
    json : true  
  },function(error,response,body){
    console.log('hello nodejs');
    console.log(body);
    // body에 뿌린다
    res.send(body);
    // console.log(body.name);
    // console.log(body.message);
    // res.body("Data - received");
  })
});



app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});
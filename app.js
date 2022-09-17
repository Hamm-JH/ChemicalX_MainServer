const express = require('express')
const app = express()
const port = 3002
const request = require('request');

var data1 = {
  "Meditation" : 0,
  "Attention" : 0,
  "EEG" : {
    "delta" : 0,
    "theta" : 0,
    "lowAlpha" : 0,
    "highAlpha" : 0,
    "lowBeta" : 0,
    "highBeta" : 0,
    "lowGamma" : 0,
    "midGamma" : 0,
  },
  "PoorSignal": 0,
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send("3002 domain")
})

app.get('/CON', (req, res) => {
  res.statusCode = 200;
  res.send('hello');
})

app.get('/BCI', (req, res) => {
  
  // console.log(req.body);
  // console.log('ip : ', req.ip);
  // console.log()

  var lastIP = req.ip.split('.')[req.ip.split('.').length - 1];

  // console.log('last ip num:: ', lastIP);

  GetParam(JSON.stringify(req.body))

  if (lastIP == 21) {
    // console.log('hello ', lastIP)
  }

  res.statusCode = 200;
  res.send();
});

app.get('/test', (req, res) => {
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
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});

function GetParam(str = "", ipNum = 0) {
  // console.log(str);
  // str = str.allReplace({"{": "", '"': "", "}": ""})
  str = str.replaceAll('"', '');
  str = str.replaceAll('{', '');
  str = str.replaceAll('}', '');
  
  // console.log(str);

  const splits = str.split(':');
  
  if (splits[0] == 'Meditation') {
    // console.log(str);
    // console.log(splits[0]);
    // console.log(splits[1]);
    // console.log(splits[2]);

    // console.log(Number(splits[2]));
    data1["Meditation"] = Number(splits[2]);
    // console.log('data1["Meditation"] : ', data1["Meditation"]);
  }
  else if (splits[0] == 'Attention') {
    // console.log('Attention');

    // console.log(splits[0]);
    // console.log(splits[1]);
    // console.log(splits[2]);
    data1["Attention"] = Number(splits[2]);
    // console.log('data1["Attention"] : ', data1["Attention"])
  }
  else if (splits[0] == 'EEG') {
    // console.log('EEG');
    str = str.replaceAll("\\n", ":")
    // console.log(str);
    // splits = str.split(':');
    
    const _splits = str.split(':');
    data1["EEG"]["delta"] = Number(_splits[4]);
    data1["EEG"]["theta"] = Number(_splits[6]);

    data1["EEG"]["lowAlpha"] = Number(_splits[8]);
    data1["EEG"]["highAlpha"] = Number(_splits[10]);

    data1["EEG"]["lowBeta"] = Number(_splits[12]);
    data1["EEG"]["highBeta"] = Number(_splits[14]);
    
    data1["EEG"]["lowGamma"] = Number(_splits[16]);
    data1["EEG"]["midGamma"] = Number(_splits[18]);

    // console.log(data1);
    // console.log();
    // console.log(_splits[0]);  // EEG
    // console.log(_splits[1]); // EEG Powers
    // console.log(_splits[2]); // 
    // console.log(_splits[3]); // delta
    // console.log(_splits[4]); // (delta 값)

    // console.log(_splits[5]); // theta
    // console.log(_splits[6]); // (theta 값)

    // console.log(_splits[7]); // lowAlpha
    // console.log(_splits[8]); // (lowAlpha 값)

    // console.log(_splits[9]); // highAlpha
    // console.log(_splits[10]); // (highAlpha 값)

    // console.log(_splits[11]); // lowBeta
    // console.log(_splits[12]); // (lowBeta 값)

    // console.log(_splits[13]); // highBeta
    // console.log(_splits[14]); // (highBeta 값)

    // console.log(_splits[15]); // lowGamma
    // console.log(_splits[16]); // (lowGamma 값)

    // console.log(_splits[17]); // midGamma
    // console.log(_splits[18]); // (midGamma 값)
    // console.log(_splits[19]); // 
  }
  else if (splits[0] == 'PoorSignal') {
    // console.log('PoorSignal');
    // console.log(splits[0]);
    // console.log(splits[1]);
    // console.log(splits[2]);
    
    const _splits = splits[2].split(' ');
    // console.log(_splits);
    data1["PoorSignal"] = Number(_splits[1]);
    // console.log(data1.PoorSignal);
  }
  

}
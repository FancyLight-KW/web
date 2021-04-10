# Server for sw project

## 0. version

- node: node 14.15
- express: 4.16.1

## 1. install

```
npm install
```

## 2. API Usage

### 2.1 index
*  요청 갯수 가져오기
```HTTP
GET /api/csrstatus

{
    "접수대기" : 2,
    "접수완료" : 1,
    "요청처리중" : 1,
    "처리지연중" : 2
}
```



### 2.2 auth
* 회원가입
```
POST api/register

{
    "registerSuccess": true,
    "resultCode": 0
}
```

* 로그인
```
POST api/login

{
    "token": "abcd...",
    "resultCode": 0
}
```

### 2.4 
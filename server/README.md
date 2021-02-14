# Server for sw project

## 0. version
* node: node 14.15
* express: 4.16.1
## 0. install

## 1. 접속방법
* http://3.34.2.162:5000/

## 2. REST
## 2-1. user table에서 사용자정보 CRUD
* /users/ : GET 모든 사용자 정보 가져옴.
* /users/ : POST 새로운 사용자 정보 입력. json 형식으로 입력  ex) ```{
    User_ID: "사용자 아이디",
    User_Password: "사용자 비밀번호",
    User_Name: "사용자 이름",
    User_Birth: "생년월일",
    User_Phone: "전화번호"
    }```

* /users/:userIndex : GET 유저key로 정보 가져옴
* /users/:userIndex : PUT 유저key로 정보 가져와 업데이트 (수정필요)
* /users/:userIndex : DELETE 유저key에 해당하는 정보 삭제
* /users/: DELETE 전체 삭제

# 시나리오관리 페이지 API 
#### `/scenario` 다음에 아래 url로 이동

## 1. 인텐트 관리

### 1.1 CREATE
```HTTP
POST /intents
```
* body: `{INTENT_TITLE: 인텐트 제목}`<br>
* return: `{resultCode, message}`

### 1.2 READ
```HTTP
GET /intents?id={인텐트번호}&title={인텐트제목}
```
* intents 정보 가져옴 query string은 필수X 필요한것만
* return: json

### 1.3 UPDATE
```http
PUT /intents/{인텐트 번호} 
```  
* body: `{INTENT_TITLE: 수정할 제목}`
* return: `{resultCode, message}`
### 1.4 DELETE
```http
POST /intents/{인텐트번호}
```
* return: `{resultCode, message}`

<br>

## 2. 구문

### 2.1 CREATE
```http
POST /phrases
```
* body: `{  PHRASES_INTENT_ID: 인텐트id, PHRASE: 구문 }`
새 구문 생성
* return: `{resultCode, message}`

## 2.2 READ
```http
GET /phrases?id={구문번호}&rid={인텐트번호}&phrase={구문}
```
* Phrases 정보 가져옴 query string은 필수X 필요한것만
* return: `json`

## 2.3 UPDATE
* 구문 수정, body도 필요한 정보만 넣어서
```http
PUT /phrases/{구문 번호}
```
* body: `{  PHRASES_INTENT_ID: 인텐트id, PHRASE: 구문 }`
* return: `{resultCode, message}`

## 2.4 DELETE
```http
POST /phrases/{구문번호}
```
* return: `{resultCode, message}`

## 3. 대답

### 3.1 CREATE
```http
POST /responses
```
* body: `{  RESPONSES_INTENT_ID: 인텐트id, RESPONSE: 대답문 }`
* return: {resultCode, message}

### 3.2 READ
```http
GET /responses?id={대답번호}&rid={인텐트번호}&response={대답}
```
* Responses 정보 가져옴 query string은 필수X 필요한것만
* return: `json`

### 3.3 UPDATE
```http
PUT /responses/{대답 번호}
```    
* body: `{  RESPONSES_INTENT_ID: 인텐트id, RESPONSE: 구문 }`
* 대답 수정, body도 필요한 정보만 넣어서
* return: `{resultCode, message}`


### 3.4 DELETE
```http
POST /responses/{대답번호}
```

* return: `{resultCode, message}`
# 투두리스트 - Server

## 🔖 프로젝트 정보

> 투두리스트 어플리케이션을 개발하기 위한 REST API 서버

- 프로젝트명 : 투두리스트(서버)
- 개발 기간 : 2023년 9월 21일 ~ 2023년 10월 3일 (2주)
- 분류 : 개인 프로젝트

<!-- ## 배포 주소 -->

## 📝 프로젝트 소개

프로젝트 목표

- 프리온보딩 인턴쉽을 진행하며 배운 내용을 토대로 프리온보딩 인턴쉽 지원시 제출했던 투두리스트 사전과제를 리팩토링하여 구현했습니다.
- 이 프로젝트를 통해 프론트엔드 뿐만아니라 데이터베이스 설계 및 서버 개발, 배포까지 경험해보기 위해 직접 REST API 서버를 개발했습니다.

## 💾 프로젝트 실행 방법

### 요구사항

- Node.js 18.16.1
- Npm 9.5.1
- Redis
- PostgreSQL

로컬 환경에 Redis, PostgreSQL이 설치 및 실행되어 있어야 합니다.

### .env example

```
POST=8081
SECRET_KEY=key
ACCESS_SECRET=key
REFRESH_SECRET=key
SEQUELIZE_PASSWORD=[YOUR_SEQUELIZE_PASSWORD]
```

### 설치 및 실행

```
$ git clone https://github.com/angielxx/todo-server.git
$ cd todo-server
$ npm install
$ npm start
```

## ⚒️ 사용한 기술 스택

### Development

<img src="https://shields.io/badge/Express-000000?logo=Express&logoColor=FFF&style=flat-square"/> <img src="https://shields.io/badge/Typescript-3178C6?logo=Typescript&logoColor=FFF&style=flat-square"/> <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=sequelize&logoColor=white"/> <img src="https://img.shields.io/badge/Passport-34E27A?style=flat-square&logo=Passport&logoColor=white"/> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white"/> <img src="https://img.shields.io/badge/redis-DC382D?style=flat-square&logo=redis&logoColor=white"/> <img src="https://img.shields.io/badge/jsonwebtokens-000000?style=flat-square&logo=jsonwebtokens&logoColor=white"/>

### Deployment

<img src="https://shields.io/badge/amazonec2-FF9900?logo=amazonec2&logoColor=FFF&style=flat-square"/> <img src="https://shields.io/badge/nginx-009639?logo=nginx&logoColor=FFF&style=flat-square"/> <img src="https://shields.io/badge/pm2-2B037A?logo=pm2&logoColor=FFF&style=flat-square"/>

## 📦 디렉터리 구조

```
📦todo-server
 ┣ 📂config
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜passport.ts
 ┣ 📂controllers
 ┃ ┣ 📜auth.ts
 ┃ ┣ 📜category.ts
 ┃ ┗ 📜todo.ts
 ┣ 📂models
 ┃ ┣ 📜categories.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜taskCategories.ts
 ┃ ┣ 📜todos.ts
 ┃ ┗ 📜users.ts
 ┣ 📂routes
 ┃ ┣ 📜authRouter.ts
 ┃ ┣ 📜categoryRouter.ts
 ┃ ┗ 📜todoRouter.ts
 ┣ 📂types
 ┃ ┗ 📜index.d.ts
 ┣ 📜README.md
 ┣ 📜app.ts
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```

## 🗄️ ERD

![Todo](https://github.com/angielxx/todo-server/assets/103434451/bd8b0bac-6438-4fe2-bf6f-aca3050bae07)

## 📌 주요 기능

### Auth

- 회원가입
- 로그인
- 로그아웃

### Todo

- 할 일 생성
- 날짜에 따라 할 일 조회
- 할 일 수정
- 할 일 삭제

### Category

추가 기능으로 개발 예정

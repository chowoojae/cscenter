# 고객 문의 접수 및 답변 기능 개발

## 프로젝트 구성

#### - backend

* IDE : Spring Tool Suite 4 (Version: 4.10.0.RELEASE)
* Java : openjdk-1.8.0.282-1.b08 / Spring Boot / Spring Data JPA / Lombok
* build : gradle-6.8.3
* DataBase : H2

```
├── backend                                   - BE 어플리케이션 폴더
│   ├── src/main/java                      
│   │   └── com.cscenter.board              
│   │   │   ├── BoardApplication.java         - Spring Boot Run
│   │   │   └── Result.java                   - API 처리 결과     
│   │   ├── com.cscenter.board.controller     - 컨트롤러
│   │   │   └── BoardController.java          - API url
│   │   ├── com.cscenter.board.entity         - Jpa Entity
│   │   │   ├── AnswerUser.java               - 상담사 관리 table
│   │   │   └── QuestionAnswer.java           - 고객문의및상담사답변 관리 table
│   │   ├── com.cscenter.board.repository     - JpaRepository
│   │   │   ├── AnswerUserRepository.java     - 상담사 관리 
│   │   │   └── QuestionAnswerRepository.java - 고객문의및상담사답변 관리
│   │   └── com.cscenter.board.service        - 서비스
│   │       ├── AnswerService.java            - 상담사 답변 관리 서비스
│   │       ├── AnswerUserService.java        - 상담사 관리 서비스 
│   │       └── QuestionService.java          - 고객문의 관리 서비스
│   ├── src/main/resources                  
│   │   └── application.yml                 - 어플리케이션 설정
│   └── gradle                              - gradle
├── build.gradle                            - gradle build 설정
├── gradlew                                 
├── gradlew.bat                             
├── HELP.md                                 
└── settings.gradle                         - gradle 
```

#### - frontend

* IDE : VSCode-win32-x64-1.55.2
* build : node-v14.16.1
* ReactJS

```
├── frontend                                  - FE 어플리케이션 폴더
│   ├── src                      
│   │   ├── components                        
│   │   │   ├── CreateQuestionComponent.jsx   - 문의 작성 화면
│   │   │   ├── FooterComponent.jsx           - Footer
│   │   │   ├── HeaderComponent.jsx           - Header
│   │   │   ├── ListAnswerComponent.jsx       - 상담사 미답변 문의 목록 화면
│   │   │   ├── ListQuestionComponent.jsx     - 고객 문의 목록 화면
│   │   │   ├── LoginAnswerUserComponent.jsx  - 상담사 로그인 화면
│   │   │   ├── ReadAnswerComponent.jsx       - 고객문의 상세 및 답변 등록 화면
│   │   │   ├── ReadQuestionComponent.jsx     - 고객문의 상세 화면
│   │   │   └── SignupAnswerUserComponent.jsx - 상담사 등록 화면
│   │   └── service                         
│   │       ├── AnswerService.js              - 상담사 관련 API 호출
│   │       └── QuestionService.js            - 고객 관련 API 호출
│   ├── App.css                               - css
│   └── App.js                                - 페이지구성
├── package.json                              - npm 설정
├── package-lock.json                                 
└── README.md                          
```

## 실행 방법

#### - backend

* IDE 에서 backend project 불러온 후 BoardApplication.java 에서 오른쪽 마우스 클릭 Run As Spring Boot App 실행
* http://localhost:8080 으로 서비스가 동작되고 있고, backend 만 동작되는지 확인은 http://localhost:8080/api/first 로 접속해서 확인

#### - frontend

* npm start
* http://localhost:3000

## 문제 해결 전략

#### - backend

1. 로그인 구현 시 spring-security 와 JWT를 이용하려 했으나 시간 관계상 FE 에서 관리하도록 처리
2. 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS) 해결을 위해 컨트롤러에 @CrossOrigin(origins = "http://localhost:3000") 추가함

#### - frontend

1. 세션 관리를 FE에서 하게끔 되어 있어서 브라우저를 닫거나 로그아웃을 하지 않는한 세션이 유지됨
2. 체크박스 처리 구현을 위해 backend entity 에 DB 미사용 변수를 선언하여 처리함
3. polling 기능을 위해 setInterval 관련 reference 찾는 시간이 오래 걸림
4. 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS) 해결을 위해 package.json 에 "proxy": "http://localhost:8080" 추가함

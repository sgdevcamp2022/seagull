# **EGuBa(이거봐)**

## 🔎 프로젝트 개요
#### 친구들과 함께 하는 영상 공유 플랫폼
> ***기획 배경***<br>
> 기존의 회의 플랫폼과는 다르게 친구들과 함께 영화, 드라마 등 영상을 함께보고 채팅도 하면서 여가 시간을 보낼 수 있는 가상 공간을 제공하고자 플랫폼을 만들었습니다.<br/>
​
##  🙋🏻 팀원 소개
| 이름  | 개인 깃허브                                        | 담당 역할 및 기능                                                     |
|-----|-----------------------------------------------|----------------------------------------------------------------|
| 박성준 | [@tjdwns4537 ](https://github.com/tjdwns4537) | <img src="https://img.shields.io/badge/-BE-red">  채팅 시스템, 실시간 웹소켓 구현, 메인서버 관리, Redis Repository 구성, 비디오 방 비지니스 로직 구현   |
| 박정원 | [@jjjjjeongwon](https://github.com/jjjjjeongwon)    | <img src="https://img.shields.io/badge/-FE-blue"> 프론트 전체  |
| 이효승 | [@hoos007](https://github.com/hoos007)        | <img src="https://img.shields.io/badge/-BE-red"> 영상 공유 시스템 담당                                              |
| 이범수 | [@dldks321](https://github.com/dldks321)        | <img src="https://img.shields.io/badge/-BE-red"> 유저 시스템 담당                                                 |
<br/>

## **📚 Teck Stack & Tools**
### FRONTEND
<div align=center>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src ="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-badge&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?&style=for-the-badge&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/styled%20components-DB7093.svg?&style=for-the-badge&logo=styled%20components&logoColor=white"/>
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?&style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>
</div>
​

### BACKEND
#### 채팅시스템, 영상공유시스템
![Java](https://img.shields.io/badge/java11-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)
<img src="https://img.shields.io/badge/SpringBoot2.7.8-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
![](https://img.shields.io/badge/IntelliJ%20IDEA-000000.svg?&style=for-the-badge&logo=IntelliJ%20IDEA&logoColor=white)
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
​

#### 유저시스템
<div align=center>
<img src="https://img.shields.io/badge/Json Web Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white">
  <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
  <img src="https://img.shields.io/badge/PyCharm-000000?style=for-the-badge&logo=PyCharm&logoColor=white">
</div>
​

## ✔️ Architecture
<img width="929" alt="스크린샷 2023-02-21 오후 11 53 30" src="https://user-images.githubusercontent.com/63576379/220378703-c87866f6-9d26-44d0-aaeb-44cbf3f37272.png">
<img width="929" alt="스크린샷 2023-02-21 오후 11 54 13" src="https://user-images.githubusercontent.com/63576379/220378845-d0ab3cc5-5c66-4de3-9f89-96503785f66c.png">
​

## 🛠 주요 기능
#### - 링크가 공유된 유저들 간에 영상을 함께 보는 기능    
#### - 함께 영상을 보면서 채팅하는 기능<br/>
​
## 🛠 작업 내역
​
### BE - 박성준
- ec2 서버 구축 후 카프카 연동: https://github.com/sgdevcamp2022/seagull/wiki/KAFKA-%EC%84%9C%EB%B2%84-%EA%B5%AC%ED%98%84-%EB%B0%8F-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%A0%95%EB%A6%AC
- ec2에 도커 설치: https://github.com/sgdevcamp2022/seagull/wiki/EC2-%EB%8F%84%EC%BB%A4-%EC%84%A4%EC%B9%98
- 도커에 mysql 설치: https://github.com/sgdevcamp2022/seagull/wiki/docker-mysql-%EC%84%A4%EC%B9%98
- 깃 Rebase 컨벤션 작성: https://github.com/sgdevcamp2022/seagull/wiki/rebase-%EB%B0%A9%EB%B2%95
- 실시간 웹소켓을 위한 테스트 페이지 구현
- 방마다 구분된 사용자의 실시간 브로드 캐스팅 구현
- 실시간으로 주고 받는 데이터들을 위한 Redis 환경 및 Redis Repository 구축
- 비디오 공유방 비지니스 로직 구축
- 채팅 시스템을 구축해 메세지를 Stomp와 SockJS로 주고받을 수 있는 환경 구축
- EC2 에 docker-commpose.yml 로 서버를 배포할 수 있게 환경 구성
​
​
​
## 📌 Trouble Shooting
### BE - 박성준
- EC2 접속 에러: https://github.com/sgdevcamp2022/seagull/wiki/EC2-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85
- 배포 서버와 클라이언트 간 CORS 에러: https://github.com/sgdevcamp2022/seagull/wiki/%EC%84%9C%EB%B2%84,-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-CORS-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85
- 방마다 브로드 캐스팅을 다르게 하는 방법:
  - Client에서 들어오는 publish주소에 roomLink를 붙쳐 해당 룸에 대한 접속 유저를 서로 다른 브로드캐스팅을 하게끔 구성
- Redis Null 에러: 
  - findById에서 Redis에 저장된 데이터가 Null이라 생기는 문제
  - RedisTemplate로 레디스를 Set형태로 관리하므로써, 레디스 조회/저장/삭제 기능에서 생기는 에러들을 해결
- Redis 저장 키값이 중복되는 에러:
  - 해당되는 키값이 중복되어 저장됨으로써 데이터가 합쳐지는 에러 발생
  - <RoomLink, HostId>, <RoomLink, VideoUrl>, <RoomLink, Users> 에 대한 각각의 RoomLink에 식별될 수 있는 문자를 넣어 구분해서 해결
- 웹소켓 테스트 환경에 대한 어려움
  - PostMan, Chrome Extension을 활용한 웹소켓 테스트가 어려워 직접 프론트를 구성해 웹소켓 브로드 캐스팅 테스트 진행

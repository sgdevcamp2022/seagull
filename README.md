# **eGuBa(이거봐)**

> [팀 노션 - Notion](https://www.notion.so/devcamp/SeaGull-8e479fa843f64b92aa7bf29b67788a2a)
>
> [Front-End Repo.](https://github.com/sgdevcamp2022/seagull/tree/fe-dev/seagull_frontend)  
> [Back-End Repo.](https://github.com/sgdevcamp2022/seagull/tree/be-dev)  
> [Back-End-Auth Repo.](https://github.com/sgdevcamp2022/seagull/tree/be-auth-dev)

## 🚩 프로젝트 개요

#### 친구들과 함께 하는 영상 공유 플랫폼

> **_기획 배경_**    
> 기존의 회의 플랫폼과는 다르게 친구들과 함께 영화, 드라마 등 영상을 함께보고 채팅도 하면서 여가 시간을 보낼 수 있는 가상 공간을 제공하고자 플랫폼을 만들었습니다.
> ​      

> **_서비스 주요 기능_**    
> ✔️ 링크가 공유된 유저들 간에 영상을 함께 보는 기능   
> ✔️ 함께 영상을 보면서 채팅하는 기능<br/>

## 🚩 프로젝트 기간

> 2023년 2월 2일 ~ 2023년 2월 24일 (약 3주)

## 🚩 팀원 소개

| 이름   | 개인 깃허브                                     | 담당 역할 및 기능                                                                                                                                          |
| ------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 박성준 | [tjdwns4537 ](https://github.com/tjdwns4537)    | <img src="https://img.shields.io/badge/-BE-red"> 채팅 시스템, 실시간 웹소켓 구현, 메인서버 관리, Redis Repository 구성,<br> 영상공유 방 비지니스 로직 구현 |
| 박정원 | [jjjjjeongwon](https://github.com/jjjjjeongwon) | <img src="https://img.shields.io/badge/-FE-blue"> 프론트 전체                                                                                              |
| 이효승 | [hoos007](https://github.com/hoos007)           | <img src="https://img.shields.io/badge/-BE-red"> 영상 공유 시스템 전체, 웹소켓 통신 담당                                                                   |
| 이범수 | [dldks321](https://github.com/dldks321)         | <img src="https://img.shields.io/badge/-BE-red"> 유저 시스템 담당                                                                                          |

<br/>

## 🚩기술스택 및 개발환경

### 📚 Teck Stack & Tools

#### FRONTEND
<div>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/>

![Recoil](https://img.shields.io/badge/Recoil-007af4.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1NS4yMSA2MjMuOTEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDp3aGl0ZX08L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im03NC42MiAyNzcuNDYgMS4yNC0uMTMgMzQuNzgtMy4yOC01My40Ny01OC42NkE5Ni40NyA5Ni40NyAwIDAgMSAzMiAxNTAuM0gzYTEyNS4zIDEyNS4zIDAgMCAwIDMyLjggODQuNTdaTTE3Ny4xMyAzNDdsLTM2IDMuNCA1My4zMiA1OC41MUE5Ni40MSA5Ni40MSAwIDAgMSAyMTkuNjMgNDc0aDI4LjkyYTEyNS4yOCAxMjUuMjggMCAwIDAtMzIuNzYtODQuNTdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUzLjY5IDIzMS42OGMtNi4zMy0zMS4zLTMwLjg5LTU0LjA5LTYyLjU3LTU4LjA3bC02LjM1LS43OWE0OS42MSA0OS42MSAwIDAgMS00My4zNS00OS4xM3YtMjBhNTIuNzUgNTIuNzUgMCAxIDAtMjguOTEtLjM2djIwLjM4YTc4LjU2IDc4LjU2IDAgMCAwIDY4LjY1IDc3LjgybDYuMzYuOGMyMy4yNCAyLjkyIDM0Ljc4IDIwIDM3LjgzIDM1LjFzLS45MyAzNS4zMi0yMS4yMiA0N2E3My44MSA3My44MSAwIDAgMS0zMC4wNiA5LjYybC05NS42NiA5YTEwMi40NSAxMDIuNDUgMCAwIDAtNDEuOCAxMy4zOEM5IDMzMi40NS00LjgxIDM2MyAxLjUyIDM5NC4yOXMzMC44OSA1NC4wOCA2Mi41NyA1OC4wNmw2LjM1LjhhNDkuNiA0OS42IDAgMCAxIDQzLjM1IDQ5LjEydjE4YTUyLjc1IDUyLjc1IDAgMSAwIDI4LjkxLjI2di0xOC4yNmE3OC41NSA3OC41NSAwIDAgMC02OC42NS03Ny44MWwtNi4zNi0uOGMtMjMuMjQtMi45Mi0zNC43OC0yMC4wNS0zNy44My0zNS4xMXMuOTMtMzUuMzIgMjEuMjItNDdhNzMuNjggNzMuNjggMCAwIDEgMzAuMDYtOS42M2w5NS42Ni05YTEwMi40NSAxMDIuNDUgMCAwIDAgNDEuOC0xMy4zOGMyNy42NS0xNi4wMiA0MS40LTQ2LjU0IDM1LjA5LTc3Ljg2WiIvPjwvc3ZnPg==&logoColor=white)
<img src="https://img.shields.io/badge/React%20Router-CA4245.svg?&style=for-the-badge&logo=React%20Router&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?&style=for-the-badge&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/styled%20components-DB7093.svg?&style=for-the-badge&logo=styled%20components&logoColor=white"/>
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?&style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>
</div>

#### BACKEND

##### - 채팅시스템, 영상공유시스템

![Java](https://img.shields.io/badge/java11-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white)
<img src="https://img.shields.io/badge/SpringBoot2.7.8-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
![](https://img.shields.io/badge/IntelliJ%20IDEA-000000.svg?&style=for-the-badge&logo=IntelliJ%20IDEA&logoColor=white)

##### - 유저시스템
<div>
<img src="https://img.shields.io/badge/Json Web Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white">
  <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
  <img src="https://img.shields.io/badge/PyCharm-000000?style=for-the-badge&logo=PyCharm&logoColor=white">
  </div>

#### Cowork Tools
<div>
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

### 📌 Architecture

<img width="991" alt="스크린샷 2023-02-24 오후 2 56 10" src="https://user-images.githubusercontent.com/63576379/221103247-d47e34ae-1668-4760-b228-430bf4b471d3.png">

### 📌 DB Architecture

<details>
<summary>DB Architecture</summary>
<div markdown="1">

<img width="929" alt="스크린샷 2023-02-21 오후 11 54 13" src="https://user-images.githubusercontent.com/63576379/220378845-d0ab3cc5-5c66-4de3-9f89-96503785f66c.png">

</div>
</details>

## 🚩UI

## 🚩 주요기능 및 작업내역
### 🛠 주요기능
- 이메일 인증을 통한 회원가입 기능
- JWT 토큰 인증을 통한 로그인 기능
- Stomp, SockJS를 통한 실시간 통신 기능
- WebSocket을 이용한 유저들 간에 실시간으로 영상을 함께 보는 기능 
- 실시간 채팅 기능<br/>

### 🛠 작업내역

#### FRONTEND

🙋🏻‍♀️ 박정원
- 전체적인 UI 구현
- Stomp, SockJS를 활용한 소켓 연결 실시간 채팅, 영상 공유 구현
- 로그인, 회원가입 페이지를 구현하고 backend로부터 토큰을 받아 session storage에 저장해 로그인 처리 
- Private Route를 사용해 생성되지 않은 영상공유방으로 접근 시 `404 Not Found` 페이지로 이동 처리
-  `Header`의 뷰가 로그인 전/후로 달라지기 때문에 로그인 유무를 Recoil을 통해 전역으로 상태 관리 처리




🙋🏻 이효승
- 소켓 연결을 통해 서버와 통신하며 서버에서 받은 메시지를 기반으로 리액트 플레이어를 통한 영상 조작 체계 구현
- 호스트 상태와 호스트가 아닌 상태 정의 및 구현
- 영상 재생중인 방에 추가로 접속된 클라이언트에 대한 현재 재생중인 영상 상태 전달 과정과 클라이언트 내부처리 설계
#### BACKEND 
🙋🏻 박성준
- ec2 서버 구축 후 카프카 연동 [(링크)](https://github.com/sgdevcamp2022/seagull/wiki/KAFKA-%EC%84%9C%EB%B2%84-%EA%B5%AC%ED%98%84-%EB%B0%8F-%EB%AA%85%EB%A0%B9%EC%96%B4-%EC%A0%95%EB%A6%AC)
- ec2에 도커 설치 [(링크)](https://github.com/sgdevcamp2022/seagull/wiki/EC2-%EB%8F%84%EC%BB%A4-%EC%84%A4%EC%B9%98)
- 도커에 mysql 설치[(링크)](https://github.com/sgdevcamp2022/seagull/wiki/docker-mysql-%EC%84%A4%EC%B9%98)
- 깃 Rebase 컨벤션 작성 [(링크)](https://github.com/sgdevcamp2022/seagull/wiki/rebase-%EB%B0%A9%EB%B2%95)
- 실시간 웹소켓을 위한 테스트 페이지 구현
- 방마다 구분된 사용자의 실시간 브로드 캐스팅 구현
- 실시간으로 주고 받는 데이터들을 위한 Redis 환경 및 Redis Repository 구축
- 비디오 공유방 생성 및 조회를 위한 API 로직 구현
- 호스트의 URL 전송, 방 삭제 등을 위한 API 로직 구현
- 채팅 시스템을 구축해 메세지를 Stomp와 SockJS로 주고받을 수 있는 환경 구축
- EC2 에 docker-commpose.yml 로 서버를 배포할 수 있게 환경 구성
  ​    

🙋🏻 이효승
- 영상공유 전체 로직 구현 [(링크)](https://github.com/sgdevcamp2022/seagull/wiki/%EC%98%81%EC%83%81%EA%B3%B5%EC%9C%A0-%EB%A1%9C%EC%A7%81 '영상공유 로직 - 위키페이지로 이동')
- 영상 공유 로직에 따라 서버 Redis 저장 값 정의
- 영상 공유 로직에 따라 클라이언트와 서버 사이의 통신 규칙 정의 및 구현
- 호스트 클라이언트가 전송한 url 서버 저장구조 정의
- 중간에 방에 접속한 클라이언트에게 url 전송하는 로직 설계 및 구현
- 클라이언트와 서버간 웹소켓 통신 pub/sub구조 설계
- 웹소켓 통신에서 pub/sub주소를 통해 방 구분을 하는 로직 설계
- 방 링크 생성시 호스트 id를 base62로 인고딩한 값을 추가해 방 링크 생성 로직 설계 및 구현
- 주소와 포트를 통해 클라이언트와 서버가 통신하도록 구현

#### BACKEND AUTH 
🙋🏻 이범수
- FastAPI를 이용한 Jwt 토큰기반 인증 시스템 구현
- 유저 추가, 정보변경, 삭제 등의 유저 관리 체계 구현
- MySQL을 이용한 유저 데이터베이스 설계 및 구현
- Redis를 이용한 이메일 인증과정
- 카카오 API를 이용한 카카오 로그인 구현
- EC2환경에서 Nginx, Uvicorn을 이용한 백엔드 서비스 배포


## 🚩 Trouble Shooting
#### FRONTEND
🙋🏻‍♀️ 박정원
- React Player 사용중, state내의 하나의 state를 변경해도 다른 값들이 초기화되는 문제
    - state를 하나로 묶어 관리하는 경우 그 안의 하나의 state가 변경되는 순간 다른 state값이 초기화되기 때문에 필요한 state값을 별개로 관리하고 나머지는 다 고정된 값으로 처리함
- 공유방에서 영상이 공유되고 있는 상태에서 제 3자가 들어올 때 영상이 정상 작동하지 않는 문제
    - 재생 초기값을 재생으로 두고 제3자 입장시 1초의 타이머를 작동해 1초에 한번씩 받는 싱크를 받으면 재생유지, 받지 않으면 일시정지 상태로 처리
- 존재하지 않는 방 링크 접속되는 문제 
    - backend에서 방 접속시 get요청으로 방 유무를 값을 받고 존재하지 않는 방 링크로 접속할 시 PrivateRoute로 이동해 검증과정을 거친 후 404notfound페이지로 이동

#### BACKEND
🙋🏻 박성준
- EC2 접속 에러[(링크)](https://github.com/sgdevcamp2022/seagull/wiki/EC2-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85)
- 배포 서버와 클라이언트 간 CORS 에러[(링크)](https://github.com/sgdevcamp2022/seagull/wiki/%EC%84%9C%EB%B2%84,-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-CORS-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85)
- 방마다 브로드 캐스팅을 다르게 하는 방법
  - Client에서 들어오는 publish주소에 roomLink를 붙쳐 해당 룸에 대한 접속 유저를 서로 다른 브로드캐스팅을 하게끔 구성하여 로직 해결
- Redis Null 에러
  - findById에서 Redis에 저장된 데이터가 Null이라 생기는 문제임을 확인
  - RedisTemplate로 레디스를 Set형태로 관리하므로써, 레디스 조회/저장/삭제 기능에서 생기는 에러들을 해결
- Redis 저장 키값이 중복되는 에러
  - 해당되는 키값이 중복되어 저장됨으로써 데이터가 합쳐지는 에러 발생함을 확인
  - <RoomLink, HostId>, <RoomLink, VideoUrl>, <RoomLink, Users> 에 대한 각각의 RoomLink에 식별될 수 있는 문자를 넣어 구분해서 해결
- 웹소켓 테스트 환경에 대한 어려움
  - PostMan, Chrome Extension을 활용한 웹소켓 테스트가 어려워 직접 프론트를 구성해 웹소켓 브로드 캐스팅 테스트 진행할 수 있게 해결
- 방 참여자를 순서대로 오지 않는 문제
  - 순서를 유지 하기 위해 Redis Set자료형을 List로 파싱하여 데이터 전송하여 문제 해결
- 호스트가 방 나갈 때 레디스에 데이터가 삭제되지 않는 문제
  - 방 생성시 HostId에 대한 레디스 레포지토리 로직을 구현해 문제 해결     
  
 🙋🏻 이효승
- 문제: 영상이 재생중인 방에 새로운 클라이언트가 접속하는 경우 url값이 잘못오는 문제발생
  - 원인: 서버에서 url에 대해 redis set의 add로 값을 넣고 pop메서드로 값을 꺼내서 보내도록 구현되어있었다. pop은 value에 값이 여러개인경우 랜덤한 값을 꺼내기 때문에 발생한 문제이다.
  - 해결: 스택처럼 list의 leftpush로 넣고 leftpop으로값을 꺼내도록 변경했다. 가장 마지막으로 들어간 최신 값을 꺼내오도록 동작한다.
  - 추가로 url값을 계속 저장하도록 한 것은 추후에 추가될 재생목록 기능을 염두하고 한 것이다.


## 🚩 기타문서
#### - PMP 문서
[PMP 문서](https://docs.google.com/presentation/d/1R8a6CCL8lJsjGJM9iGdM-PytgpqIAH0VGUPHEEQKC-g/edit?usp=sharing)

#### - 최종발표 자료
[최종발표 자료](https://drive.google.com/file/d/1-mLLqmidhnFSgIg2pyUef_nOZGvWdaSS/view?usp=sharing)

#### - 와이어 프레임
[와이어 프레임](https://www.figma.com/file/Ashu5JbK0rnwHolHw5JP9E/SeaGull_project?node-id=98%3A119&t=Qr4vAunjyT3KrTho-0)

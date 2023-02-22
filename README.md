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

<br>
​

## ✔️ Architecture
<img width="929" alt="스크린샷 2023-02-21 오후 11 53 30" src="https://user-images.githubusercontent.com/63576379/220378703-c87866f6-9d26-44d0-aaeb-44cbf3f37272.png">
<img width="929" alt="스크린샷 2023-02-21 오후 11 54 13" src="https://user-images.githubusercontent.com/63576379/220378845-d0ab3cc5-5c66-4de3-9f89-96503785f66c.png">
​
<br>

## ✔️ PMP 문서
- PDF : [SeaGull.pdf](https://github.com/sgdevcamp2022/seagull/files/10794913/SeaGull.pdf)

<br>

## ✔️ 회의 기록
- 링크 : https://devcamp.notion.site/SeaGull-8e479fa843f64b92aa7bf29b67788a2a

<br>

<br>

## 🛠 주요 기능
#### - 링크가 공유된 유저들 간에 영상을 함께 보는 기능    
#### - 함께 영상을 보면서 채팅하는 기능<br/>
​
## 🛠 작업 내역
​
### BE - 이범수
- FastAPI를 이용한 Jwt 토큰기반 인증 시스템 구현
- 유저 추가, 정보변경, 삭제 등의 유저 관리 체계 구현
- MySQL을 이용한 유저 데이터베이스 설계 및 구현
- Redis를 이용한 이메일 인증과정
- 카카오 API를 이용한 카카오 로그인 구현
- EC2환경에서 Nginx, Uvicorn을 이용한 백엔드 서비스 배포 
​
​
​
<br>

<br>

## 📌 Trouble Shooting
### BE - 이범수

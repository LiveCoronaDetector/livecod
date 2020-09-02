![LiveCorona](https://livecod.adrinerdp.co/dist/media/github_banner.png)

![crawl current data](https://github.com/LiveCoronaDetector/livecod/workflows/crawl%20current%20data/badge.svg) ![crawl cumulative data](https://github.com/LiveCoronaDetector/livecod/workflows/crawl%20cumulative%20data/badge.svg)

- [Update History](https://www.notion.so/fc332cf039fd4f61b38a80bc2fc8acb9)


### 1. 취지와 목적
- 코로나바이러스감염증-19(COVID-19)에 대한 **정확한** **정보의 전달**, **정보의 확산**을 위해 2020년 1월 28일 오후 1시 개시된 비영리 정보 공유 서비스
- 감염병이 재창궐하였을 때 보다 적은 리소스로 해당 사이트를 구축 할 수 있도록 의료 정보 오픈 소스를 만드는데 목적


### 2. 초창기 이슈
- **가짜 뉴스 대응** : 가짜 뉴스는 정치적인 목적을 가지고, 어느정도 진실을 포함하고 있어 민사 소송에 여지가 있습니다. 따라서 팩트체크는 언론이나 포털에 링크 연결시켜주는 쪽으로 정리를 하시는 것이 좋습니다.
- **확진자 이동 경로 표시** : 감염자 이동 경로를 표시하는 것은 매우 민감한 문제입니다. 초창기 텍스트로만 제공하였고, 질병관리본부에서 확인되지 않은 정보는 개시하지 않았습니다.
- 초창기에는 확진자 인원에 매우 민감하기 때문에 속보를 잘 반영해주실 필요가 있습니다. 하지만, 실시간으로 반영되지 않는다는 것을 꼭 명시해주세요. 속보는 크롤러로 잡기 힘듭니다. 또 오보의 가능성도 있어서 질병관리본부의 발표를 듣고 나서 게시하시는 것이 좋습니다.
- 초창기에는 크롤러가 잘못 작동할 확율이 높습니다. 크롤링 하는 사이트에서 잘못 집계하고 있을 확율이 높습니다. 또한 외국의 경우 시차가 있기 때문에 시차를 반영한 데이터가 필요합니다.


### 3. 기술 스택
* 프론트엔드: Bootstrap + jQuery
* 크롤링: Python → JSON
* Webpack (Laravel Mix)

### 4. 코로나 관련 데이터 목록
**파일 업데이트 및 버전 정보** ▶ [version_info.json](https://livecod.adrinerdp.co/data/version_info.json)

| 이름 | 파일 URL | 비고 |
| --- | --- | --- |
| **세계 누적 확진자** | [JSON](https://livecod.adrinerdp.co/data/cumulative_global.json) | JHU CSSE, 시계열 |
| **세계 주요 국가 누적 현황** | [JSON](https://livecod.adrinerdp.co/data/global_per_day.json) | worldometers, 시계열 |
| **세계 국가별 현황** | [JSON](https://livecod.adrinerdp.co/data/current_global.json) | worldometers |
| **한국 누적 확진자** | [JSON](https://livecod.adrinerdp.co/data/cumulative_korea.json) | JHU CSSE, 시계열 |
| **한국 지역별 현황** | [JSON](https://livecod.adrinerdp.co/data/current_korea_region.json), [SVG](https://livecod.adrinerdp.co/data/current_korea_region.svg) | 질병관리본부 |
| **한국 치명률** | [JSON](https://livecod.adrinerdp.co/data/current_korea_fatality.json) | 질병관리본부 |

### 5. 데이터 출처 및 참고논문

1. [질병관리본부 코로나 국내발생 동향](http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=)
2. [존스홉킨스 CSSE 코로나 데이터셋](https://github.com/CSSEGISandData/COVID-19)
3. [월드오미터 코로나 데이터](https://www.worldometers.info/coronavirus/)
4. 참고 논문
    - Early epidemiolobical analysis of the coronavirus disease
    - Estimation of the reproductive number of Novel Coronavirus

### 6. 멤버
멤버는 매월 기수를 뽑고 있는 상황이며 프론트엔드 팀, 백엔드 팀, 데이터 분석팀, 디자인팀, 번역팀, 크롤러 팀이 있음

| 이름 | 소개 및 소속 |
| --- | --- |
| 강민성 | 서울시립대(수학과/컴퓨터 과학부 복수 전공) |
| 강태욱 | 한국국제고등학교(제주캠퍼스) |
| 김경남 | 세종대학교(소프트웨어학과) |
| 김남규 | 프론트엔드 웹 개발자 |
| 김성진 | 프리랜서 |
| 김승민 | 제주대학교(컴퓨터교육과) |
| 김민욱 | 한국해양대학교(IT융합 전공) |
| 김정동 | 부산대학교(기계공학부, 빅데이터 복수 전공, DSC PNU 리드) |
| 김진 | 제주대학교(컴퓨터공학과) |
| 박현상 | 목포 중앙고등학교 방송영상과, 프론트엔드 개발자 |
| 백기승 | Data Scientist |
| 백지오 | 세종대학교(컴퓨터공학과) |
| 석찬희 | 경북대학교(컴퓨터학부) |
| 송진영 | 휴멜로(데이터 엔지니어) |
| 유승엽 | 인하대학교(산업경영공학과) |
| 이권석 | 부산대학교(디자인학과) |
| 이수연 | 프리랜서, 웹 퍼블리셔 |
| 우지호 | 자원봉사, gap year |
| 이준수 | 코드포코리아, 광주 고려고등학교 |
| 이호준 | 바울랩 대표, GDG 제주 오거나이저, JSA 부회장, 제주코딩베이스캠프 운영진 |
| 이희원 | 단국대학교(소프트웨어학과) |
| 장성원 | 경북대학교(컴퓨터학부) |
| 정다영 | 웹디자이너, GDG 부산 운영진 |
| 전진환 | GDG 제주 이벤트 운영진 |
| 조희주 | GDG 판교 오거나이저, 카카오게임즈 데이터분석플랫폼 개발/분석 |
| 지건우 | 광주소프트웨어마이스터고등학교 소프트웨어학과, 프론트엔드 개발자 | 
| 태재성 | 일대학교 (통계학과) |
| 한연희 | 명지대학교(디지털콘텐츠디자인 전공), GDG 서울 운영진 |
| 황예진 | 숙명여자대학교(컴퓨터과학 전공) |
| Eden | 머신러닝 엔지니어 |

### 7. 팀
팀을 만들어 팀 별로 진행하시는 것을 권해드립니다.

#### 1기 Team

- PM : 이호준
- 프론트엔드 : 한재현(PL), 한연희, 강태욱
- 백엔드 : 강민성(PL), 백지오, 조희주, 송진영
- 다국어 번역
    - 중국어 : 김미영(PL), 유승엽
    - 영어 : 김민욱(PL), 김정동
- 데이터 수집 : 김진, 김승민
- 데이터 분석 : 조희주(PL), 김정동, 송진영, 백지오, 전진환
- DevOps : 강태욱

#### 2기 Team

- PM : 이호준
- 프론트엔드 : 이수연(PL), 강태욱, 황예진
- 백엔드 : 김성진(PL), 백지오, 강태욱
- 데이터 수집 : 황예진
- 데이터 분석 : 백지오, 석찬희, 장성원, 송진영, Eden

#### 3기 Team

- PM : 이호준
- 프론트엔드 : 이수연(PL), 강태욱, 장근호, 강현욱, 김형규, 한종우, 조희주
- 백엔드 : 강태욱(PL), 조희주
- 데이터분석 : 강태욱(PL), 조희주
- 크롤러 : 강태욱, 강현욱, 남수연, 강민철, 황예진, Eden
- 데이터수집 : 백기승,송지영,남수연,전창삼,황예진,송진영,우지호
- 디자인 : 한연희(PL)
- 중국어 번역 : 변현홍

#### 4기 Team

- PM : 이호준
- 프론트엔드 : 강태욱, 장근호, 박현상, 정다영, 성기동
- 백엔드 : 강태욱(PL)
- 데이터분석 : 태재성, 백기승, Eden, 조희주 
- 크롤러 : 김경남, 태재성, 백기승, Eden
- 글로벌 서비스 : 강태욱, 우지호, 변현홍, 정다영
- 데이터수집 : 백기승, 우지호
- 디자인 : 정다영(PL)

#### 5기 Team

- PM : 이호준
- 프론트엔드 : 강태욱
- 백엔드 : 강태욱(PL)
- 데이터분석 : 태재성, 백기승
- 크롤러 : 태재성, 백기승 
- 데이터수집 : 태재성

#### 6기 Team

- PM : 이호준
- 프론트엔드 : 강태욱
- 백엔드 : 강태욱(PL)
- 데이터분석 : 태재성, 백기승
- 크롤러 : 태재성, 백기승 
- 데이터수집 : 태재성

## 도움을 주신 곳

- 제주특별자치도청(미래전략국)
- 제주대학교 SW융합교육센터
- 제주대학교 링크플러스사업단
- 제주스타트업협회
- NAVER(NBP, 서버지원)
- Google Korea(GDG 멤버 지원)
- 제주수흉부외과
- 강민철님
- 양수완(오현중학교)
- 박승우(오름중학교)
- 김유정님
- 최경민님
- 현정운(탐라중학교)
- 오준혁(도남초등학교)
- 이혜은(NLCS JEJU)

# LiveCorona

- **사이트 주소: https://livecorona.co.kr**
- 본 소스는 자유롭게 사용하셔도 좋습니다. 데이터만 가져다 쓰실 경우 [`totalDataSet.js`](http://livecorona.co.kr/totalDataSet.js)를 참고해주세요.
- [Update History](https://www.notion.so/fc332cf039fd4f61b38a80bc2fc8acb9)

## 취지와 목적

- 코로나바이러스감염증-19(COVID-19)에 대한 **정확한** **정보의 전달**, **정보의 확산**을 위해 2020년 1월 28일 오후 1시 개시된 비영리 정보 공유 서비스
- 감염병이 재창궐하였을 때 보다 적은 리소스로 해당 사이트를 구축 할 수 있도록 의료 정보 오픈 소스를 만드는데 목적

## 초창기 이슈

- 가짜 뉴스 대응 : 가짜 뉴스는 정치적인 목적을 가지고, 어느정도 진실을 포함하고 있어 민사 소송에 여지가 있습니다. 따라서 팩트체크는 언론이나 포털에 링크 연결시켜주는 쪽으로 정리를 하시는 것이 좋습니다.
- 확진자 이동 경로 표시 : 감염자 이동 경로를 표시하는 것은 매우 민감한 문제입니다. 초창기 텍스트로만 제공하였고, 질병관리본부에서 확인되지 않은 정보는 개시하지 않았습니다.
- 초창기에는 확진자 인원에 매우 민감하기 때문에 속보를 잘 반영해주실 필요가 있습니다. 하지만, 실시간으로 반영되지 않는다는 것을 꼭 명시해주세요. 속보는 크롤러로 잡기 힘듭니다. 또 오보의 가능성도 있어서 질병관리본부의 발표를 듣고 나서 게시하시는 것이 좋습니다.
- 초창기에는 크롤러가 잘못 작동할 확율이 높습니다. 크롤링 하는 사이트에서 잘못 집계하고 있을 확율이 높습니다. 또한 외국의 경우 시차가 있기 때문에 시차를 반영한 데이터가 필요합니다.

## 기술 스택

**서비스 유지를 위해 사용한 기술 스택과 github 주소**

- 사용 스택 : HTML, CSS, JS, JQeury, ChartJS, Bootstrap, Python
    - 프론트엔드 GitHub URL: [https://github.com/LiveCoronaDetector/livecod](https://github.com/LiveCoronaDetector/livecod)
    - 백엔드 GitHub URL: [https://github.com/LiveCoronaDetector/livecod-backend](https://github.com/LiveCoronaDetector/livecod-backend)
    - 크롤러 GitHub URL: [https://github.com/LiveCoronaDetector/CoronaCrawler](https://github.com/LiveCoronaDetector/CoronaCrawler)
    - 제주 지정의료기관 GitHub URL: [https://github.com/LiveCoronaDetector/covid-19-jeju-hospital-map](https://github.com/LiveCoronaDetector/covid-19-jeju-hospital-map)

## 데이터 형식

    // 1. 세계 맵에 마커를 찍기 위한 확진자수와 완치자수
    var marker = [
        {
            "Name": "이란",
            "Name_en": "Iran",
            "Name_ch": "伊朗",
            "lat": 35.6970118,
            "lng": 51.2097373,
            "확진자수": 139,
            "사망자수": 19,
            "완치자수": 25,
            "추가날짜": "2/21"
        },{
            "Name": "이집트",
            "Name_en": "Egypt",
            "Name_ch": "埃及",
            "lat": 30.0594838,
            "lng": 31.2234448,
            "확진자수": 1,
            "사망자수": 0,
            "완치자수": 1,
            "추가날짜": "2/16"
        }, {
            "Name": "벨기에",
            "Name_en": "Belgium",
            "Name_ch": "比利时",
            "lat": 50.8550625,
            "lng": 4.3053503,
            "확진자수": 1,
            "사망자수": 0,
            "완치자수": 1,
            "추가날짜": "2/5"
        } ...
    ];

    // 2. 선차트용 데이터 세계 확진자수, 세계 사망자수, 세계 완치자수
    // data : 확진환자
    // data2 : 사망
    // data3 : 완치자

    var marker2 = {
        labels: ["1/24", "1/25", "1/26", ...],
        data: [845, 1315, 2010, ... ],
        data2: [25, 41, 56, ... ],
        data3: [36, 49, 54, ... ]
    }

    // 3. 도청과 협조하여 얻은 자료, 입도객현황 그래프 찍는 용도

    var 입도객현황 = {
        날짜: ["19년평균", "2/3", "2/4" ...],
        내국인: [37150, 19209, 17633, ... ],
        외국인: [4729, 1866, 1285, ... ],
        중국인: [2957, 755, 156, ... ]
    }

    // 4. 업데이트 시각이 메인 페이지에 업데이트
    var updateLog = {
      date: "2/29",
      time: "17:00"
    };

    // 5. 지역별 Map을 작성키 위한 데이터
    var 지역별확진자 = [
      77, //서울
      6, //인천
      82, //경기
      ...
    ];

    // 6. 여러 데이터 차트를 위한 날짜, 확진자, 전날과 편차, 사망자
    var 분석차트_한국누적확진자 = [
      ["2/1",12, 1, 0],
      ["2/2",15, 3, 0],
      ["2/3",15, 0, 0],
      ...
    ];

### 지도에 마커 찍는 방법

- [네이버 지도 API 문서](https://navermaps.github.io/maps.js/docs/tutorial-2-Getting-Started.html)를 참고하여 JS로 작성
- 경도와 위도는 Google Maps 및 Bing Maps 등에서 별도로 참조해야 함

### 데이터 출처 및 참고논문

1. 질병관리본부와 KBS 데이터 우선
2. 기타 데이터셋
    - 전세계 확진자 수 데이터셋: [https://www.kaggle.com/sudalairajkumar/novel-corona-virus-2019-dataset](https://www.kaggle.com/sudalairajkumar/novel-corona-virus-2019-dataset)
    - 한국 확진자 Feature: [https://www.kaggle.com/kimjihoo/coronavirusdataset](https://www.kaggle.com/kimjihoo/coronavirusdataset)
    - 지역 감염 현황: [https://docs.google.com/spreadsheets/d/1aOckl-xaijKHVD6liwTQI7nQZ4ez0Hqn-xPfDbHUhag/edit#gid=0](https://docs.google.com/spreadsheets/d/1aOckl-xaijKHVD6liwTQI7nQZ4ez0Hqn-xPfDbHUhag/edit#gid=0)
3. 참고 논문

    Early epidemiolobical analysis of the coronavirus disease

    Estimation of the reproductive number of Novel Coronavirus

## 업데이트 방법

- 크롤링 데이터 Slack으로 Push → 내용 확인(필요의 경우 내용 사실 여부 확인) → 자원 봉사자 중 1명이 Commit, Push
  -  [https://www.notion.so/84904afe278f4efc96c4fe0cdde0aae8](https://www.notion.so/84904afe278f4efc96c4fe0cdde0aae8) 에 적어놓았습니다.
- Github Pull Request 보내기
  - [https://www.notion.so/Github-livecod-aa5be574c29e48febff9847263ca9bee](https://www.notion.so/Github-livecod-aa5be574c29e48febff9847263ca9bee) 에 적어두었습니다.

## 멤버

- 멤버는 매월 기수를 뽑고 있는 상황이며 프론트엔드 팀, 백엔드 팀, 데이터 분석팀, 디자인팀, 번역팀, 크롤러 팀이 있음
- 강민성 : 서울시립대(수학과/컴퓨터 과학부 복수 전공)
- 강태욱 : 한국국제고등학교(제주캠퍼스)
- 김성진 : 프리랜서
- 김승민 : 제주대학교(컴퓨터교육과)
- 김민욱 : 한국해양대학교(IT융합 전공)
- 김정동 : 부산대학교(기계공학부, 빅데이터 복수 전공, DSC PNU 리드)
- 김진 : 제주대학교(컴퓨터공학과)
- 백지오 : 세종대학교(컴퓨터공학과)
- 석찬희 : 경북대학교(컴퓨터학부)
- 송진영 : 휴멜로(데이터 엔지니어)
- 수민 : 프리랜서, 머신러닝 엔지니어
- 유승엽 : 인하대학교(산업경영공학과)
- 이권석 : 부산대학교(디자인학과)
- 이수연 : 프리랜서, 웹 퍼블리셔
- 이호준 : 바울랩 대표, GDG 제주 오거나이저, JSA 부회장, 제주코딩베이스캠프 운영진
- 장성원 : 경북대학교(컴퓨터학부)
- 전진환 : GDG 제주 이벤트 운영진
- 조희주 : GDG 판교 오거나이저, 카카오게임즈 데이터분석플랫폼 개발/분석
- 한연희 : 명지대학교(디지털콘텐츠디자인 전공), GDG 서울 운영진
- 황예진 : 숙명여자대학교(컴퓨터과학 전공)

## 팀

팀을 만들어 팀 별로 진행하시는 것을 권해드립니다.

### 1기 Team

- PM : 이호준
- 프론트엔드 : 한재현(PL), 한연희, 강태욱
- 백엔드 : 강민성(PL), 백지오, 조희주, 송진영
- 다국어 번역
    - 중국어 : 김미영(PL), 유승엽
    - 영어 : 김민욱(PL), 김정동
- 데이터 수집 : 김진, 김승민
- 데이터 분석 : 조희주(PL), 김정동, 송진영, 백지오, 전진환
- DevOps : 강태욱

### 2기 Team

- PM : 이호준
- 프론트엔드 : 이수연(PL), 강태욱, 황예진
- 백엔드 : 김성진(PL), 백지오, 강태욱
- 데이터 수집 : 수민, 황예진
- 데이터 분석 : 백지오, 석찬희, 장성원, 송진영, 수민

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

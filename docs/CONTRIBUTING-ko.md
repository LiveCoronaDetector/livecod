# 라이브 코로나 맵에 기여하기

라이브 코로나 맵 기여에 관심을 가져주셔서 감사합니다.  
라이브 코로나 맵은 오픈소스로, 누구나 하단 주소에서 코드를 clone 할 수 있고,  
작성한 패치에 대하여 Pull Request를 보낼 수 있습니다.  
하지만 그 전에, 후술할 규칙들을 읽어보시길 권장합니다.

  https://github.com/livecoronadetector


## 코드 스타일

라이브 코로나 맵은 대부분 javascript, html, css, python으로 이루어져 있고,
코드 가독성을 크게 해하지 않는 한, 기여자의 개별적 코드 스타일을 크게 제한하지 않습니다.
python의 경우, indent와 4개의 space를 모두 허용합니다.

## 표준 변수명

라이브 코로나 맵은 다양한 곳으로부터 받아온 정보를 재가공하는 서비스인 만큼, 변수명에 대한 표준화가 필요합니다.
하단에 명시된 **자주 쓰이는 변수명**에 대한 표준을 따라주기를 권장합니다.

또한 표준을 따르기 어려운 상황에서의 변수명, 
혹은 확진자, 완치자, 사망자, 국가명, 병원(약국)명과 간접적으로 관련된 변수명은
반드시 주석을 달아주시길 권장합니다.

| 변수명 | 설명 | 비고 |
| --- | --- | --- |
| `confirmed` | 확진자 수 | - |
| `quarantine` | 격리자 수 | `confirmed - deaths - recovered` |
| `deaths` | 사망자 수 | - |
| `recovered` | 완치자 수 | - |
| `country` | 국가명 | - |
| `region` | 지역명 | - |
| `updated` | 업데이트날짜 | - |

 * 한국(어)을 나타내는 데이터는 위 표준 변수명에 `_kr`를 사용한다.
   - e.g. 한국 확진자 수/사망자 수/완치자 수 : `confirmed_kr` / `deaths_kr` / `recovered_kr`
   - e.g. 한국어로 표기한 국가명 : `country_kr`
 * 특정 국가를 나타내는 데이터는 위 표준 변수명에 [국가코드](https://eminwon.qia.go.kr/common/CountrySP.jsp)를 사용한다.
   - e.g. 중국 확진자 수/사망자 수/완치자 수 : `confirmed_cn` / `deaths_cn` / `recovered_cn`
   - e.g. 중국어로 표기한 국가명 : `country_cn`
 * 지역별(시도별) 확진자/사망자/완치자는 위 표준 변수명에 `_region`을 사용한다.
   - e.g. 지역별 확진자 비율 : `confirmed_region`
 * 10만명 당 발생율/사망율/완치율은 위 표준 변수명에 `_rate`을 사용한다.
   - 10만명 당 발생율/ 사망율/ 완치율 : `confirmed_rate` / `deaths_rate` / `recovered_rate`

## 문의사항

issue 를 남겨주시거나, paul-lab@naver.com 으로 메일을 보내주시기 바랍니다.
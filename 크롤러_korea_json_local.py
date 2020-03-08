import requests
import re
from bs4 import BeautifulSoup
import json

html = requests.get("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=").text
# print(html)

soup = BeautifulSoup(html, 'html.parser')
업데이트날짜 = soup.select('.timetable > .info > span')[0].text
# print(업데이트날짜)

# datas = soup.select('#maplayout > button')
datas = soup.select('.maplist > ul > li')
# print(datas)

시도별확진자 = []

for d in datas:
    지역이름 = d.find_all('strong')[0].text
    확진자수 = int(d.find_all('span', class_='sub_num')[0].text[:-1])
    사망자수 = int(d.find_all('span', class_='sub_num')[1].text[:-1])

    # print(f'지역이름 : {지역이름}')
    # print(f'확진자수 : {확진자수}')
    # print(f'사망자수 : {사망자수}')

    시도별확진자.append({
        '지역이름' : 지역이름,
        '확진자수' : 확진자수,
        '사망자수' : 사망자수,
    })

#삭제된 데이터 확인
print(f'삭제된 데이터 : {시도별확진자[0]}')
시도별확진자.append({'업데이트날짜': 업데이트날짜})

with open("크롤러_지역별현황.js", "w", encoding='UTF-8-sig') as json_file:
    json.dump(시도별확진자[1:], json_file, ensure_ascii=False, indent=4)

data = ''
with open("크롤러_지역별현황.js", "r", encoding='UTF-8-sig') as f:
    while True:
        line = f.readline()
        if not line: break
        data += line
data = 'var 크롤러_지역별현황 = ' + data + ';'

with open("크롤러_지역별현황.js", "w", encoding='UTF-8-sig') as f_write:
    f_write.write(data)

#이 파일은 코로나맵을 만드는 분들 중 크롤링을 하시려는 분들의 학습용으로 만들어져 있습니다.

import requests
import re
from bs4 import BeautifulSoup
import json

html = requests.get("https://www.worldometers.info/coronavirus/").text
# print(html) 작동확인 1
soup = BeautifulSoup(html, 'html.parser')
datas = soup.select('#main_table_countries > tbody > tr')
# print(datas) 작동확인 2
세계확진자 = []

for d in datas:
    국가이름 = d.find_all('td')[0].text
    확진자 = d.find_all('td')[1].text
    사망자 = d.find_all('td')[3].text
    완치자 = d.find_all('td')[5].text
    # print(f'국가이름 : {국가이름}')
    # print(f'확진자 : {확진자}')
    # print(f'사망자 : {사망자}')
    # print(f'완치자 : {완치자}')
    세계확진자.append({
        '국가이름' : 국가이름.strip(),
        '확진자' : int(0 if 확진자.strip().replace(',', '') == "" else 확진자.strip().replace(',', '')),
        '사망자' : int(0 if 사망자.strip().replace(',', '') == "" else 사망자.strip().replace(',', '')),
        '완치자' : int(0 if 완치자.strip().replace(',', '') == "" else 완치자.strip().replace(',', '')),
    })

with open("크롤러_세계확진자.json", "w", encoding='UTF-8-sig') as json_file:
    json.dump(세계확진자, json_file, ensure_ascii=False, indent=4)
    # file.write(json.dumps(dict, ensure_ascii=False))

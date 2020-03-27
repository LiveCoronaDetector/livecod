import json
from datetime import date

print("#####################################")
print("############ 한국 누적 데이터 #############")
print("######## crawlTotalCumulativeData.py #########")

import json
from datetime import date

data = ''
switch = True
with open('./data/koreaTotalCumulativeData.js', 'r', encoding='UTF-8-sig') as f:
    while True:
        if switch == True:
            line = f.readline()[34:]
            data += line
            switch = False
        if not line: break
        line = f.readline()
        data += line

data = json.loads(data.replace('\n', '').replace('\t', ''))

today = date.today()
day = today.strftime(f"{today.month}/{today.day}")

from bs4 import BeautifulSoup
from urllib.request import urlopen
import urllib.request
import pandas as pd

html = urlopen("http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=")
source = html.read()
html.close()

soup = BeautifulSoup(source, 'lxml')
table = soup.find("div", class_ = "data_table mgt16")
tables2 = table.find_all("td")

num=[]
for i in range(0, len(tables2)) :
    a = tables2[i].get_text()
    num.append(a)

before_tot = data[len(data)-1][1]
today_tot = int(num[0].replace(',',''))
diff=today_tot - before_tot
death = int(num[3])
release = int(num[1].replace(',',''))

now = []
now.append(day)
now.append(today_tot)
now.append(diff)
now.append(death)
now.append(release)

if data[len(data)-1][0] != day :
    data.append(now)

    with open('./data/koreaTotalCumulativeData.js', 'w', encoding='utf-8') as make_file:
        json.dump(data, make_file, indent="\t")

    data = ''
    with open("./data/koreaTotalCumulativeData.js", "r", encoding='UTF-8-sig') as f:
        while True:
            line = f.readline()
            if not line: break
            data += line
    data = 'var koreaRegionalCumulativeData = ' + data

    with open("./data/koreaTotalCumulativeData.js", "w", encoding='UTF-8-sig') as f_write:
        f_write.write(data)

print("############### 완료!! ###############")
print("#####################################")

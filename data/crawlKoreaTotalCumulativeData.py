import json
from datetime import date

import requests

from bs4 import BeautifulSoup
from utils import write_data


def get_past_data():
    with open("./data/koreaTotalCumulativeData.js", "r", encoding="UTF-8-sig") as f:
        data = f.read()
        obj = (
            data[data.find("["): data.rfind("]") + 1]
            .replace("\n", "")
            .replace("\t", "")
        )
    return json.loads(obj)


def get_today_data(url, data):
    today = date.today().strftime("%m/%d")
    html = requests.get(url).text
    soup = BeautifulSoup(html, "html.parser")
    table = soup.find("div", class_="caseTable").find_all("dd", class_="ca_value")

    res = []
    for tag in table:
        try:
            res.append(int(tag.text.strip().replace(",", "")))
        except ValueError:
            pass
    
    total, release, _, death = res
    flag = data[-1][1] + sum(data[-1][3:]) != sum([total, death, release])

    if flag:
        if data[-1][0] != today:
            diff = total - data[-1][1]
            data.append([today, total, diff, death, release])
        else:
            diff = total - data[-2][1]
            data[-1] = [today, total, diff, death, release]

    return data


def run():
    url = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun="

    past_data = get_past_data()
    data = get_today_data(url, past_data)

    save_dir = "./data/koreaTotalCumulativeData.js"
    crawler_name = "crawlKoreaTotalCumulativeData.py"
    var_name = "koreaRegionalCumulativeData"

    write_data(data, save_dir, crawler_name, var_name)


print("#####################################")
print("############ 한국 누적 데이터 #############")
print("######## crawlTotalCumulativeData.py #########")

run()

print("############### 완료!! ###############")
print("#####################################")

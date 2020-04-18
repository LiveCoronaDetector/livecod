import json
import urllib.request
from datetime import date
from urllib.request import urlopen

from bs4 import BeautifulSoup
from utils import write_data


def get_past_data():
    with open("./data/koreaTotalCumulativeData.js", "r", encoding="UTF-8-sig") as f:
        data = f.read()
        obj = (
            data[data.find("[") : data.rfind("]") + 1]
            .replace("\n", "")
            .replace("\t", "")
        )
    return json.loads(obj)


def get_today_data(url, data):
    today = date.today()
    day = today.strftime(f"{today.month}/{today.day}")

    if data[-1][0] != day:
        html = urlopen(url)
        source = html.read()
        html.close()

        soup = BeautifulSoup(source, "html.parser")
        tables = soup.find("div", class_="data_table mgt16").find_all("td")

        num = [element.get_text() for element in tables]

        before_tot = data[-1][1]
        today_tot = int(num[0].replace(",", ""))
        diff = today_tot - before_tot
        death = int(num[3])
        release = int(num[1].replace(",", ""))

        data.append([day, today_tot, diff, death, release])

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

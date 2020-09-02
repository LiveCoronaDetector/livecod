import requests

from bs4 import BeautifulSoup
from utils import write_data


def get_data(url):
    start = end = 0
    ageDeathsPer = []
    html = requests.get(url).text
    soup = BeautifulSoup(html, "html.parser")
    data = soup.select(".num > tbody > tr")

    for i, datum in enumerate(data):
        text = datum.get_text()
        if "80 이상" in text:
            start = i
        elif "0-9" in text:
            end = i

    for datum in data[start: end + 1]:
        temp = [i.text.replace("\xa0", "") for i in datum]
        labels = ["구분", "확진자(%)", "사망자(%)", "치명율"]
        ageDeathsPer.append(dict(zip(labels, temp)))

    return ageDeathsPer


def run():
    ageDeathsPer = get_data(
        "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun="
    )

    save_dir = "./data/current_korea_fatality.json"
    crawler_name = "crawl_korea_fatality.py"

    write_data(ageDeathsPer, save_dir, crawler_name)


print("⚙ [한국 치명률] Starting")
run()
print("✔ [한국 치명률] Updated current_korea_fatality.json")
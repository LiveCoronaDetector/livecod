import requests

from bs4 import BeautifulSoup
from utils import write_data


def get_data(url):
    ageDeathsPer = []
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')
    data = soup.select('.num > tbody > tr')[-9:]

    for datum in data:
        temp = [i.text.replace('\xa0', '') for i in datum]
        ageDeathsPer.append({
            '구분': temp[0],
            '확진자(%)': temp[1],
            '사망자(%)': temp[2],
            '치명율': temp[3]
        })

    return ageDeathsPer


def run():
    ageDeathsPer = get_data(
        "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=")

    save_dir = './data/koreaAgeDeathsPerData.js'
    crawler_name = 'crawlKoreaAgeDeathsPerData.py'
    var_name = 'ageDeathsPer'

    write_data(ageDeathsPer, save_dir, crawler_name, var_name)


print("#####################################")
print("############ 한국 나이별 치명율 데이터 #############")
print("######## koreaAgeStatusData.js #########")

run()

print("############### 완료!! ###############")
print("#####################################")

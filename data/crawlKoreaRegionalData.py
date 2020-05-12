import requests

from bs4 import BeautifulSoup
from utils import write_data


def get_data(url):
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')
    updated = soup.select('.timetable > .info > span')[0].text  # 업데이트날짜
    data = soup.select('.rpsa_detail > div > div')
    data.pop()
    return data, updated


def parse_data(data, updated):
    confirmed_region = []  # 시도별확진자

    for i, d in enumerate(data):
        region = d.find_all('h4', class_='cityname')[0].text  # 지역이름
        temp = d.find_all('span', class_='num')
        confirmed, _, recovered, deaths, confirmed_rate = [
            element.text.replace(',', '') for element in temp]
        confirmed = int(confirmed)  # 확진자수
        recovered = int(recovered)  # 격리해제수
        deaths = int(deaths)  # 사망자수
        confirmed_rate = float(confirmed)  # 십만명당발생율

        if i != 0:
            slicing = d.find_all('p', class_='citytit')[0].text
            confirmed_region_rate = float(
                slicing[:slicing.find('%')])  # 지역별확진자비율
        else:
            confirmed_region_rate = ''

        confirmed_region.append({
            '지역이름': region,
            '확진자수': confirmed,
            '격리해제수': recovered,
            '사망자수': deaths,
            '십만명당발생율': confirmed_rate,
            '지역별확진자비율': confirmed_region_rate,
        })

    confirmed_region.append({'업데이트날짜': updated})

    return confirmed_region


def run():
    data, updated = get_data(
        "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=13&ncvContSeq=&contSeq=&board_id=&gubun=")

    confirmed_region = parse_data(data, updated)

    save_dir = './data/koreaRegionalData.js'
    crawler_name = 'crawlKoreaRegionalData.py'
    var_name = 'koreaRegionalData'

    write_data(confirmed_region, save_dir, crawler_name, var_name)


print("#####################################")
print("############ 한국 지역별 데이터 #############")
print("######## koreaRegionalData.js #########")

run()

print("############### 완료!! ###############")
print("#####################################")

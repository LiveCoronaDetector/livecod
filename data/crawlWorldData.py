"""아래 사이트에서 세계 데이터 수집

https://www.worldometers.info/coronavirus/
"""


import json
import re
import ast
import requests
from bs4 import BeautifulSoup
from data.previousWorldData import previous_data


URL = "https://www.worldometers.info/coronavirus/"
TOP_NUM = 5  # 수집할 상위 국가 수
SUB_URLS = []  # 수집할 상위 국가의 서브 페이지 url  [[나라 이름1, url1], ...]


def get_perday_data():
    """상위 TOP_NUM개의 국가의 일일 데이터 수집

    Returns:
        (list) [{나라이름1: {날짜별 확진자 수}}, ...]
    """
    def search_cate_data(text):
        ptr_cate = re.compile(r"categories:[\d\w\s:\'\",\[]*\]")
        ptr_data = re.compile(r"data:[\d\w\s:\'\",\[]*\]")

        category = ptr_cate.search(text).group()[12:].strip()  # 날짜
        category = ast.literal_eval(category)
        data = ptr_data.search(text).group()[5:].strip()
        data = ast.literal_eval(data)

        return dict(zip(category, data))

    per_data = []

    ptr1 = re.compile(r"Highcharts\.chart\('coronavirus-cases-linear',[\d\w\s#:\'\",\(\)\[\]{}]*;")
    # ptr2 = re.compile(r"Highcharts\.chart\('coronavirus-deaths-linear',[\d\w\s#:\'\",\(\)\[\]{}]*;")

    for country, sub_url in SUB_URLS:
        html = requests.get(sub_url).text
        soup = BeautifulSoup(html, "html.parser")
        script_data = soup.find_all("script", type="text/javascript")

        for script_datum in enumerate(script_data):
            script_datum = str(script_datum)
            if ptr1.search(script_datum):
                confirm_dict = search_cate_data(script_datum)
                per_data.append({"Name": country, "확진자수": confirm_dict})
            # if ptr2.search(script_datum):
            #     death_dict = search_cate_data(script_datum)
            #     print(death_dict)

    return per_data


def remove_continent(lst_of_dic, continent):
    """대륙 이름 삭제

    Args:
        lst_of_dic:
        continent:

    Returns:

    """
    lst_of_dic = list(filter(lambda x: x['Name'] != continent, lst_of_dic))
    return lst_of_dic


def preprocess_text(num_text):
    """데이터를 저장하기 전 필요한 전처리 실행

    Args:
        num_text: 크롤링한 string 숫자 데이터

    Returns:
        전처리가 끝난 int 숫자 데이터
    """
    new_text = num_text.strip().replace(',', '')
    if not new_text:
        return 0
    return int(new_text)


def get_world_data():
    """데이터 수집 (크롤링 실행되는 함수)

    Returns:
        (list) 새로 크롤링한 데이터  [{나라1}, {나라2}, ...]
    """
    html = requests.get(URL).text
    soup = BeautifulSoup(html, "html.parser")
    data = soup.select("#main_table_countries_today > tbody > tr")

    world_confirmed = []

    for datum in data:
        datum_values = datum.find_all("td")
        country = datum_values[0].text
        if country.strip() in ['S. Korea', 'Total:']:
            print("skip [ {} ]".format(country))
            continue

        if len(SUB_URLS) < TOP_NUM:
            try:
                sub_url = datum_values[0].find("a")["href"]
                SUB_URLS.append([country, "".join([URL, sub_url])])
            except:
                pass

        confirmed = datum_values[1].text
        deaths = datum_values[3].text
        recovered = datum_values[5].text

        # test code : print("strip data : \t",country\t, confirmed\t, deaths\t, recovered)

        country_kr = ''
        country_ch = ''

        for value in previous_data:
            if value['Name_en'] == country.strip():
                country_kr = value['Name']
                country_ch = value['Name_ch']

        # 지도 SVG 이름 동기화 ('USA'는 크롤링된 영어 이름)
        if country.strip() == 'USA':
            country = 'United States'

        # 한국어 이름이 필드에 없을 경우 영어 이름 삽입
        if country_kr == '':
            country_kr = country.strip()

        world_confirmed.append({
            'Name': country_kr,
            'Name_ch': country_ch,
            'Name_en': country.strip(),
            '확진자수': preprocess_text(confirmed),
            '사망자수': preprocess_text(deaths),
            '완치자수': preprocess_text(recovered)

        })

    # 대륙 이름 필터링
    world_confirmed = remove_continent(world_confirmed, 'North America')
    world_confirmed = remove_continent(world_confirmed, 'Europe')
    world_confirmed = remove_continent(world_confirmed, 'Asia')
    world_confirmed = remove_continent(world_confirmed, 'South America')
    world_confirmed = remove_continent(world_confirmed, 'Oceania')
    world_confirmed = remove_continent(world_confirmed, 'Africa')
    world_confirmed = remove_continent(world_confirmed, 'World')
    world_confirmed = remove_continent(world_confirmed, '')

    return world_confirmed


def write_data(world_confirmed, save_path):
    """크롤링한 데이터 저장

    Args:
        world_confirmed: 크롤링한 데이터
    """
    # cur_path = os.getcwd()  # test code for Windows
    #./data/
    # with open(cur_path+"\worldData.js", "w", encoding='UTF-8-sig') as jfile:  # test code for Windows
    with open(save_path, "w", encoding='UTF-8-sig') as jfile:
        json.dump(world_confirmed, jfile, ensure_ascii=False, indent=4)
        # file.write(json.dumps(dict, ensure_ascii=False))

    data = ''

    # with open(cur_path+"\worldData.js", "r", encoding='UTF-8-sig') as f:  # test code for Windows
    with open(save_path, "r", encoding='UTF-8-sig') as f:
        while True:
            line = f.readline()
            if not line:
                break
            data += line
    data = '//Auto-generated by crawlWorldData.py\nvar marker = ' + data + ';'

    # with open(cur_path+"\worldData.js", "w", encoding='UTF-8-sig') as f_write:  # test code for Windows
    with open(save_path, "w", encoding='UTF-8-sig') as f_write:
        f_write.write(data)


def run():
    """전체 프로세스 실행"""
    world_confirmed = get_world_data()
    perday_data = get_perday_data()

    write_data(world_confirmed, "./worldData.js")
    write_data(perday_data, "./worldPerDayData.js")

if __name__ == "__main__":
    print("#####################################")
    print("############ 세계 데이터 #############")
    print("######## worldData.js #########")

    run()

    print("############### 완료!! ###############")
    print("#####################################")

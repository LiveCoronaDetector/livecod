"""아래 사이트에서 세계 데이터 수집

https://www.worldometers.info/coronavirus/
"""


import ast
import re

import requests

from bs4 import BeautifulSoup
from utils import write_data

URL = "https://www.worldometers.info/coronavirus/"
TOP_NUM = 5  # 수집할 상위 국가 수
SUB_URLS = []  # 수집할 상위 국가의 서브 페이지 url  [[나라 이름1, url1], ...]
country_names = [
    {"Name": "이란", "Name_en": "Iran", "Name_ch": "伊朗"},
    {"Name": "이집트", "Name_en": "Egypt", "Name_ch": "埃及"},
    {"Name": "루마니아", "Name_en": "Romania", "Name_ch": "尼亚"},
    {"Name": "벨기에", "Name_en": "Belgium", "Name_ch": "比利时"},
    {"Name": "벨라루스", "Name_en": "Belarus", "Name_ch": "白俄罗斯"},
    {"Name": "스페인", "Name_en": "Spain", "Name_ch": "西班牙"},
    {"Name": "스웨덴", "Name_en": "Sweden", "Name_ch": "瑞典语"},
    {"Name": "덴마크", "Name_en": "Denmark", "Name_ch": "丹麦"},
    {"Name": "노르웨이", "Name_en": "Norway", "Name_ch": "挪威"},
    {"Name": "이탈리아", "Name_en": "Italy", "Name_ch": "义大利"},
    {"Name": "아제르바이잔", "Name_en": "Azerbaijan", "Name_ch": "阿塞拜疆"},
    {"Name": "러시아", "Name_en": "Russia", "Name_ch": "俄罗斯"},
    {"Name": "파키스탄", "Name_en": "Pakistan", "Name_ch": "巴基斯坦"},
    {"Name": "캐나다", "Name_en": "Canada", "Name_ch": "加拿大"},
    {"Name": "터키", "Name_en": "Turkey", "Name_ch": "土耳其"},
    {"Name": "미국", "Name_en": "USA", "Name_ch": "美国"},
    {"Name": "핀란드", "Name_en": "Finland", "Name_ch": "芬兰"},
    {"Name": "체코", "Name_en": "Czechia", "Name_ch": "捷克"},
    {"Name": "프랑스", "Name_en": "France", "Name_ch": "法国"},
    {"Name": "영국", "Name_en": "UK", "Name_ch": "英国"},
    {"Name": "네덜란드", "Name_en": "Netherlands", "Name_ch": "荷兰"},
    {"Name": "네팔", "Name_en": "Nepal", "Name_ch": "尼泊尔"},
    {"Name": "팔레스타인", "Name_en": "Palestine", "Name_ch": "巴勒斯坦"},
    {"Name": "마카오", "Name_en": "Macao", "Name_ch": "澳门"},
    {"Name": "홍콩", "Name_en": "Hong Kong", "Name_ch": "香港"},
    {"Name": "태국", "Name_en": "Thailand", "Name_ch": "泰国"},
    {"Name": "호주", "Name_en": "Australia", "Name_ch": "澳大利亚"},
    {"Name": "싱가포르", "Name_en": "Singapore", "Name_ch": "新加坡"},
    {"Name": "포르투갈", "Name_en": "Portugal", "Name_ch": "葡萄牙"},
    {"Name": "조지아", "Name_en": "Georgia", "Name_ch": "格鲁吉亚"},
    {"Name": "레바논", "Name_en": "Lebanon", "Name_ch": "黎巴嫩"},
    {"Name": "이스라엘", "Name_en": "Israel", "Name_ch": "以色列"},
    {"Name": "에스토니아", "Name_en": "Estonia", "Name_ch": "爱沙尼亚"},
    {"Name": "말레이시아", "Name_en": "Malaysia", "Name_ch": "马来西亚"},
    {"Name": "캄보디아", "Name_en": "Cambodia", "Name_ch": "柬埔寨"},
    {"Name": "베트남", "Name_en": "Vietnam", "Name_ch": "越南"},
    {"Name": "필리핀", "Name_en": "Philippines", "Name_ch": "菲律宾"},
    {"Name": "대만", "Name_en": "Taiwan", "Name_ch": "台湾"},
    {"Name": "스리랑카", "Name_en": "Sri Lanka", "Name_ch": "斯里兰卡"},
    {"Name": "카타르", "Name_en": "Qatar", "Name_ch": "卡塔尔"},
    {"Name": "사우디아라비아", "Name_en": "Saudi Arabia", "Name_ch": "沙特阿拉伯"},
    {"Name": "버진아일랜드", "Name_en": "Virgin Islands", "Name_ch": "维尔京群岛"},
    {"Name": "인도네시아", "Name_en": "Indonesia", "Name_ch": "印度尼西亚"},
    {"Name": "뉴질랜드", "Name_en": "NewZealand", "Name_ch": "新西兰"},
    {"Name": "아르헨티나", "Name_en": "Argentine", "Name_ch": "阿根廷"},
    {"Name": "보스니아 헤르체고비나", "Name_en": "Bosnia and Herzegovina", "Name_ch": "波斯尼亚和黑塞哥维那"},
    {"Name": "마케도니아", "Name_en": "Macedonia", "Name_ch": "马其顿"},
    {"Name": "나이지리아", "Name_en": "Nigeria", "Name_ch": "尼日利亚"},
    {"Name": "리투아니아", "Name_en": "Lithania", "Name_ch": "立陶宛"},
    {"Name": "룩셈부르크", "Name_en": "Luxembourg", "Name_ch": "卢森堡"},
    {"Name": "모로코", "Name_en": "Morocco", "Name_ch": "摩洛哥"},
    {"Name": "모나코", "Name_en": "Monaco", "Name_ch": "摩纳哥"},
    {"Name": "아르메니아", "Name_en": "Armenia", "Name_ch": "亚美尼亚"},
    {"Name": "도미니카 공화국", "Name_en": "Dominican Republic", "Name_ch": "多明尼加共和国"},
    {"Name": "카메룬", "Name_en": "Cameroon", "Name_ch": "喀麦隆"},
    {"Name": "토고", "Name_en": "Togo", "Name_ch": "多哥"},
    {"Name": "콜롬비아", "Name_en": "Colombia", "Name_ch": "哥伦比亚"},
    {"Name": "바티칸 시국", "Name_en": "Vatican City State", "Name_ch": "梵蒂冈市国"},
    {"Name": "페루", "Name_en": "Peru", "Name_ch": "秘鲁"},
    {"Name": "요르단", "Name_en": "Jordan", "Name_ch": "约旦"},
    {"Name": "라트비아", "Name_en": "Latvia", "Name_ch": "约旦"},
    {"Name": "안도라", "Name_en": "Andorra", "Name_ch": "安道尔"},
    {"Name": "튀니지", "Name_en": "Tunisie", "Name_ch": "突尼斯"},
    {"Name": "우크라이나", "Name_en": "Ukraina", "Name_ch": "乌克兰"},
    {"Name": "리히텐슈타인", "Name_en": "Liechtenstein", "Name_ch": "列支敦士登"},
    {"Name": "폴란드", "Name_en": "Poland", "Name_ch": "波兰"},
    {"Name": "페로 제도", "Name_en": "Faroe Islands", "Name_ch": "法罗群岛"},
    {"Name": "남아프리카 공화국", "Name_en": "South Africa", "Name_ch": "南非共和国"},
    {"Name": "코스타리카", "Name_en": "Costa Rica", "Name_ch": "哥斯达黎加"},
    {"Name": "지브롤터", "Name_en": "Gibraltar", "Name_ch": "直布罗陀"},
    {"Name": "부탄", "Name_en": "Bhutan", "Name_ch": "不丹"},
    {"Name": "세르비아", "Name_en": "Serbia", "Name_ch": "塞尔维亚"},
    {"Name": "세네갈", "Name_en": "Senegal", "Name_ch": "塞内加尔"},
    {"Name": "칠레", "Name_en": "Chile", "Name_ch": "智利"},
    {"Name": "헝가리", "Name_en": "Hungary", "Name_ch": "匈牙利"},
    {"Name": "독일", "Name_en": "Germany", "Name_ch": "德国"},
    {"Name": "인도", "Name_en": "India", "Name_ch": "印度"},
    {"Name": "아랍에미리트", "Name_en": "UAE", "Name_ch": "阿拉伯联合酋长国"},
    {"Name": "중국", "Name_en": "China", "Name_ch": "中国"},
    {"Name": "일본", "Name_en": "Japan", "Name_ch": "日本"},
    {"Name": "일본크루즈", "Name_en": "Diamond Princess", "Name_ch": "日本 邮轮"},
    {"Name": "쿠웨이트", "Name_en": "Kuwait", "Name_ch": "科威特"},
    {"Name": "이라크", "Name_en": "Iraq", "Name_ch": "伊拉克"},
    {"Name": "바레인", "Name_en": "Bahrain", "Name_ch": "巴林"},
    {"Name": "오만", "Name_en": "Oman", "Name_ch": "阿曼"},
    {"Name": "오스트리아", "Name_en": "Austria", "Name_ch": "奥地利"},
    {"Name": "아이슬란드", "Name_en": "Ireland", "Name_ch": "爱尔兰"},
    {"Name": "아일랜드", "Name_en": "Ireland", "Name_ch": "冰岛"},
    {"Name": "슬로베니아", "Name_en": "Slovenia", "Name_ch": "斯洛文尼亚"},
    {"Name": "슬로바키아", "Name_en": "Slovakia", "Name_ch": "斯洛伐克"},
    {"Name": "그리스", "Name_en": "Greece", "Name_ch": "希腊"},
    {"Name": "아프가니스탄", "Name_en": "Afghanistan", "Name_ch": "阿富汗"},
    {"Name": "알제리", "Name_en": "Algeria", "Name_ch": "阿尔及利亚"},
    {"Name": "크로아티아", "Name_en": "Croatia", "Name_ch": "克罗地亚"},
    {"Name": "스위스", "Name_en": "Switzerland", "Name_ch": "瑞士"},
    {"Name": "브라질", "Name_en": "Brazil", "Name_ch": "巴西"},
    {"Name": "산마리노", "Name_en": "San Marino", "Name_ch": "圣马力诺"},
    {"Name": "에콰도르", "Name_en": "Ecuador", "Name_ch": "厄瓜多尔"},
    {"Name": "멕시코", "Name_en": "Mexico", "Name_ch": "墨西哥"},
    {"Name": "한국", "Name_en": "Korea, Republic of", "Name_ch": "韩国"},
    {"Name": "제주", "Name_en": "Jeju", "Name_ch": "濟州"},
]


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

    ptr1 = re.compile(
        r"Highcharts\.chart\('coronavirus-cases-linear',[\d\w\s#:\'\",\(\)\[\]{}]*;")
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
    str_text = num_text.strip().replace(',', '')

    try:
        return int(str_text)
    except ValueError:
        return 0


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
        country = datum_values[1].text
        if country.strip() in ['S. Korea', 'Total:']:
            continue

        if len(SUB_URLS) < TOP_NUM:
            try:
                sub_url = datum_values[1].find("a")["href"]
                SUB_URLS.append([country, "".join([URL, sub_url])])
            except:
                pass

        confirmed = datum_values[2].text
        deaths = datum_values[4].text
        recovered = datum_values[6].text

        # test code : print("strip data : \t",country\t, confirmed\t, deaths\t, recovered)

        country_kr = ''
        country_ch = ''

        for value in country_names:
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
            'confirmed': preprocess_text(confirmed),
            'deaths': preprocess_text(deaths),
            'recovered': preprocess_text(recovered)

        })

    # 대륙 이름 필터링
    continents = ['North America', 'Europe', 'Asia',
                  'South America', 'Oceania', 'Africa', 'World', '']

    for continent in continents:
        world_confirmed = remove_continent(world_confirmed, continent)

    return world_confirmed


def run():
    """전체 프로세스 실행"""
    world_confirmed = get_world_data()
    perday_data = get_perday_data()

    world_confirmed_save_dir = './data/current_global.json'
    perday_save_dir = './data/global_per_day.json'
    crawler_name = 'crawl_global.py'

    write_data(world_confirmed, world_confirmed_save_dir, crawler_name)
    write_data(perday_data, perday_save_dir, crawler_name)


print("⚙ [세계 데이터 수집] Starting")
run()
print("✔ [세계 데이터 수집] Updated current_global.json, global_per_day.json")
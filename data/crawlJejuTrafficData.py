import requests

from bs4 import BeautifulSoup
from selenium import webdriver
from utils import write_data


def get_data(url):
    try:
        # config from https://velog.io/@king/weather-alert
        options = webdriver.ChromeOptions()
        options.add_argument("start-maximized")
        options.add_argument("lang=ko_KR")
        options.add_argument("headless")
        options.add_argument("window-size=1920x1080")
        options.add_argument("disable-gpu")
        options.add_argument("--no-sandbox")
        driver = webdriver.Chrome("chromedriver", chrome_options=options)
        driver.get(url)
        html = driver.page_source
        driver.quit()
        soup = BeautifulSoup(html, "html.parser")
        data = soup.select("tbody > tr")
        return data
    except Exception as e:
        print(e)
        driver.quit()


def build_title(raw_title):
    new_title = raw_title.replace("(", "").replace(")", "")
    if "번" in new_title:
        return f"{new_title}째 확진자"
    elif "제주" in new_title:
        num = new_title.split("제주")[-1]
        return f"{num}번째 확진자"
    return f"{new_title} 확진자"


def parse_data(data):
    res = []
    ROOT_URL = "https://www.jeju.go.kr"
    for tr in data:
        a_tag = tr.find("a")
        if a_tag and a_tag.text == "자세히보기":
            title = build_title(tr.select_one("td").text)
            url = ROOT_URL + a_tag["href"]
            res.append({"title": title, "url": url})
    return res


def run():
    data = get_data("https://www.jeju.go.kr/corona19.jsp#corona-main")
    parsed_data = parse_data(data)

    save_dir = "./data/jejuTrafficData.js"
    crawler_name = "crawlJejuTrafficData.py"
    var_name = "jejuTrafficData"

    write_data(parsed_data, save_dir, crawler_name, var_name)


print("#####################################")
print("############ 제주 확진자 동선 데이터 #############")
print("######## jejuTrafficData.js #########")

run()

print("############### 완료!! ###############")
print("#####################################")

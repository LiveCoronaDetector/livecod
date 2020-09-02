import requests

from bs4 import BeautifulSoup
from utils import write_data


def get_data(url):
    html = requests.get(url).text
    soup = BeautifulSoup(html, "html.parser")
    data = soup.select("article > h3 > a")
    idx = [0, 4, 8, 12, 16, 20, 24, 25, 26, 27]
    return [data[i] for i in idx]


def parse_data(data, url):
    res = []
    for tag in data:
        raw_url = url + tag["href"][1:]
        redirect = requests.get(raw_url)
        res.append({"title": tag.get_text(), "link": redirect.url})
    return res


def run():
    data = get_data(
        "https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNREZqY0hsNUVnSmxiaWdBUAE/sections/CAQqEAgAKgcICjCcuZcLMI_irgMwwLvMBg?hl=en-US&gl=US&ceid=US%3Aen"
    )
    parsed_data = parse_data(data, "https://news.google.com")

    save_dir = "./data/news_google.json"
    crawler_name = "crawl_news_google.py"

    write_data(parsed_data, save_dir, crawler_name)


print("⚙ [뉴스 구글] Starting")
run()
print("✔ [뉴스 구글] Updated news_google.json")


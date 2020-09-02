from crawl_news_naver import get_data, parse_data
from utils import write_data


def run():
    data = get_data(
        "https://search.naver.com/search.naver?where=news&query=제주도%20코로나%20확진자"
    )
    parsed_data = parse_data(data)

    save_dir = "./data/news_jeju.json"
    crawler_name = "crawl_news_jeju.py"

    write_data(parsed_data, save_dir, crawler_name)


print("⚙ [뉴스 네이버 (제주)] Starting")
run()
print("✔ [뉴스 네이버 (제주)] Updated news_jeju.json")

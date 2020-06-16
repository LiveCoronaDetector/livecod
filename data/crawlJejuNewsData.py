from crawlKoreaNewsData import get_data, parse_data
from utils import write_data


def run():
    data = get_data(
        "https://search.naver.com/search.naver?where=news&query=제주도%20코로나%20확진자"
    )
    parsed_data = parse_data(data)

    save_dir = "./data/jejuNewsData.js"
    crawler_name = "crawlJejuNewsData.py"
    var_name = "jejuNewsData"

    write_data(parsed_data, save_dir, crawler_name, var_name)


print("#####################################")
print("############ 제주도 뉴스 데이터 #############")
print("######## jejuNewsData.js #########")

run()

print("############### 완료!! ###############")
print("#####################################")

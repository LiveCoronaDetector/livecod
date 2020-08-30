from utils import get_raw_data, write_data


def extract_data(total_data, return_dates=False):
    index = total_data[0].index('2/1/20')
    for i in total_data:
        if i[1] == 'Korea, South':
            korea_data = list(map(int, i[index:]))
            break
    if return_dates:
        korea_date = total_data[0][index:]
        korea_date = [i[:-3] for i in korea_date]
        return korea_data, korea_date
    return korea_data


def build_result(korea_data):
    result = []
    for i, _ in enumerate(korea_data):
        if not i:
            diff = 1
        else:
            diff = korea_data[i][1] - korea_data[i - 1][1]
        result.append([
            korea_data[i][0],
            korea_data[i][1],
            diff,
            korea_data[i][2],
            korea_data[i][3]
        ])
    return result


def run():
    confirmed_CSV_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
    deaths_CSV_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
    recovered_CSV_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'

    confirmed_total_data = get_raw_data(confirmed_CSV_URL)
    deaths_total_data = get_raw_data(deaths_CSV_URL)
    recovered_total_data = get_raw_data(recovered_CSV_URL)

    korea_confirmed = extract_data(confirmed_total_data)
    korea_recovered = extract_data(recovered_total_data)
    korea_deaths, date = extract_data(deaths_total_data, return_dates=True)
    korea_data = list(zip(date, korea_deaths, korea_confirmed, korea_recovered))

    result = build_result(korea_data)

    save_dir = './data/koreaRegionalCumulativeData.js'
    crawler_name = 'crawlKoreaRegionalCumulativeData.py'
    var_name = 'koreaRegionalCumulativeData'

    write_data(result, save_dir, crawler_name, var_name)


print("#####################################")
print("############ 한국 지역별 누적 데이터 #############")
print("######## koreaRegionalCumulativeData.js #########")

run()

print("############### 완료!! ###############")
print("#####################################")

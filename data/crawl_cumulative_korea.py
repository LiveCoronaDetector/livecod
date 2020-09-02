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
        if i == 0:
            confirmed_delta = 0
            recovered_delta = 0
            deaths_delta = 0
        else:
            confirmed_delta = korea_data[i][2] - korea_data[i - 1][2]
            recovered_delta = korea_data[i][3] - korea_data[i - 1][3]
            deaths_delta = korea_data[i][1] - korea_data[i - 1][1]
        result.append({
            'date': korea_data[i][0],
            'quarantine': korea_data[i][2] - korea_data[i][3] - korea_data[i][1],
            'confirmed': korea_data[i][2],
            'confirmed_delta': confirmed_delta,
            'recovered': korea_data[i][3],
            'recovered_delta': recovered_delta,
            'deaths': korea_data[i][1],
            'deaths_delta': deaths_delta,
        })
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

    save_dir = './data/cumulative_korea.json'
    crawler_name = 'crawl_cumulative_korea.py'

    write_data(result, save_dir, crawler_name)


print("⚙ [한국 누적] Starting")
run()
print("✔ [한국 누적] Updated cumulative_korea.json")
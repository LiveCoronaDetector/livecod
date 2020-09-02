import pandas as pd
from utils import write_data


def build_dataframe(url, return_dates=False):
    df = pd.read_csv(url)
    df.drop(df.columns[:4], axis=1, inplace=True)
    series = df.sum().astype(str)
    if return_dates:
        dates = [date[:-3] for date in series.index]
        return series.values.astype(float), dates
    return series.values.astype(float)


def parse_data(data):
    confirmed = []

    for detail in data:
        confirmed.append({
            'date': detail[0],
            'confirmed': detail[1],
            'deaths': detail[2],
            'recovered': detail[3],
        })

    return confirmed


def run():
    confirmed_CSV_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    deaths_CSV_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
    recovered_CSV_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"

    confirmed_result, dates = build_dataframe(confirmed_CSV_URL, True)
    deaths_result = build_dataframe(deaths_CSV_URL)
    recover_result = build_dataframe(recovered_CSV_URL)

    resultData = list(zip(dates, confirmed_result, deaths_result, recover_result))

    save_dir = './data/cumulative_global.json'
    crawler_name = 'crawl_cumulative_global.py'

    write_data(parse_data(resultData), save_dir, crawler_name)


print("⚙ [세계 누적] Starting")
run()
print("✔ [세계 누적] Updated cumulative_global.json")

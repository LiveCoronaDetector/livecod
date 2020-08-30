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


def run():
    confirmed_CSV_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
    deaths_CSV_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
    recovered_CSV_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"

    confirmed_result, dates = build_dataframe(confirmed_CSV_URL, True)
    deaths_result = build_dataframe(deaths_CSV_URL)
    recover_result = build_dataframe(recovered_CSV_URL)

    resultData = list(
        zip(dates, confirmed_result, deaths_result, recover_result)
    )

    save_dir = "./data/worldCumulativeData.js"
    crawler_name = "crawlWorldCumulativeData.py"
    var_name = "worldCumulativeData"

    write_data(resultData, save_dir, crawler_name, var_name)


print("#####################################")
print("############ 세계 누적 데이터 #############")
print("######## worldCumulativeData.js #########")

run()

print("############### 완료!! ###############")
print("#####################################")

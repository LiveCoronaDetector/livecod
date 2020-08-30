from utils import get_raw_data, write_data


def build_total_data(confirmed_total_data):
    date = [i[:-3] for i in confirmed_total_data[0][4:]]
    num_date = len(date)
    total_data = [{'date': date}]

    for count in range(1, len(confirmed_total_data) - 1):  # len(confirmed_total_data) 464
        try:
            if (confirmed_total_data[count][1] == deaths_total_data[count][1] == recovered_total_data[count][1]):
                d = {
                    'name': confirmed_total_data[count][1],
                    'province/state': confirmed_total_data[count][0],
                    'confirmed': confirmed_total_data[count][4:],
                    'deaths': deaths_total_data[count][4:],
                    'recovered': recovered_total_data[count][4:]
                }
                total_data.append(d)
        except IndexError:
            print("Index Error ignored")

    return total_data, num_date


def write_country_data(country, num_date, total_data):
    sum_confirmed = [0] * num_date
    sum_deaths = [0] * num_date
    sum_recovered = [0] * num_date

    for i in total_data[1:]:
        if i['name'] == country:
            for j in range(num_date):
                sum_confirmed[j] += int(i['confirmed'][j])
                sum_deaths[j] += int(i['deaths'][j])
                sum_recovered[j] += int(i['recovered'][j])

    return {'name': country,
            'province/state': 'total',
            'confirmed': sum_confirmed,
            'deaths': sum_deaths,
            'recovered': sum_recovered}


def concat_countries_data(total_data, num_date, countries):
    final_data = total_data
    for country in countries:
        country_data = write_country_data(country, num_date, total_data)
        final_data.append(country_data)
    return final_data


def run():
    confirmed_CSV_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
    deaths_CSV_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
    recovered_CSV_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'

    confirmed_total_data = get_raw_data(confirmed_CSV_URL)
    deaths_total_data = get_raw_data(deaths_CSV_URL)
    recovered_total_data = get_raw_data(recovered)

    total_data, num_date = build_total_data(confirmed_total_data)

    countries = ['US', 'United Kingdom', 'Australia', 'Canada',
                 'China', 'Congo', 'Denmark', 'France', 'Netherlands']

    final_data = concat_countries_data(total_data, num_date, countries)

    save_dir = './data/HopkinsCoronaWorldData.js'
    crawler_name = 'Hopkins_world_data_parser.py'
    var_name = 'hopkinsData'

    write_data(final_data, save_dir, crawler_name, var_name)



print("#####################################")
print("############ 홉킨스 국가별 데이터 #############")
print("######## HopkinsCoronaWorldData.js #########")

run()

print("############### 완료!! ###############")
print("#####################################")

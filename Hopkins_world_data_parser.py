import requests, re, json, csv
import numpy as np
import pandas as pd

confirmed_CSV_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
deaths_CSV_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
recovered_CSV_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'

confirmed_total_data = []
deaths_total_data = []
recovered_total_data = []

with requests.Session() as s:
    download = s.get(confirmed_CSV_URL)
    decoded_content = download.content.decode('utf-8')
    cr = csv.reader(decoded_content.splitlines(), delimiter=',')
    my_list = list(cr)
    for row in my_list:
        confirmed_total_data.append(row)

with requests.Session() as s:
    download = s.get(deaths_CSV_URL)
    decoded_content = download.content.decode('utf-8')
    cr = csv.reader(decoded_content.splitlines(), delimiter=',')
    my_list = list(cr)
    for row in my_list:
        deaths_total_data.append(row)

with requests.Session() as s:
    download = s.get(recovered_CSV_URL)
    decoded_content = download.content.decode('utf-8')
    cr = csv.reader(decoded_content.splitlines(), delimiter=',')
    my_list = list(cr)
    for row in my_list:
        recovered_total_data.append(row)

total_data = []
date = [i[:-3] for i in confirmed_total_data[0][4:]]
total_data.append({'date':date})
total_data


for count in range(1, len(confirmed_total_data)-1):  # len(confirmed_total_data) 464
    try:
        if (confirmed_total_data[count][1] == deaths_total_data[count][1] == recovered_total_data[count][1]):
            d = {
                'name' : confirmed_total_data[count][1],
                'province/state': confirmed_total_data[count][0],
                'confirmed': confirmed_total_data[count][4:],
                'deaths' : deaths_total_data[count][4:],
                'recovered' : recovered_total_data[count][4:],
            }
            total_data.append(d)
    except IndexError:
        print("Index Error ignored")
# US sum
sum_US_confirmed = [0] * len(date)
sum_US_deaths = [0] * len(date)
sum_US_recovered = [0] * len(date)

for i in total_data[1:]:
    if i['name'] == 'US':
        for j in range(len(date)):
            sum_US_confirmed[j] += int(i['confirmed'][j])
            sum_US_deaths[j] += int(i['deaths'][j])
            sum_US_recovered[j] += int(i['recovered'][j])

total_data.append({
    'name' : 'US',
    'province/state': 'total',
    'confirmed': sum_US_confirmed,
    'deaths' : sum_US_deaths,
    'recovered' : sum_US_recovered,
})

# UK sum
sum_UK_confirmed = [0] * len(date) # 55
sum_UK_deaths = [0] * len(date)
sum_UK_recovered = [0] * len(date)

for i in total_data[1:] :
    if i['name'] =='United Kingdom' :
        for j in range(len(date)) :
            sum_UK_confirmed[j] += int(i['confirmed'][j])
            sum_UK_deaths[j] += int(i['deaths'][j])
            sum_UK_recovered[j] += int(i['recovered'][j])

total_data.append({
    'name' : 'United Kingdom',
    'province/state': 'total',
    'confirmed': sum_UK_confirmed,
    'deaths' : sum_UK_deaths,
    'recovered' : sum_UK_recovered,
})

# Australia sum
sum_AT_confirmed = [0] * len(date) # 55
sum_AT_deaths = [0] * len(date)
sum_AT_recovered = [0] * len(date)

for i in total_data[1:] :
    if i['name'] =='Australia' :
        for j in range(len(date)) :
            sum_AT_confirmed[j] += int(i['confirmed'][j])
            sum_AT_deaths[j] += int(i['deaths'][j])
            sum_AT_recovered[j] += int(i['recovered'][j])

total_data.append({
    'name' : 'Australia',
    'province/state': 'total',
    'confirmed': sum_AT_confirmed,
    'deaths' : sum_AT_deaths,
    'recovered' : sum_AT_recovered,
})

# Canada sum
sum_CA_confirmed = [0] * len(date) # 55
sum_CA_deaths = [0] * len(date)
sum_CA_recovered = [0] * len(date)

for i in total_data[1:]:
    if i['name'] == 'Canada':
        for j in range(len(date)):
            sum_CA_confirmed[j] += int(i['confirmed'][j])
            sum_CA_deaths[j] += int(i['deaths'][j])
            sum_CA_recovered[j] += int(i['recovered'][j])

total_data.append({
    'name' : 'Canada',
    'province/state': 'total',
    'confirmed': sum_CA_confirmed,
    'deaths' : sum_CA_deaths,
    'recovered' : sum_CA_recovered,
})

# China sum
sum_CH_confirmed = [0] * len(date) # 55
sum_CH_deaths = [0] * len(date)
sum_CH_recovered = [0] * len(date)

for i in total_data[1:]:
    if i['name'] == 'China':
        for j in range(len(date)):
            sum_CH_confirmed[j] += int(i['confirmed'][j])
            sum_CH_deaths[j] += int(i['deaths'][j])
            sum_CH_recovered[j] += int(i['recovered'][j])

total_data.append({
    'name' : 'China',
    'province/state': 'total',
    'confirmed': sum_CH_confirmed,
    'deaths' : sum_CH_deaths,
    'recovered' : sum_CH_recovered,
})

# Congo sum
sum_CO_confirmed = [0] * len(date) # 55
sum_CO_deaths = [0] * len(date)
sum_CO_recovered = [0] * len(date)

for i in total_data[1:]:
    if i['name'] == 'Congo':
        for j in range(len(date)):
            sum_CO_confirmed[j] += int(i['confirmed'][j])
            sum_CO_deaths[j] += int(i['deaths'][j])
            sum_CO_recovered[j] += int(i['recovered'][j])

total_data.append({
    'name' : 'Congo',
    'province/state': 'total',
    'confirmed': sum_CO_confirmed,
    'deaths' : sum_CO_deaths,
    'recovered' : sum_CO_recovered,
})

# Denmark sum
sum_DM_confirmed = [0] * len(date) # 55
sum_DM_deaths = [0] * len(date)
sum_DM_recovered = [0] * len(date)

for i in total_data[1:]:
    if i['name'] == 'Denmark':
        for j in range(len(date)):
            sum_DM_confirmed[j] += int(i['confirmed'][j])
            sum_DM_deaths[j] += int(i['deaths'][j])
            sum_DM_recovered[j] += int(i['recovered'][j])

total_data.append({
    'name' : 'Denmark',
    'province/state': 'total',
    'confirmed': sum_DM_confirmed,
    'deaths' : sum_DM_deaths,
    'recovered' : sum_DM_recovered,
})

# France sum
sum_FR_confirmed = [0] * len(date) # 55
sum_FR_deaths = [0] * len(date)
sum_FR_recovered = [0] * len(date)

for i in total_data[1:]:
    if i['name'] == 'France':
        for j in range(len(date)):
            sum_FR_confirmed[j] += int(i['confirmed'][j])
            sum_FR_deaths[j] += int(i['deaths'][j])
            sum_FR_recovered[j] += int(i['recovered'][j])

total_data.append({
    'name' : 'France',
    'province/state': 'total',
    'confirmed': sum_FR_confirmed,
    'deaths' : sum_FR_deaths,
    'recovered' : sum_FR_recovered,
})

# Netherlands sum
sum_NE_confirmed = [0] * len(date) # 55
sum_NE_deaths = [0] * len(date)
sum_NE_recovered = [0] * len(date)

for i in total_data[1:]:
    if i['name'] == 'Netherlands':
        for j in range(len(date)):
            sum_NE_confirmed[j] += int(i['confirmed'][j])
            sum_NE_deaths[j] += int(i['deaths'][j])
            sum_NE_recovered[j] += int(i['recovered'][j])

total_data.append({
    'name' : 'Netherlands',
    'province/state': 'total',
    'confirmed': sum_NE_confirmed,
    'deaths' : sum_NE_deaths,
    'recovered' : sum_NE_recovered,
})
with open('./data/HopkinsCoronaWorldData.js', 'w', encoding='utf-8') as make_file :
    json.dump(total_data, make_file, ensure_ascii=False, indent="\t")

data = ''
with open("./data/HopkinsCoronaWorldData.js", "r", encoding='UTF-8-sig') as f:
    while True:
        line = f.readline()
        if not line: break
        data += line
data = '//Auto-generated by Hopkins_world_data_parser.py\nvar hopkinsData = ' + data + ';'

with open("./data/HopkinsCoronaWorldData.js", "w", encoding='UTF-8-sig') as f_write:
    f_write.write(data)
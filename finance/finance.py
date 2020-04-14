import pandas as pd
import numpy as np
import yfinance as yf #Yahoo Finance API
from datetime import datetime as dt, date
import time

df = pd.DataFrame()
tickers = ["^KS11", "^GSPC", "^N225", "^HSI", "^N100", "^FTSE", "^DJI"] 
start_day = dt(2019, 12, 1)
today = str(date.today())

kospi = yf.download('^KS11', start=dt(2005, 1, 1), end=today)

def get_all_index_data(df, tickers, start_day, today):
    for ticker in tickers:
        try:
            print('Stealing from Yahoo Finance ......................\n')
            print('Working on a ticker: ', ticker, '......................\n')
            
            ticker_df = yf.download(ticker, start=start_day, end=today)
            time.sleep(1)
            df_temp = ticker_df.reset_index()
            df_temp = df_temp[['Date','Adj Close']]
            df_temp = df_temp.rename(columns={'Adj Close': ticker})
            df = df.join(df_temp, how='outer', rsuffix='Date')
        except IndexError:
            print('value error')
    df = df.loc[:,~df.columns.str.contains('DateDate', case=False)]
    df = df.dropna()
    df.columns = df.columns.str.replace('^', '')
    print('.....................Done ......................')
    return df
data = get_all_index_data(df, tickers, start_day, today)

def normalize(df):
    df1 = df.iloc[:, 1:].apply(lambda x: np.log(x) - np.log(x.shift(1)))
    df1['Date'] = df['Date']
    df1 = df1[list(df.columns)]
    return df1

def plot(data):
    plt.figure(figsize=(15, 10))
    plt.plot(data.Date, data.KS11, label='KOSPI', color='blue')
    plt.plot(data.Date, data.GSPC, label='S&P 500', color='orange')
    plt.plot(data.Date, data.N225, label='Nikkei 225', color='magenta')
    plt.plot(data.Date, data.HSI, label='Hang Seng Index', color='green')
    plt.plot(data.Date, data.N100, label='Euro 100', color='yellow')
    plt.plot(data.Date, data.FTSE, label='FTSE', color='grey')
    plt.legend(loc='upper left')
    #plt.savefig('SMA-KOSPI.png')
    plt.show()

world_aggregated = 'https://raw.githubusercontent.com/datasets/covid-19/master/data/worldwide-aggregated.csv'
countries_aggregated= 'https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv'
world = pd.read_csv(world_aggregated)
countries = pd.read_csv(countries_aggregated)
#print(corona.head())
#print(countries.head())
korea = countries[countries['Country'].str.contains("Korea, South")]
#print(korea.head())


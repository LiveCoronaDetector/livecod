#!/bin/bash

function run(){
<<<<<<< HEAD
    python data/crawl_cumulative_global.py
    python data/crawl_cumulative_korea.py
    python data/crawl_global.py
    python data/crawl_korea_fatality.py
    python data/crawl_region_korea.py
    python data/crawl_news_google.py
    python data/crawl_news_jeju.py
    python data/crawl_news_naver.py
    python data/crawl_news_naver.py
    python data/crawl_version_info.py
=======
    python data/crawlKoreaAgeDeathsPerData.py
    python data/crawlKoreaRegionalData.py
    python data/crawlKoreaTotalCumulativeData.py
    python data/crawlWorldCumulativeData.py
    python data/crawlWorldData.py
    python data/crawlKoreaNewsData.py
>>>>>>> db86bae2882da1dd7db15b0e884294d26d5a5bb1
    echo "==========Crawling complete!=========="
}

run
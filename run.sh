#!/bin/bash

function run(){
    python data/crawlKoreaAgeDeathsPerData.py
    python data/crawlKoreaRegionalData.py
    python data/crawlKoreaTotalCumulativeData.py
    python data/crawlWorldCumulativeData.py
    python data/crawlWorldData.py
    python data/crawlKoreaNewsData.py
    echo "==========Crawling complete!=========="
}

run
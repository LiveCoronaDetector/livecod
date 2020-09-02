[Korean](https://github.com/LiveCoronaDetector/livecod/blob/master/CONTRIBUTING-ko.md)

# CONTRIBUTING TO LIVE-CORONA-DETECTOR

Thanks for considering contribution to live-corona-detector. You can git clone the live-corona-detector source on the following address and send PR with your patch. But, before doing that, I recommend contributors to read this to follow the conventions.

  https://github.com/livecoronadetector

## Code Style

The live-corona-detector is written (mostly) in javascript, html, css, python. Unless the code readability is greatly impaired, we don't strictly limit contributors' coding style. We respect all coding styles of contributors. 

## Standard Variable Naming

Since live-corona-detector gather information from various sites and reproduce integrated dashboard out of those information, we need a standard naming for variables which are often used. We recommend contributors to follow the standard below when naming the varibles.

 - number of confirmed patients : `confirmed`
 - number of deaths : `deaths`
 - number of recovered patients : `recovered`
 - country name : `country`
 - region name : `region`
 - last updated : `updated`

 * data about 'Korean' : add `_kr` to standard variables above.
   - e.g. number of confirmed Korean patients : `confirmed_kr`
   - e.g. number of deaths in Korean : `deaths_kr`
   - e.g. number of recored patients in Korean : `recovered_kr`
   - e.g. country name written in Korean : `country_kr`
 * data regarding the specific country : add [country code](https://eminwon.qia.go.kr/common/CountrySP.jsp) to standard variables above.
   - e.g. number of confirmed Chinese patients : `confirmed_cn`  
   - e.g. number of deaths in Chinese : `deaths_cn`  
   - e.g. number of recored patients in Chinese : `recovered_cn`  
   - e.g. country name written in Chinese : `country_cn`
 * regional data : add `_region` to standard variables.
   - e.g. regional number of confirmed patients : `confirmed_region`
 * confirmed patients / deaths / recovered patients per 100,000 people : add `_rate` to standard variables.
   - confirmed patients per 100,000 people : `confirmed_rate`   
   - deaths per 100,000 people : `deaths_rate`  
   - recovered patients per 100,000 people : `recovered_rate`

## Contact Info.

you can leave an issue [here](https://github.com/LiveCoronaDetector/livecod/issues) or you can just send your email @ paul-lab@naver.com
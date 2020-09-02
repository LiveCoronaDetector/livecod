$(() => {
    const STATUS_KOREA_DELTA = $('span#STATUS_KOREA_DELTA');
    const STATUS_KOREA_CONFIRMED = $('span#STATUS_KOREA_CONFIRMED');
    const STATUS_GLOBAL_DELTA = $('span#STATUS_GLOBAL_DELTA');
    const STATUS_GLOBAL_CONFIRMED = $('span#STATUS_GLOBAL_CONFIRMED');

    const STATUS_KOREA_QUARANTINE = $('span#STATUS_KOREA_QUARANTINE');
    const STATUS_KOREA_RECOVERED = $('span#STATUS_KOREA_RECOVERED');
    const STATUS_KOREA_RECOVERED_DELTA = $('span#STATUS_KOREA_RECOVERED_DELTA');
    const STATUS_KOREA_DEATH = $('span#STATUS_KOREA_DEATH');
    const STATUS_KOREA_DEATH_DELTA = $('span#STATUS_KOREA_DEATH_DELTA');

    const STATUS_GLOBAL_QUARANTINE = $('span#STATUS_GLOBAL_QUARANTINE');
    const STATUS_GLOBAL_RECOVERED = $('span#STATUS_GLOBAL_RECOVERED');
    const STATUS_GLOBAL_DEATH = $('span#STATUS_GLOBAL_DEATH');

    const STATUS_JEJU_CONFIRMED = $('span#STATUS_JEJU_CONFIRMED');
    const STATUS_JEJU_RECOVERED = $('span#STATUS_JEJU_RECOVERED');
    const STATUS_JEJU_DEATH = $('span#STATUS_JEJU_DEATH');

    const KOREA_MAP_STATUS = $('div#KOREA_MAP_STATUS');

    $.ajax({
        url: '/data/cumulative_korea.json',
        method: 'get',
        success: (data) => {
            let length = Object.keys(data).length - 1;

            const 확진 = Number(data[length].confirmed).toLocaleString();
            const 격리 = Number(data[length].quarantine).toLocaleString();
            const 완치 = Number(data[length].recovered).toLocaleString();
            const 사망 = Number(data[length].deaths).toLocaleString();
            const 확진증가 = Number(data[length].confirmed_delta).toLocaleString();
            const 완치증가 = Number(data[length].recovered_delta).toLocaleString();
            const 사망증가 = Number(data[length].deaths_delta).toLocaleString();

            STATUS_KOREA_CONFIRMED.html(확진);
            STATUS_KOREA_DELTA.html(확진증가);
            STATUS_KOREA_QUARANTINE.html(격리);
            STATUS_KOREA_RECOVERED.html(완치);
            STATUS_KOREA_RECOVERED_DELTA.html(완치증가);
            STATUS_KOREA_DEATH.html(사망);
            STATUS_KOREA_DEATH_DELTA.html(사망증가);
        }
    });

    $.ajax({
        url: '/data/cumulative_global.json',
        method: 'get',
        success: (data) => {
            let length = Object.keys(data).length - 1;

            const 누적 = Number(data[length].confirmed).toLocaleString();
            const 증가 = Number(data[length].confirmed - data[length - 1].confirmed).toLocaleString();
            const 격리 = Number(data[length].confirmed - data[length].recovered - data[length].deaths).toLocaleString();
            const 완치 = Number(data[length].recovered).toLocaleString();
            const 사망 = Number(data[length].deaths).toLocaleString();

            STATUS_GLOBAL_CONFIRMED.html(누적);
            STATUS_GLOBAL_DELTA.html(증가);
            STATUS_GLOBAL_QUARANTINE.html(격리);
            STATUS_GLOBAL_RECOVERED.html(완치);
            STATUS_GLOBAL_DEATH.html(사망);
        }
    });

    $.ajax({
        url: '/data/current_korea_region.json',
        method: 'get',
        success: (data) => {
            data.forEach((value, index) => {
                if (index !== 0) {
                    KOREA_MAP_STATUS.append('<a href="'+ value.link +'" type="button" data-city="map_city'+ index +'" target="_blank" rel="noopener noreferrer">' +
                        '<span class="name">'+ value.region +'</span>' +
                        '<span class="num">'+ Number(value.confirmed).toLocaleString() +'</span>' +
                        '<span class="before">(+'+ Number(value.confirmed_delta).toLocaleString() +')</span>' +
                        '</a>')
                }
                if (value.region === '제주') {
                    const 확진 = Number(value.confirmed).toLocaleString();
                    const 완치 = Number(value.recovered).toLocaleString();
                    const 사망 = Number(value.deaths).toLocaleString();

                    STATUS_JEJU_CONFIRMED.html(확진);
                    STATUS_JEJU_RECOVERED.html(완치);
                    STATUS_JEJU_DEATH.html(사망);
                }
            })
        }
    });
})

$.ajax({
    url: '/data/news_naver.json',
    method: 'get',
    success: (data) => {
        const NEWS_NAVER = $('div#NEWS_NAVER');
        data.forEach((news) => {
            NEWS_NAVER.append('<a class="list-group-item w-100 text-truncate" href="'+ news.link +'" target="_blank" rel="noopener noreferrer">'+ news.title +'</a>');
        })
    }
});

$.ajax({
    url: '/data/news_jeju.json',
    method: 'get',
    success: (data) => {
        const NEWS_JEJU = $('div#NEWS_JEJU');
        data.forEach((news) => {
            NEWS_JEJU.append('<a class="list-group-item w-100 text-truncate" href="'+ news.link +'" target="_blank" rel="noopener noreferrer">'+ news.title +'</a>');
        })
    }
});

$.ajax({
    url: '/data/news_google.json',
    method: 'get',
    success: (data) => {
        const NEWS_GOOGLE = $('div#NEWS_GOOGLE');
        data.forEach((news) => {
            NEWS_GOOGLE.append('<a class="list-group-item w-100 text-truncate" href="'+ news.link +'" target="_blank" rel="noopener noreferrer">'+ news.title +'</a>');
        })
    }
});
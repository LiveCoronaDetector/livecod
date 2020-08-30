function createNews(newsData, newsDiv, sliceValue) {
  newsData.forEach((news) => {
    let cardElement = document.createElement("div");
    cardElement.setAttribute("class", "card");

    let cardHeader = document.createElement("div");
    cardHeader.setAttribute("class", "card-header");

    let text = document.createElement("h2");
    text.setAttribute("class", "mb-0 cases-title");

    let link = document.createElement("a");
    link.setAttribute("href", news["link"]);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");

    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-link");
    button.setAttribute("type", "button");

    let title =
      window.innerWidth > 500
        ? document.createTextNode(news["title"])
        : document.createTextNode(
            news["title"].substring(0, sliceValue) + "..."
          );

    button.appendChild(title);
    link.appendChild(button);
    text.appendChild(link);
    cardHeader.appendChild(text);
    cardElement.appendChild(cardHeader);
    newsDiv.appendChild(cardElement);
  });
}

createNews(worldNewsData, document.getElementById("worldNewsDiv"), 30);
createNews(koreaNewsData, document.getElementById("koreaNewsDiv"), 19);
createNews(jejuNewsData, document.getElementById("JejuNewsDiv"), 19);

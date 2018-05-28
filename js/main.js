$("#searchButton").click(function(e){
    e.preventDefault();

    var searchString = $("#searchText").val().replace(/ /g,"%20");
    var wikiQuery = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+ searchString +"&utf8=&format=json";
    console.log(wikiQuery);


    $.ajax({
        type:"GET",
        url: wikiQuery,
        dataType: "jsonp",
        success: printWikiQuery
    });
});

function printWikiQuery(json) {
    var pageOutput = "";


    for (var i=0; i < json.query.search.length; i++){
        var titleWithoutSpaces = json.query.search[i].title.replace(/ /g,"%20");
        if (i > 0){
            pageOutput += '<hr>';
        }
        pageOutput += '<div class="result"><a href="https://en.wikipedia.org/wiki/' + titleWithoutSpaces + '">';
        pageOutput += '<h2 class="resultHeading"><span class="resultHeadingSpan">' + json.query.search[i].title + "</span></h2>";
        pageOutput += '<p class="resultSnippet"><span class="resultSnippetSpan">' + json.query.search[i].snippet + "</span></p>";
        pageOutput += "</a></div>"
    }

    $("#wikiOutput").html(pageOutput);

    $("a").hover(function () {
        $(this).find(".resultHeadingSpan").addClass("boxHover");
        $(this).find(".resultSnippetSpan").addClass("boxHover");
    }, function () {
        $(this).find(".resultHeadingSpan").removeClass("boxHover");
        $(this).find(".resultSnippetSpan").removeClass("boxHover");
    });
}


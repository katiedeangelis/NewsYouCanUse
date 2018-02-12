///////////////////////////////////////////////////////////////////////////////////////
//                             Dependencies & Variables                              //
///////////////////////////////////////////////////////////////////////////////////////

// Pushpin header for my saved articles & home links
$('.pushpin-nav').pushpin({
    top: $('.block').offset().top
});

// Whenever someone clicks a save button
$(document).on("click", ".material-icons", function () {
    let card = $(this).closest(".card");

    $.ajax({
        method: "POST",
        url: "/savearticle",
        data: {
            // Value taken from title input
            articleTitle: $(card).find(".card-title").text(),
            articleSummary: $(card).find(".card-content>p").text(),
            articleImage: $(card).find(".card-image>img").attr("src"),
            articleLink: $(card).find(".card-action>a").attr("href")
        }
    }).then(function (data) {
        // Log the response
        console.log(data);
    });

});
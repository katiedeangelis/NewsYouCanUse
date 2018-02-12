///////////////////////////////////////////////////////////////////////////////////////
//                             Dependencies & Variables                              //
///////////////////////////////////////////////////////////////////////////////////////

// Pushpin header for my saved articles & home links
$('.pushpin-nav').pushpin({
    top: $('.block').offset().top
});

// Whenever someone clicks a save button - save the article
$(document).on("click", ".material-icons.add", function () {
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

// Whenever someone clicks a delete button - delete the article
$(document).on("click", ".material-icons.remove", function () {
    let card = $(this).data("value");

    $.ajax({
        method: "DELETE",
        url: "/deletesavedarticle",
        data: {
            // Value taken from title input
            _id: card
        }
    }).then(function (data) {
        // Log the response
        window.location.reload();
    });

});
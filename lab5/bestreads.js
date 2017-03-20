window.onload = ready;

function ready() {
    $("#singlebook").hide();
    $("#back").click(function() {
        window.location = window.location.href.split("?")[0];
    });
    $.ajax({
        url: "bestreads.php/?mode=books",
        type: "GET",
        success: function(stuff) {
            console.log(stuff);
            var xmlDoc = jQuery.parseXML(stuff);
            var books = $(xmlDoc);
            books.find("book").each(function() {
                var book = $(this);
                var title = book.children("title").html();
                var folder = book.children("folder").html();
                var div = document.createElement("div");
                var id = folder.split("/")[1];
                div.id = id;
                div.innerHTML = "<img src=" + folder + "/cover.jpg><p>" + title + "</p>";
                $("#allbooks").append(div);
                $("#" + id).click(function() {
                    singleBook(id);
                });
            });
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}

function singleBook(folder) {
    //console.log(folder);
    window.history.pushState({},"BestReads","bestreads.html?mode=books");
    $("#allbooks").empty();
    $("#singlebook").show();
    $.ajax({
        url: "bestreads.php/?mode=info&title=" + folder,
        type: "GET",
        success: function(stuff) {
            json = jQuery.parseJSON(stuff);
            $("#title").html(json.title);
            $("#stars").html(json.stars);
            $("#author").html(json.author);
            $("#cover").attr("src", "books/" + folder + "/cover.jpg");
        },
        error: function(e) {
            console.log(e.message);
        }
    });
    $.ajax({
        url: "bestreads.php/?mode=description&title=" + folder,
        type: "GET",
        success: function(stuff) {
            $("#description").html(stuff);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
    $.ajax({
        url: "bestreads.php/?mode=reviews&title=" + folder,
        type: "GET",
        success: function(stuff) {
            $("#reviews").append(stuff);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}
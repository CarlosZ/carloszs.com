$(function() {
    $("section .content").css("visibility", "visible");
    var email = ['carlos', 'luis', 'zuniga', '@', 'gmail', '.', 'com'].join("");
    $(".email").attr("href", "mailto:" + email).html(email);

    $("#main h1").click(toggle);

    function toggle(e) {
        var el = $(this);
        if (el.hasClass("collapsed")) {
            slideTo(el, "0px");
            el.removeClass("collapsed");
        } else {
            slideTo($(".collapsed"), "0px");
            $(".collapsed").removeClass("collapsed");
            slideTo(el, el.height() - el.find("span").outerHeight());
            el.addClass("collapsed");
        }
    }
    function slideTo(el, top) {
        el.animate({
            "top": top
        }, 1000);
    }

    function formatNumber(numberStr) {
        if (typeof numberStr == "number") {
            numberStr = numberStr.toString();
        }
        if (numberStr && numberStr.length > 3) {
            var formattedStr = "",
                i = 0,
                moved = 0;
            for (i = numberStr.length; i > 0; i--) {
                formattedStr = numberStr.charAt(i - 1) + formattedStr;
                moved++;
                if (moved > 0 && moved % 3 == 0) {
                    formattedStr = "," + formattedStr;
                }
            }
            return formattedStr;
        }
        return numberStr;
    }

    $.getJSON("http://blog.carloszs.com/?feed=json&jsonp=?", function(data) {
        $("#postTmpl").tmpl(data).appendTo("#blog-recent");
    });

    $.getJSON("http://api.stackoverflow.com/1.0/users/105827?jsonp=?", function(data) {
        var sof = $(".stackoverflow");
        sof.html(sof.html() + " (rep. " + formatNumber(data.users[0].reputation) + ")");
    });
});

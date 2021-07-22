$(document).ready(function() {
    // This will run when user scroll the screen
    $(window).scroll(function() {
        if (this.scrollY > 20)
            $('.navbar').addClass("scroll");
        else
            $('.navbar').removeClass("scroll");
        if (this.scrollY > 1100) {
            $(".knowledge .c1").addClass("html");
            $(".knowledge .c2").addClass("java");
            $(".knowledge .c3").addClass("js");
            $(".knowledge .c4").addClass("ds");
            $(".knowledge .c5").addClass("css");
        }
        if (this.scrollY > 2300) {
            $(".proj-content .box").slideDown(2000);
        }
    })


    // Toggle Button Working
    $(".toggle").click(function() {
        $('ul').toggleClass("active");
        $(".line1").toggleClass("l1");
        $(".line2").toggleClass("l2");
        $(".line3").toggleClass("l3");
    })

    // Typing Animation
    var typed = new Typed(".typing", {
        strings: ["WebDeveloper", "Frontend Developer", "Web Designer", "Code Lover", "Learner"],
        typeSpeed: 75,
        loop: true
    })
    
    $("i").click(function() {
        $(this).css("color", "orange");
    });

    $(".rateme .btn").click(function() {
        $(".rate-bg").css("display", "none");
    });

    setTimeout(() => {
        $(".rate-bg").css("display", "block");
    }, 10000)
});

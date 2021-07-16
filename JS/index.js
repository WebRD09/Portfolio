$(document).ready(function() {
    // This will run when user scroll the screen
    $(window).scroll(function() {
        if (this.scrollY > 20)
            $('.navbar').addClass("scroll");
        else
            $('.navbar').removeClass("scroll");
    })

    // Toggle Button Working
    $(".toggle").click(function() {
        $('ul').toggleClass("active");
        $(".toggle").toggleClass("close");
    })

    // Typing Animation
    var typed = new Typed(".typing", {
        strings: ["WebDeveloper", "Frontend Developer", "Web Designer", "Cricket Lover", "Learner"],
        typeSpeed: 75,
        loop: true
    })
});
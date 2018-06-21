$(document).ready(function () {
    changeHeightHeaderPortifolio();


    $(window).bind('resize', function () {
        changeHeightHeaderPortifolio();
    });

    function changeHeightHeaderPortifolio() {
        $("#header-portifolio").height($(window).height() - 130);
    }
});
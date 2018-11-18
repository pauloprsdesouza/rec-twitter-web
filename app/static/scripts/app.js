$(document).ready(function () {
    changeHeightHeaderPortifolio();
    
    $(document).ready(function() {
        $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    });

    $(window).bind('resize', function () {
        changeHeightHeaderPortifolio();
    });

    function changeHeightHeaderPortifolio() {
        $("#header-portifolio").height($(window).height() - 70);

        if($(window).width() < 500 || $(window).height() < 800){
            $("#header-portifolio").height($(window).height() + 350);
        }
    }
});
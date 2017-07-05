$(window).on('resize', function(){
      resizeSidebar();
});

function resizeSidebar() {
    var height;
    if(window.innerWidth > 992) {
        height = $(".main-container").height();
        $('.sidebar').height(height);
    }
    else {
        height = $(".sidebar-wrapper").height();
        $('.sidebar').height(height);
    }
}
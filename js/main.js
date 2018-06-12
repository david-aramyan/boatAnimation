$(document).ready(function(){
    // Scroll fixing effects
    var seat = false;
    var limit = 0;
    $('.road').width($(window).width() - $('.road').offset().left);

    $("body").on('wheel', function(event) {
        event.preventDefault();
        var boatPosition = parseInt($(".boat").css("left"));
        var step = 30;
        newPosition = 0;

        // Parallax effect
        $(".hill-3, .hill-4").addClass("wave");
        if(event.originalEvent.deltaY <= 0) {
            // Up

            newPosition = boatPosition + step;

            // after text hide
            if( boatPosition >= ($(window).width() - ($('.hills-left-box').width() + $('.hills-right-box').width() - (28 *$('.hills-left-box').width() / 100))) - $('.boat').width()){
                // to do hide text
                $('.main-text').animate({
                    "opacity": 0
                }, 1000);
                if (!limit) {
                    limit = boatPosition + 1000;
                }

                if (boatPosition >= limit) {
                    return;
                }
            }
            if(seat) {
                $(".hero").stop().animate({
                    "left": newPosition + 50
                },{
                    duration: 200,
                    step: function (now) {

                    },
                    complete: function(){
                        stopParallax()
                    }
                });

                $(".boat").stop().animate({
                    "left": newPosition
                },{
                    duration: 200,
                    step: function (now) {

                    },
                    complete: function(){
                        stopParallax()
                    }
                });
            }else{
                if (newPosition < step) {
                    return;
                }

                $(".boat").stop().animate({
                    "left": newPosition
                },200, function(){
                    stopParallax()
                });
            }

        } else{
            // Down

            newPosition = boatPosition - step;
            if(newPosition <= 0){
                newPosition = 0;
                stopParallax()
            }


            $(".boat").stop().animate({
                "left": newPosition
            },{
                duration: 200,
                step: function (now) {

                },
                complete: function(){
                    stopParallax()
                }
            });
            if (!newPosition && !seat) {
                $(".hero").stop().animate({
                   "bottom": "50px"
                }, 200, function(){
                     seat = true;
                });

            }else if(seat) {
                $(".hero").stop().animate({
                    "left": newPosition + 50
                },{
                    duration: 200,
                    step: function (now) {

                    },
                    complete: function(){
                        stopParallax()
                    }
                });
            }
        }
        // console.log(event.currentTarget)
        // $(event.currentTarget).promise().done(function(){
        //     stopParallax();
        // })
    });

    function stopParallax() {
        setTimeout(function () {
            $(".hill-3, .hill-4").removeClass("wave");
        },1500)
    }
});
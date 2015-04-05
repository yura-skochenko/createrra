$(document).ready(function(){
                /* amount product +/- */
                $('.minus').click(function () {
                    var $input = $(this).parents('.number').find('input');
                    var count = parseInt($input.val()) - 1;
                    count = count < 1 ? 1 : count;
                    $input.val(count);
                    $input.change();
                    return false;

                });
                $('.plus').click(function () {
                    var $input = $(this).parents('.number').find('input');
                    $input.val(parseInt($input.val()) + 1);
                    $input.change();
                    return false;
                });
                /* select */
                $(function () {
                    $(".select_product").selectbox();
                    $(".select-light").selectbox();
                });
                /* tabs */
                (function($) {
                    $(function() {
                        $('ul.tabs').delegate('li:not(.current)', 'click', function() {
                            $(this).addClass('current').siblings().removeClass('current')
                                    .parents('div.section').find('div.box').hide().eq($(this).index()).fadeIn(150);
                        })
                    })
                })(jQuery);
                /* carousel */
                $('.carousel').bxSlider({
                    slideWidth: 210,
                    minSlides: 2,
                    maxSlides: 4,
                    moveSlides: 1,
                    pager: false,
                    slideMargin: 0
                });
                $('.carousel-featured').bxSlider({
                    slideWidth: 210,
                    minSlides: 2,
                    maxSlides: 4,
                    moveSlides: 1,
                    pager: false,
                    hideControlOnEnd: false,
                    infiniteLoop: false,
                    onSlideNext: function($slideElement, oldIndex, newIndex){
                        $('.carousel-featured>div.left-active').removeClass().next().eq(0).addClass('left-active');
                    },
                    onSlidePrev: function($slideElement, oldIndex, newIndex){
                        $('.carousel-featured>div.left-active').removeClass().prev().eq(0).addClass('left-active');
                    },
                    slideMargin: 0
                });
                $('.carousel-featured>div:not(:lt(3))').eq(0).addClass('left-active');
                /* product show card */
                $('.product-s-circle').on('click', function(){
                    $(this).parent('div').toggleClass('active');
                });
                $('.product-grid>div.active').mouseleave(function(){
                    alert('hi');
                    $(this).removeClass('active');

                });
                $('.close-product').on('click', function(){
                    $(this).parents('div').removeClass('active');
                });

                /* Slider price */
                $(document).ready(function() {

                    $("#buy_price").slider({
                        range: true,
                        min: 0,
                        max: 3000,
                        step: 1,
                        values: [ 0, 2200],

                        slide: function( event, ui ) {
                            $("input[name=price_s]").val(ui.values[0]);
                            $("input[name=price_f]").val(ui.values[1]);
                        }
                    });

                });

                /* Modal window */
                (function($) {
                    $('a[data-reveal-id]').on('click', function(e) {
                        e.preventDefault();
                        var modalLocation = $(this).attr('data-reveal-id');
                        $('#'+modalLocation).reveal($(this).data());
                    });
                    $('input[data-reveal-id]').on('click', function(e) {
                        e.preventDefault();
                        var modalLocation = $(this).attr('data-reveal-id');
                        $('#'+modalLocation).reveal($(this).data());
                    });
                    $.fn.reveal = function(options) {

                        var defaults = {
                            animation: 'fadeAndPop', //fade, fadeAndPop, none
                            animationspeed: 300, //how fast animtions are
                            closeonbackgroundclick: true, //if you click background will modal close?
                            dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
                        };
                        //Extend dem' options
                        var options = $.extend({}, defaults, options);
                        return this.each(function() {
                            var modal = $(this),
                                topMeasure  = parseInt(modal.css('top')),
                                topOffset = modal.height() + topMeasure,
                                locked = false,
                                modalBG = $('.reveal-modal-bg');

                            if(modalBG.length == 0) {
                                modalBG = $('<div class="reveal-modal-bg" />').insertAfter(modal);
                            }
                            //Entrance Animations
                            modal.bind('reveal:open', function () {
                                modalBG.unbind('click.modalEvent');
                                $('.' + options.dismissmodalclass).unbind('click.modalEvent');
                                if(!locked) {
                                    lockModal();
                                    if(options.animation == "fadeAndPop") {
                                        modal.css({'top': $(document).scrollTop()-topOffset, 'opacity' : 0, 'visibility' : 'visible'});
                                        modalBG.fadeIn(options.animationspeed/2);
                                        modal.delay(options.animationspeed/2).animate({
                                            "top": $(document).scrollTop()+topMeasure + 'px',
                                            "opacity" : 1
                                        }, options.animationspeed,unlockModal());
                                    }
                                    if(options.animation == "fade") {
                                        modal.css({'opacity' : 0, 'visibility' : 'visible', 'top': $(document).scrollTop()+topMeasure});
                                        modalBG.fadeIn(options.animationspeed/2);
                                        modal.delay(options.animationspeed/2).animate({
                                            "opacity" : 1
                                        }, options.animationspeed,unlockModal());
                                    }
                                    if(options.animation == "none") {
                                        modal.css({'visibility' : 'visible', 'top':$(document).scrollTop()+topMeasure});
                                        modalBG.css({"display":"block"});
                                        unlockModal()
                                    }
                                }
                                modal.unbind('reveal:open');
                            });
                            //Closing Animation
                            modal.bind('reveal:close', function () {
                                if(!locked) {
                                    lockModal();
                                    if(options.animation == "fadeAndPop") {
                                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                                        modal.animate({
                                            "top":  $(document).scrollTop()-topOffset + 'px',
                                            "opacity" : 0
                                        }, options.animationspeed/2, function() {
                                            modal.css({'top':topMeasure, 'opacity' : 1, 'visibility' : 'hidden'});
                                            unlockModal();
                                        });
                                    }
                                    if(options.animation == "fade") {
                                        modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
                                        modal.animate({
                                            "opacity" : 0
                                        }, options.animationspeed, function() {
                                            modal.css({'opacity' : 1, 'visibility' : 'hidden', 'top' : topMeasure});
                                            unlockModal();
                                        });
                                    }
                                    if(options.animation == "none") {
                                        modal.css({'visibility' : 'hidden', 'top' : topMeasure});
                                        modalBG.css({'display' : 'none'});
                                    }
                                }
                                modal.unbind('reveal:close');
                            });
                            //Open Modal Immediately
                            modal.trigger('reveal:open')
                            //Close Modal Listeners
                            var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
                                modal.trigger('reveal:close')
                            });
                            if(options.closeonbackgroundclick) {
                                modalBG.css({"cursor":"pointer"})
                                modalBG.bind('click.modalEvent', function () {
                                    modal.trigger('reveal:close')
                                });
                            }
                            $('body').keyup(function(e) {
                                if(e.which===27){ modal.trigger('reveal:close'); } // 27 is the keycode for the Escape key
                            });
                            function unlockModal() {locked = false;}
                            function lockModal() {locked = true;}
                        });//each call
                    }//orbit plugin call
                })(jQuery);

                $(function(){
                    $('#slider-product').Thumbelina({
                        orientation:'vertical',
                        $bwdBut:$('#slider-product .top'),
                        $fwdBut:$('#slider-product .bottom')
                    });
                });
                CloudZoom.quickStart();
            });
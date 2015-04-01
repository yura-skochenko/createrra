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

                $('#del-np:radio:checked').on('click', function(){
                    $('#delivery-np').removeClass('active');
                    $('#delivery-np').addClass('active');
                    alert('hi');
                });

                /* Slider price */
                $(document).ready(function() {

                    $("#buy_price").slider({
                        range: true,
                        min: 0, // минимальное значение цены
                        max: 3000, // максимальное значение цены
                        step: 1, // шаг слайдера
                        values: [ 0, 2200],  // начальные значения - позиции ползунков на шкале

                        slide: function( event, ui ) {
                            $("input[name=price_s]").val(ui.values[0]); // выводим  значение от
                            $("input[name=price_f]").val(ui.values[1]); // выводим  значение до
                        }
                    });

                });
            });
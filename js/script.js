let timeChange = 3000;
let slides = $('.slide');
let dots = $('.dot');
let slidesCount = slides.length;
let sliderInderval;
var $this = $('slide.slide--active');

function setPageNumber(position) {
    const scrollPosition = Math.ceil(position);
    let wynik = -1;

    if (scrollPosition < $('.intro').height()) {
        wynik = "0";
    } else if (scrollPosition < $('.mission').height() + $('.mission').offset().top) {
        wynik = 1;
    } else if (scrollPosition < $('.clients').height() + $('.clients').offset().top) {
        wynik = 2;
    } else if (scrollPosition < $('.products').height() + $('.products').offset().top) {
        wynik = 3;
    } else if (scrollPosition < $('.location').height() + $('.location').offset().top) {
        wynik = 4;
    } else {
        wynik = 5;
    }
    return wynik;
}

function nextSlide() {
    let currentSlide = $('.slide--active');
    let currentDot = $('.dot--active');
    let currentSlideIndex = currentSlide.index()
    currentSlide.removeClass('slide--active').fadeOut(700);
    currentDot.removeClass('dot--active');
    if (currentSlideIndex + 1 == slidesCount) {
        currentSlide = slides.first();
        currentDot = dots.first();
        currentSlide.delay(500).addClass('slide--active').fadeIn(700);
        currentDot.addClass('dot--active');
        currentSlideIndex = 0;
    } else {
        currentSlideIndex++;
        currentSlide = currentSlide.next();
        currentDot = currentDot.next();
        currentSlide.delay(500).addClass('slide--active').fadeIn(700);
        currentDot.addClass('dot--active');
    }
}

function changeSlide() {
    clearInterval(sliderInderval);
    currentSlide = $('.slide--active');
    let newSlide = currentSlide.parent().children().eq($(this).index());
    currentDot = $(this);
    $(this).addClass('dot--active').siblings().removeClass('dot--active');
    currentSlide.removeClass('slide--active').fadeOut(700);
    newSlide.delay(500).addClass('slide--active').fadeIn(700);
    sliderInderval = setInterval(nextSlide, timeChange);
}

function disableCookies() {
    $('.cookies').css('display', 'none');
}

function prevPage() {
    let pageNumber = setPageNumber($(document).scrollTop());
    $("html, body").animate({
        scrollTop: $($('.main').find('.section')[pageNumber - 1]).offset().top
    }, 1000);
}

function nextPage() {
    let pageNumber = setPageNumber($(document).scrollTop());
    $("html, body").animate({
        scrollTop: $($('.main').find('.section')[pageNumber + 1]).offset().top
    }, 1000);
}

function goToSection() {
    let $href = $.attr(this, 'href');
    $('html, body').animate({
        scrollTop: $($href).offset().top + 1
    }, 750);
}

function activeBurger() {
    // $('.menu__wrapper').toggleClass('nav--sticky');
    $('.site-nav').toggleClass('active');
    $('.menu__wrapper').toggleClass('active');
}

function activeJumpSection() {
    let scrollPosition = $(document).scrollTop() + 1;
    $('.page__number').text(setPageNumber(scrollPosition));
    if (scrollPosition >= $('.intro').height()) {
        $('.scroll').addClass('active');
    } else {
        $('.scroll').removeClass('active');
    }
}

$(function () {
    slides.not(':first').css('display', 'none');
    slides.first().addClass('slide--active');
    dots.first().addClass('dot--active');
});

$(window).on('scroll', activeJumpSection);
sliderInderval = setInterval(nextSlide, timeChange);

$('.burger__wrapper').click(activeBurger);
$('.site-nav__link').click(goToSection);
$('.btn--close').click(disableCookies);
$('.fa-angle-up').click(prevPage);
$('.fa-angle-down').click(nextPage);
$('.dots .dot').click(changeSlide);
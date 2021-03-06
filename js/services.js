// Go to top on refreshing the page.
// $(document).ready(function () {
//     $(this).scrollTop(0);
// });

// Moving bubbles in the background of the header section
let width, height, largeContainer, canvas, ctx, circles, target, animateHeader = true;
initHeader();
addListeners();
function initHeader() {
    width = window.innerWidth / 1.03;
    height = window.innerHeight / 1.435;
    target = { x: 0, y: height };
    largeContainer = document.getElementById('headingBg');
    largeContainer.style.height = 70 + 'vh';
    canvas = document.getElementById('c');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    // create particles
    circles = [];
    for (let x = 0; x < width * 0.5; x++) {
        let c = new Circle();
        circles.push(c);
    }
    animate();
}

// Event handling
function addListeners() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
}

function scrollCheck() {
    if (document.body.scrollTop > height)
        animateHeader = false;
    else
        animateHeader = true;
}

function resize() {
    width = window.innerWidth / 1.03;
    height = (window.innerHeight) / 1.5;
    largeContainer.style.height = 70 + 'vh';
    canvas.width = width;
    canvas.height = height;
}

function animate() {
    if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in circles)
            circles[i].draw();
    }
    requestAnimationFrame(animate);
}

// Canvas manipulation
function Circle() {
    var _this = this;
    _this.pos = {};
    init();
    function init() {
        _this.pos.x = Math.random() * width;
        _this.pos.y = height + Math.random() * 100;
        _this.alpha = 0.1 + Math.random() * 0.3;
        _this.scale = 0.1 + Math.random() * 0.3;
        _this.velocity = Math.random();
    }

    this.draw = function () {
        if (_this.alpha <= 0)
            init();
        _this.pos.y -= _this.velocity;
        _this.alpha -= 0.0005;
        ctx.beginPath();
        ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
        ctx.fill();
    };
}

// Slides of things which we do. It's timing funcion and, click and swipe events.
let checkedSlide = 0;
let buttons = document.getElementsByClassName('radioBtns');
let slides = document.getElementsByClassName('slideNo');
let a = setInterval(() => {
    swipeLeft(checkedSlide)
}, 4000);
for (let i = 0; i < buttons.length; i++) {
    let startX = 0, endX = 0;
    slides[i].addEventListener('touchstart', (e) => {
        e.preventDefault();
        startX = e.changedTouches[0].pageX;
    }, false);
    slides[i].addEventListener('touchmove', (e) => {
        e.preventDefault();
    });
    slides[i].addEventListener('touchend', (e) => {
        e.preventDefault();
        endX = e.changedTouches[0].pageX;
        if (startX > endX)
            swipeLeft(i);
        else if (startX < endX)
            swipeRight(i);
    }, false);
    slides[i].addEventListener("mousedown", mouseDown);
    slides[i].addEventListener("mouseup", mouseUp);
}
function swipeLeft(i) {
    if (i != buttons.length - 1) {
        buttons[i + 1].checked = true;
        buttons[i].checked = false;
        checkedSlide = i + 1;
    }
    else {
        buttons[0].checked = true;
        buttons[i].checked = false;
        checkedSlide = 0;
    }
}
function swipeRight(i) {
    if (i != 0) {
        buttons[i - 1].checked = true;
        buttons[i].checked = false;
        checkedSlide = i - 1;
    }
    else {
        buttons[5].checked = true;
        buttons[i].checked = false;
        checkedSlide = 5;
    }
}
function mouseDown() {
    clearInterval(a);
}
function mouseUp() {
    a = setInterval(() => {
        swipeLeft(checkedSlide)
    }, 4000);
}
// Arrow key handling with slides.
document.addEventListener('keydown', (e) => {
    if (e.key == "ArrowLeft")
        swipeRight(checkedSlide);
    else if (e.key == "ArrowRight")
        swipeLeft(checkedSlide);
});

// Footer's Left menu bar
function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
// Smiley in Footer's right section
function smile() {
    var a;
    a = document.getElementById("div1");
    a.innerHTML = "&#xf118;";
    setTimeout(function () {
        a.innerHTML = "&#xf11a;";
    }, 1000);
    setTimeout(function () {
        a.innerHTML = "&#xf119;";
    }, 2000);
    setTimeout(function () {
        a.innerHTML = "&#xf11a;";
    }, 3000);
}
smile();
setInterval(smile, 4000);
var close = document.getElementsByClassName("closebtn");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.opacity = "0";
        setTimeout(function () { div.style.display = "none"; }, 600);
    }
}
"use strict"

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMibile/i)
    },
    any: function() {
        return(
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu){
    iconMenu.addEventListener("click", function(e){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}

if (isMobile.any()){
    document.body.classList.add('_touch');
}else {
    document.body.classList.add('_pc');
}

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if(menuLinks.length > 0){
    menuLinks.forEach(menuLink => { 
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e){
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

            if(iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault()
        }
    }
}

const animTags = document.querySelectorAll('._anim-items');

if (animTags.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
        for (let index = 0; index < animTags.length; index++){
            const animTag = animTags[index];
            const animTagHeight = animTag.offsetHeight;
            const animTagOffset = offset(animTag).top;
            const animStart = 4;

            let animTagPoint = window.innerHeight - animTagHeight / animStart;
            if (animTagHeight > window.innerHeight){
                animTagPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((scrollY > animTagOffset - animTagPoint) && scrollY < (animTagOffset + animTagHeight)) {
                setTimeout(() => {
                    animTag.classList.add('_active');
                }, 300);
            } else {
                animTag.classList.remove('_active');
            }
        }
    }
    function offset(el){
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return{top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
    
}

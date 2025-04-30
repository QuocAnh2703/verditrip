// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle if the elements exist
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.add('open-sidebar');
        });
    }

    const closeIcon = document.querySelector('.close-icon');
    if (closeIcon) {
        closeIcon.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.add('close-sidebar');
                setTimeout(() => {
                    sidebar.classList.remove('close-sidebar');
                    sidebar.classList.remove('open-sidebar');
                }, 1000);
            }
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    const searchForm = document.querySelector('.search-form');
    
    if (searchIcon && searchForm) {
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        document.body.appendChild(searchOverlay);

        searchIcon.addEventListener('click', function() {
            searchForm.classList.add('active');
            searchOverlay.classList.add('active');
            searchForm.querySelector('input').focus();
        });

        searchOverlay.addEventListener('click', function() {
            searchForm.classList.remove('active');
            searchOverlay.classList.remove('active');
        });

        // Close search when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                searchForm.classList.remove('active');
                searchOverlay.classList.remove('active');
            }
        });
    }

    // *** Commenting out the original carousel code to prevent conflicts ***
    // We're now using the enhanced version in carousel-fix.js
    /*
    var nextBtn = document.querySelector('.next'),
        prevBtn = document.querySelector('.prev'),
        carousel = document.querySelector('.carousel'),
        list = document.querySelector('.list'), 
        item = document.querySelectorAll('.item'),
        runningTime = document.querySelector('.carousel .timeRunning') 

    let timeRunning = 3000 
    let timeAutoNext = 7000

    nextBtn.onclick = function(){
        showSlider('next')
    }

    prevBtn.onclick = function(){
        showSlider('prev')
    }

    let runTimeOut 

    let runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)


    function resetTimeAnimation() {
        runningTime.style.animation = 'none'
        runningTime.offsetHeight /* trigger reflow */
    /*
        runningTime.style.animation = null 
        runningTime.style.animation = 'runningTime 7s linear 1 forwards'
    }


    function showSlider(type) {
        let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
        if(type === 'next'){
            list.appendChild(sliderItemsDom[0])
            carousel.classList.add('next')
        } else{
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
            carousel.classList.add('prev')
        }

        clearTimeout(runTimeOut)

        runTimeOut = setTimeout( () => {
            carousel.classList.remove('next')
            carousel.classList.remove('prev')
        }, timeRunning)


        clearTimeout(runNextAuto)
        runNextAuto = setTimeout(() => {
            nextBtn.click()
        }, timeAutoNext)

        resetTimeAnimation() // Reset the running time animation
    }

    // Start the initial animation 
    resetTimeAnimation()
    */

    revealOnScroll();
});

// Scroll reveal functionality
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);


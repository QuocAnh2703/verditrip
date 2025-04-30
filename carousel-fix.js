// Đợi cho tài liệu HTML load hoàn tất trước khi thực hiện Javascript
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các phần tử cần thiết
    const carousel = document.querySelector('.carousel');
    const list = document.querySelector('.carousel .list');
    const prevBtn = document.querySelector('.arrows .prev');
    const nextBtn = document.querySelector('.arrows .next');
    const items = document.querySelectorAll('.carousel .list .item');
    const runningTime = document.querySelector('.carousel .timeRunning');

    // In ra console để kiểm tra xem các phần tử có được tìm thấy không
    console.log('Carousel elements:', {
        carousel: carousel,
        list: list,
        prevBtn: prevBtn,
        nextBtn: nextBtn,
        items: items.length,
        runningTime: runningTime
    });

    // Thời gian cho các chuyển đổi
    const timeRunning = 3000;
    const timeAutoNext = 7000;

    // Đặt các biến toàn cục
    let runTimeOut;
    let runNextAuto;

    // Khởi tạo animation
    initializeAnimation();

    // Gán các sự kiện click cho các nút
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('Next button clicked');
            changeSlide('next');
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            console.log('Prev button clicked');
            changeSlide('prev');
        });
    }

    // Hàm thay đổi slide
    function changeSlide(type) {
        // Lấy danh sách các items hiện tại (luôn lấy mới để đảm bảo cập nhật)
        const sliderItems = document.querySelectorAll('.carousel .list .item');
        console.log('Items found:', sliderItems.length);

        if (!carousel || !list || sliderItems.length === 0) {
            console.error('Missing elements required for slider');
            return;
        }

        // Thêm lớp CSS tương ứng và di chuyển các phần tử
        if (type === 'next') {
            // Cách 1: Dùng appendChild để di chuyển phần tử đầu tiên xuống cuối
            list.appendChild(sliderItems[0]);
            console.log('Moved first item to end');
        } else {
            // Cách 2: Dùng prepend để đưa phần tử cuối lên đầu
            list.prepend(sliderItems[sliderItems.length - 1]);
            console.log('Moved last item to beginning');
        }

        // Thêm lớp CSS để tạo hiệu ứng
        carousel.classList.add(type);
        console.log('Added class:', type);

        // Xóa lớp CSS sau khi hoàn thành chuyển đổi
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
            console.log('Removed transition classes');
        }, 500); // Thời gian ngắn hơn để tạo hiệu ứng mượt mà hơn

        // Đặt lại timer cho tự động chuyển
        resetAutoSlide();
        
        // Đặt lại animation thanh thời gian
        resetTimeRunningAnimation();
    }

    // Hàm đặt lại timer cho tự động chuyển slide
    function resetAutoSlide() {
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            // Luôn lấy lại tham chiếu đến nút next để tránh các vấn đề với tham chiếu cũ
            const currentNextBtn = document.querySelector('.arrows .next');
            if (currentNextBtn) {
                currentNextBtn.click();
                console.log('Auto-advancing to next slide');
            }
        }, timeAutoNext);
    }

    // Hàm đặt lại animation cho thanh thời gian
    function resetTimeRunningAnimation() {
        if (!runningTime) return;
        
        runningTime.style.animation = 'none';
        // Kích hoạt reflow
        void runningTime.offsetWidth;
        // Đặt lại animation
        runningTime.style.animation = '';
        runningTime.style.animation = 'runningTime 7s linear 1 forwards';
        console.log('Reset time running animation');
    }

    // Hàm khởi tạo
    function initializeAnimation() {
        // Bắt đầu animation thời gian
        resetTimeRunningAnimation();
        
        // Bắt đầu tự động chuyển slide
        resetAutoSlide();
        
        console.log('Carousel initialized');
    }
});

// Thêm CSS cho hiệu ứng slide
document.addEventListener('DOMContentLoaded', function() {
    // Tạo style element
    const style = document.createElement('style');
    
    // CSS để xử lý chuyển đổi slide
    style.textContent = `
        /* Fix cho carousel */
        .carousel .list .item {
            transition: all 0.5s ease;
        }
        
        /* Animation khi nhấn nút next */
        .carousel.next .list .item:nth-child(1) {
            z-index: 1;
            transform: translateX(-100%);
            opacity: 0;
        }
        
        .carousel.next .list .item:nth-child(2) {
            z-index: 2;
            transform: translateX(0);
            opacity: 1;
        }
        
        /* Animation khi nhấn nút prev */
        .carousel.prev .list .item:nth-child(1) {
            z-index: 2;
            transform: translateX(0);
            opacity: 1;
        }
        
        .carousel.prev .list .item:nth-child(2) {
            z-index: 1;
            transform: translateX(100%);
            opacity: 0;
        }
    `;
    
    // Thêm vào head
    document.head.appendChild(style);
    console.log('Added transition CSS');
}); 
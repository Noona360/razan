document.addEventListener('DOMContentLoaded', () => {
    const valentines = document.querySelector('.valentines');
    const starsContainer = document.querySelector('.stars-container');
    const birthdaySong = document.getElementById('birthdaySong'); // احصل على عنصر الصوت
    let starAnimationTimeouts = [];

    function createStars() {
        starsContainer.innerHTML = '';
        starAnimationTimeouts.forEach(timeout => clearTimeout(timeout));
        starAnimationTimeouts = [];

        const numberOfStars = 20;
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            const startX = Math.random() * 80 + 10;
            const startY = Math.random() * 50 + 40;
            
            star.style.left = `${startX}%`;
            star.style.top = `${startY}%`;
            
            const size = Math.random() * (12 - 4) + 4;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            starsContainer.appendChild(star);

            const delay = Math.random() * 500;
            const timeout = setTimeout(() => {
                star.classList.add('animate');
            }, delay);
            starAnimationTimeouts.push(timeout);
        }
    }

    function hideStars() {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.style.animation = 'none';
            star.style.opacity = '0';
            star.remove();
        });
        starAnimationTimeouts.forEach(timeout => clearTimeout(timeout));
        starAnimationTimeouts = [];
    }


    valentines.addEventListener('mouseenter', () => {
        if (!valentines.classList.contains('open')) {
            valentines.classList.add('open');
            setTimeout(createStars, 500);
            
            // تشغيل الأغنية عند فتح البطاقة
            if (birthdaySong) { // تأكد أن العنصر موجود
                birthdaySong.play().catch(e => console.error("Error playing sound:", e));
                birthdaySong.loop = true; // اجعل الأغنية تتكرر
            }
        }
    });

    valentines.addEventListener('mouseleave', () => {
        if (valentines.classList.contains('open')) {
            valentines.classList.remove('open');
            hideStars();
            
            // إيقاف الأغنية عند إغلاق البطاقة (اختياري)
            if (birthdaySong) {
                birthdaySong.pause();
                birthdaySong.currentTime = 0; // إعادة الأغنية إلى البداية
            }
        }
    });

    valentines.addEventListener('click', () => {
        if (valentines.classList.contains('open')) {
            valentines.classList.remove('open');
            hideStars();
            
            // إيقاف الأغنية عند إغلاق البطاقة
            if (birthdaySong) {
                birthdaySong.pause();
                birthdaySong.currentTime = 0;
            }
        } else {
            valentines.classList.add('open');
            setTimeout(createStars, 500);
            
            // تشغيل الأغنية عند فتح البطاقة
            if (birthdaySong) {
                birthdaySong.play().catch(e => console.error("Error playing sound:", e));
                birthdaySong.loop = true;
            }
        }
    });
});
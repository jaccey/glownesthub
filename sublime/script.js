document.addEventListener('DOMContentLoaded', function() {
  // Loader
  const loader = document.querySelector('.loader');
  
  // Simulate loading
  setTimeout(() => {
    loader.classList.add('fade-out');
    
    // Remove loader after animation completes
    setTimeout(() => {
      loader.style.display = 'none';
      
      // Initialize animations and functionality after loader is gone
      initApp();
    }, 500);
  }, 1500);
  
  function initApp() {
    // Theme Toggle
    const lightModeBtn = document.getElementById('lightModeBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');
    const autoModeBtn = document.getElementById('autoModeBtn');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode();
    } else if (savedTheme === 'light') {
      setLightMode();
    } else {
      setAutoMode();
    }
    
    // Theme toggle functions
    function setLightMode() {
      body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      updateModeButtons('light');
    }
    
    function setDarkMode() {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      updateModeButtons('dark');
    }
    
    function setAutoMode() {
      body.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      updateModeButtons('auto');
    }
    
    function updateModeButtons(activeMode) {
      lightModeBtn.classList.toggle('active', activeMode === 'light');
      darkModeBtn.classList.toggle('active', activeMode === 'dark');
      autoModeBtn.classList.toggle('active', activeMode === 'auto');
    }
    
    // Event listeners for theme buttons
    lightModeBtn.addEventListener('click', setLightMode);
    darkModeBtn.addEventListener('click', setDarkMode);
    autoModeBtn.addEventListener('click', setAutoMode);
    
    // Daily Rituals Toggle
    const ritualsToggle = document.getElementById('ritualsToggle');
    const ritualList = document.getElementById('ritualList');
    
    ritualsToggle.addEventListener('click', function() {
      ritualList.classList.toggle('hidden');
      
      if (ritualList.classList.contains('hidden')) {
        ritualsToggle.textContent = 'Show Rituals';
      } else {
        ritualsToggle.textContent = 'Hide Rituals';
      }
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      testimonials[index].classList.add('active');
    }
    
    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }
    
    // Rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
    showTestimonial(0);
    
    // Map Toggle
    const mapToggle = document.getElementById('mapToggle');
    const mapFrame = document.getElementById('mapFrame');
    let mapExpanded = false;
    
    mapToggle.addEventListener('click', function() {
      mapExpanded = !mapExpanded;
      
      if (mapExpanded) {
        mapFrame.style.height = '500px';
        mapToggle.innerHTML = '<i class="fas fa-compress"></i> Collapse Map';
      } else {
        mapFrame.style.height = '300px';
        mapToggle.innerHTML = '<i class="fas fa-expand"></i> Expand Map';
      }
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Scroll Animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
      animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.classList.add('animate');
        }
      });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Footer Sound Effect
    const footer = document.querySelector('footer');
    const chaosSound = document.getElementById('chaosSound');
    const calmSound = document.getElementById('calmSound');
    
    footer.addEventListener('click', function() {
      // Play a random sound (50% chance for each)
      if (Math.random() > 0.5) {
        chaosSound.currentTime = 0;
        chaosSound.play();
      } else {
        calmSound.currentTime = 0;
        calmSound.play();
      }
      
      // Add a temporary class for visual feedback
      footer.classList.add('clicked');
      setTimeout(() => footer.classList.remove('clicked'), 300);
    });
    
    // Initialize Swiper
    const swiper = new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    
    // Video Timer (for the video in swiper)
    const videoTimer = document.querySelector('.video-timer');
    const video = document.querySelector('.swiper-slide video');
    
    if (video) {
      video.addEventListener('timeupdate', function() {
        const currentTime = formatTime(video.currentTime);
        const duration = formatTime(video.duration);
        videoTimer.textContent = `${currentTime} / ${duration}`;
      });
    }
    
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Easter egg - logo animation
    const logo = document.querySelector('.logo-section img');
    let spinCount = 0;
    
    logo.addEventListener('click', function() {
      spinCount++;
      
      if (spinCount === 5) {
        logo.style.animation = 'spin 1s linear 5';
        setTimeout(() => {
          logo.style.animation = '';
        }, 5000);
        spinCount = 0;
      }
    });
  }
});

// Add spin animation for logo easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

const lightModeBtn = document.getElementById("lightModeBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const lightVideo = document.getElementById("light-video");
const darkVideo = document.getElementById("dark-video");

function showLightMode() {
  lightVideo.style.display = "block";
  darkVideo.style.display = "none";
  document.body.classList.remove("dark-theme");
}

function showDarkMode() {
  lightVideo.style.display = "none";
  darkVideo.style.display = "block";
  document.body.classList.add("dark-theme");
}

lightModeBtn.addEventListener("click", showLightMode);
darkModeBtn.addEventListener("click", showDarkMode);

// Set default on load:
window.addEventListener("load", () => {
  showLightMode(); // or use auto detect
});


function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

window.addEventListener("load", () => {
  const video = document.getElementById("light-video");
  if (video) {
    video.play().catch(err => {
      console.warn("Video autoplay failed. Trying manual play.");
    });
  }
});

const toggleBtn = document.querySelector('.theme-toggle');

toggleBtn.addEventListener('click', () => {
  const isDark = document.body.getAttribute('data-theme') === 'dark';
  document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  
  // Update icon
  toggleBtn.innerHTML = isDark 
    ? '<i class="fas fa-moon"></i>' 
    : '<i class="fas fa-sun"></i>';
  
  // Save preference
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Initialize
if (localStorage.getItem('theme') === 'dark') {
  document.body.setAttribute('data-theme', 'dark');
  toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

// Add to your main JS file
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.backdropFilter = 'none';
    navbar.style.boxShadow = 'none';
  }
});
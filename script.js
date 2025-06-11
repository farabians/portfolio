// Futuristic Portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
  });

  // Mobile Dropdown Toggle
  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns
        dropdowns.forEach(d => {
          if (d !== dropdown) {
            d.classList.remove('active');
            const otherChevron = d.querySelector('.fa-chevron-down');
            if (otherChevron) {
              otherChevron.style.transform = 'rotate(0)';
            }
          }
        });

        dropdown.classList.toggle('active');
        const chevron = dropdownToggle.querySelector('.fa-chevron-down');
        chevron.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
      }
    });
  });

  // Close mobile menu and dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      menuToggle.querySelector('i').classList.add('fa-bars');
      
      // Close all dropdowns
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        const chevron = dropdown.querySelector('.fa-chevron-down');
        if (chevron) {
          chevron.style.transform = 'rotate(0)';
        }
      });
    }
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
      }
    });
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
          const chevron = dropdown.querySelector('.fa-chevron-down');
          if (chevron) {
            chevron.style.transform = 'rotate(0)';
          }
        });
      }
    }, 250);
  });

  // ScrollReveal animations
  if (window.ScrollReveal) {
    ScrollReveal().reveal('.hero', {
      duration: 1200,
      origin: 'top',
      distance: '40px',
      opacity: 0,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false
    });
    ScrollReveal().reveal('.floating-card', {
      duration: 1200,
      origin: 'bottom',
      distance: '60px',
      opacity: 0,
      interval: 200,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: false
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Floating hexagons and particles
  const techBg = document.querySelector('.tech-bg');
  if (techBg) {
    for (let i = 0; i < 12; i++) {
      const hex = document.createElement('div');
      hex.className = 'hexagon';
      hex.style.left = Math.random() * 100 + 'vw';
      hex.style.top = Math.random() * 100 + 'vh';
      hex.style.animationDelay = (Math.random() * 12) + 's';
      hex.style.transform = `scale(${0.7 + Math.random() * 0.8})`;
      techBg.appendChild(hex);
    }
    for (let i = 0; i < 24; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.animationDelay = (Math.random() * 8) + 's';
      techBg.appendChild(particle);
    }
  }

  // Card 3D hover effect
  document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Image Modal Functionality
  const modal = document.querySelector('.image-modal');
  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.close-modal');
  const prevBtn = modal.querySelector('.prev-btn');
  const nextBtn = modal.querySelector('.next-btn');
  const gridImages = document.querySelectorAll('.grid-image img, .project-image');
  let currentImageIndex = 0;

  // Open modal when clicking on an image
  gridImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentImageIndex = index;
      updateModalImage();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });

  // Update modal image
  function updateModalImage() {
    modalImg.src = gridImages[currentImageIndex].src;
    modalImg.alt = gridImages[currentImageIndex].alt;
  }

  // Previous image
  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + gridImages.length) % gridImages.length;
    updateModalImage();
  });

  // Next image
  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % gridImages.length;
    updateModalImage();
  });

  // Navigate with arrow keys
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + gridImages.length) % gridImages.length;
        updateModalImage();
      } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % gridImages.length;
        updateModalImage();
      }
    }
  });

  // Close modal when clicking the close button
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Horizontal Scroll Functionality
  const scrollContainers = document.querySelectorAll('.horizontal-block');

  scrollContainers.forEach(container => {
    const imageGrid = container.querySelector('.image-grid');
    const leftBtn = container.querySelector('.scroll-left');
    const rightBtn = container.querySelector('.scroll-right');
    const images = imageGrid.querySelectorAll('.grid-image');
    const scrollAmount = images[0].offsetWidth + 20; // Image width + gap
    const totalImages = images.length;
    
    let currentIndex = 0;
    let isScrolling = false;

    // Create pagination dots
    const paginationContainer = container.querySelector('.pagination-dots');
    for (let i = 0; i < totalImages; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        if (!isScrolling) {
          currentIndex = i;
          scrollToImage(i);
        }
      });
      paginationContainer.appendChild(dot);
    }

    // Function to update active dot
    const updateActiveDot = (index) => {
      container.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    };

    // Function to scroll to specific image with smooth transition to first image
    const scrollToImage = (index, smooth = true) => {
      isScrolling = true;
      
      // If we're at the last image and moving to the first
      if (currentIndex === totalImages - 1 && index === 0) {
        // First scroll a bit more to the right to create smooth transition effect
        imageGrid.scrollTo({
          left: (totalImages - 1) * scrollAmount + 50,
          behavior: 'smooth'
        });
        
        // Then quickly snap to first image
        setTimeout(() => {
          imageGrid.scrollTo({
            left: 0,
            behavior: 'auto'
          });
          isScrolling = false;
        }, 300);
      } else {
        // Normal scroll between images
        imageGrid.scrollTo({
          left: index * scrollAmount,
          behavior: smooth ? 'smooth' : 'auto'
        });
        
        setTimeout(() => {
          isScrolling = false;
        }, 300);
      }
      
      updateActiveDot(index);
    };

    // Left scroll button
    leftBtn.addEventListener('click', () => {
      if (!isScrolling) {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        scrollToImage(currentIndex);
      }
    });

    // Right scroll button
    rightBtn.addEventListener('click', () => {
      if (!isScrolling) {
        currentIndex = (currentIndex + 1) % totalImages;
        scrollToImage(currentIndex);
      }
    });

    // Update dots and buttons on scroll
    imageGrid.addEventListener('scroll', () => {
      if (!isScrolling) {
        const newIndex = Math.round(imageGrid.scrollLeft / scrollAmount);
        if (newIndex !== currentIndex) {
          currentIndex = newIndex % totalImages;
          updateActiveDot(currentIndex);
        }
      }

      // Show/hide navigation buttons
      leftBtn.style.opacity = imageGrid.scrollLeft > 0 ? '1' : '0';
      rightBtn.style.opacity = '1'; // Always show right button for infinite scroll
    });

    // Initial button visibility
    rightBtn.style.opacity = '1';
    leftBtn.style.opacity = '0';
  });

  // Smooth scroll functionality for portfolio links
  const scrollLinks = document.querySelectorAll('.scroll-link');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close dropdown menu
        const dropdownMenu = document.querySelector('.dropdown-menu');
        dropdownMenu.style.display = 'none';
        
        // Smooth scroll to target
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Add active class to current section
        scrollLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      const dropdownMenu = document.querySelector('.dropdown-menu');
      dropdownMenu.style.display = 'none';
    }
  });
  
  // Toggle dropdown menu
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  dropdownToggle.addEventListener('click', function(e) {
    e.preventDefault();
    const isDisplayed = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isDisplayed ? 'none' : 'block';
  });
});

// Add scroll-based active state for sections
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 200; // Offset for better active state switching

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.scroll-link[href="#${sectionId}"]`);

    if (link && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.scroll-link').forEach(link => link.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

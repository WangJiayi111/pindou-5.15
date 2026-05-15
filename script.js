document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll("#carousel .carousel-slide");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const carousel = document.getElementById("carousel");
  const dotsContainer = document.getElementById("carousel-dots");

  let currentSlide = 0;
  let interval=null;
  let dots = [];

  // ✅ 创建 dots
  function createDots() {
    dotsContainer.innerHTML = "";
    dots = [];

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");

      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        stopAutoSlide();
        showSlide(i);
        startAutoSlide();
      });

      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  // ✅ 切换 slide//ai_assited
  function showSlide(index) {
  currentSlide = index;

  const offset = -index * 100;

  document.querySelector("#carousel .carousel-slides").style.transform =
    `translateX(${offset}%)`;

  dots.forEach(d => d.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startAutoSlide() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  // 按钮
  nextBtn?.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevBtn?.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
  

  // hover 暂停
  carousel?.addEventListener("mouseenter", stopAutoSlide);
  carousel?.addEventListener("mouseleave", startAutoSlide);

  // 初始化
  if (slides.length > 0) {
    createDots();
    showSlide(0);
    startAutoSlide();
  }


   
   
   const cards = document.querySelectorAll('.card');
   
    cards.forEach(card => {
        const slider = card.querySelector('.image-slider');
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.slide');
        const dotsContainer = slider.querySelector('.nav-dots');
        
        if (slides.length <= 1) {
            if (dotsContainer) dotsContainer.style.display = 'none';
            return;
        }
        
        dotsContainer.innerHTML = '';
        let dots = [];
        
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
        
        let currentSlide = 0;
        
        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', (function(idx) {
                return function() { showSlide(idx); };
            })(i));
        }
    });

//Guide Part
    const guideCards = document.querySelectorAll(".guide-card");

const modal = document.getElementById("guideModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

const closeModal = document.getElementById("closeModal");

guideCards.forEach(card => {

    card.addEventListener("click", () => {

        const title = card.dataset.title;
        const img = card.dataset.img;
        const desc = card.dataset.desc;

        modalImg.src = img;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;

        modal.classList.add("show");

    });

});

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {

    if(e.target === modal){
        modal.classList.remove("show");
    }

});
    
    // ========== LIGHTBOX: click on any image to zoom ==========
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Add click event to all images that appear in slides
   function attachLightboxToImages() {
    const allImages = document.querySelectorAll('.slide-img');
    const lightboxCaption = document.getElementById('lightboxCaption'); // 获取 caption 元素
    
    allImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            
            const card = img.closest('.card');
            if (card) {
                const overlayText = card.querySelector('.overlay-text');
                if (overlayText) {
                    lightboxCaption.textContent = overlayText.innerText;
                } else {
                    lightboxCaption.textContent = '';
                }
            } else {
                lightboxCaption.textContent = '';
            }
            
            lightbox.classList.add('show');
        });
    });
}
    
    // Close lightbox when clicking X or outside the image
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });
    
    // Since images are loaded dynamically? Actually static, but we call once
    attachLightboxToImages();
  





    

/// Form  VALIDATION 
const form = document.getElementById("registrationform");
    
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            document.querySelectorAll(".error").forEach(el => el.textContent = "");
            
            document.querySelectorAll('#registration input, #registration select, #registration textarea').forEach(el => {
                el.classList.remove("error-highlight");
            });
            
            let isValid = true;
            
            const name = document.getElementById("name").value.trim();
            if (name === "") {
                document.getElementById("nameError").textContent = "Full name is required.";
                document.getElementById("name").classList.add("error-highlight");
                isValid = false;
            }
            
            const email = document.getElementById("email").value.trim();
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                document.getElementById("emailError").textContent = "Enter a valid email address.";
                document.getElementById("email").classList.add("error-highlight");
                isValid = false;
            }
            
            const visitDate = document.getElementById("date-of-visit").value;
            if (!visitDate) {
                document.getElementById("visitDateError").textContent = "Select your visit date.";
                document.getElementById("date-of-visit").classList.add("error-highlight");
                isValid = false;
            }
            
            const noOfCustomers = document.getElementById("no-of-customers").value;
            if (noOfCustomers === "") {
                document.getElementById("customersError").textContent = "Select the number of customers.";
                document.getElementById("no-of-customers").classList.add("error-highlight");
                isValid = false;
            }
            
            if (isValid) {
                const nameValue = document.getElementById("name").value.trim();
                const emailValue = document.getElementById("email").value.trim();
                const dateValue = document.getElementById("date-of-visit").value;
                const customersValue = document.getElementById("no-of-customers").options[
                    document.getElementById("no-of-customers").selectedIndex
                ]?.text;
                const commentsValue = document.getElementById("comments").value.trim() || "No special requests";
                
                alert(`Booking Confirmed, ${nameValue}!\n\n🥰We've received your perler beads workshop booking.\nA confirmation email will be sent to: ${emailValue}\n\n📅 Date: ${dateValue}\n👥 Party: ${customersValue}\n💬 Requests: ${commentsValue}\n\nSee you! ✨`);
                form.reset();
            }
        });
    }


    console.log(slides.length);

});

// ========== 汉堡菜单功能 ==========
const burger = document.getElementById('burger-menu');
const navMenu = document.getElementById('navLinks');
    if (burger && navMenu) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('show');
        });
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => { navMenu.classList.remove('show'); });
        });
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('show') && !navMenu.contains(e.target) && !burger.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
 }




Vue.createApp({
  data() {
    return {
      
      traits: ['Creative', 'Imaginative', 'Expressive', 'Artistic',
        'Strong', 'Courageous', 'Resilient', 'Determined',
        'Gentle', 'Calm', 'Peaceful', 'Harmonious',
        'Energetic', 'Lively', 'Dynamic', 'Vibrant',
        'Mysterious', 'Magical', 'Enchanting', 'Whimsical',
        'Natural', 'Organic', 'Earthy', 'Rooted',
        'Playful', 'Fun-loving', 'Cheerful', 'Lighthearted',
        'Wise', 'Thoughtful', 'Reflective', 'Insightful',
        'Social', 'Friendly', 'Warm', 'Approachable',
        'Unique', 'Unconventional', 'Bold', 'Striking'],
      
      selectedTraits: [],
      
      
      characters: [
        {
          name: 'Human Characters',
          traits: ['Creative', 'Expressive', 'Strong', 'Determined', 'Social', 'Friendly', 'Warm', 'Wise', 'Thoughtful', 'Energetic'],
          image: 'character1.jpg',
          description: 'People, heroes, professionals, historical figures, and everyday characters.'
        },
        {
          name: 'Land Animals',
          traits: ['Strong', 'Courageous', 'Gentle', 'Calm', 'Energetic', 'Playful', 'Lively', 'Loyal', 'Protective', 'Curious'],
          image: 'landanimal.jpg',
          description: 'Mammals, reptiles, insects, and all creatures that live on land.'
        },
        {
          name: 'Water & Flying Creatures',
          traits: ['Free-spirited', 'Dreamy', 'Colorful', 'Elegant', 'Vibrant', 'Gentle', 'Peaceful', 'Graceful', 'Fluid', 'Soaring'],
          image: 'water-flying.jpg',
          description: 'Birds, fish, butterflies, dragons, and all creatures of air and sea.'
        },
        {
          name: 'Fantasy & Mystical Beings',
          traits: ['Magical', 'Mysterious', 'Enchanting', 'Whimsical', 'Imaginative', 'Unique', 'Bold', 'Dreamy', 'Unconventional', 'Spiritual'],
          image: 'imagine.jpg',
          description: 'Unicorns, dragons, elves, monsters, aliens, and mythical creatures.'
        },
        {
          name: 'Plants & Natural Elements',
          traits: ['Natural', 'Organic', 'Earthy', 'Rooted', 'Calm', 'Peaceful', 'Gentle', 'Harmonious', 'Growing', 'Alive'],
          image: 'plants.jpg',
          description: 'Flowers, trees, leaves, sun, moon, stars, rainbows, and natural phenomena.'
        },
        {
          name: 'Objects, Shapes & Abstract',
          traits: ['Unique', 'Bold', 'Striking', 'Geometric', 'Modern', 'Minimal', 'Playful', 'Fun-loving', 'Graphic', 'Stylized'],
          image: 'pattern.jpg',
          description: 'Hearts, stars, letters, food, vehicles, furniture, symbols, and geometric designs.'
        }
      ],
      result: null,
      noResult: false
    }
  },
  methods: {
    findCharacter() {
      this.result = null;
      this.noResult = false;

      if (this.selectedTraits.length === 0) {
        this.noResult = true;
        return;
      }

      let bestMatch = null;
      let highestScore = 0;

      for (const character of this.characters) {
        const matchCount = character.traits.filter(trait => 
          this.selectedTraits.includes(trait)
        ).length;
        
        const score = matchCount;
        
        if (score > highestScore) {
          bestMatch = character;
          highestScore = score;
        }
      }

      if (bestMatch && highestScore > 0) {
        this.result = bestMatch;
      } else {
        this.noResult = true;
      }
    },
    
    clearChoice() {
      this.selectedTraits = [];
      this.result = null;
      this.noResult = false;
    }
  }
}).mount("#app");
 


// ========== Login/Register Feature with Multiple Login/Logout ==========
(function() {
    // Get DOM elements
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userWelcome = document.getElementById('userWelcome');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const doLoginBtn = document.getElementById('doLoginBtn');
    const doRegisterBtn = document.getElementById('doRegisterBtn');

    // Protected sections (require login)
    const protectedSections = document.querySelectorAll('#carousel, #gallery, #guide, #other, #registration, #beads-faq');
    
    // ⭐ 新增：获取 homeBanner 元素
    const homeBanner = document.getElementById('homeBanner');
    
    // ⭐ 新增：横幅可见性控制函数
    function updateBannerVisibility(isLoggedIn) {
        if (homeBanner) {
            if (isLoggedIn) {
                homeBanner.classList.add('hide-banner');
            } else {
                homeBanner.classList.remove('hide-banner');
            }
        }
    }
    
    // Check login status
    let loggedInUser = localStorage.getItem('loggedInUser');

    // Update UI based on login status
    function updateUI() {
        if (loggedInUser) {
            userWelcome.innerHTML = `👋 Welcome, ${loggedInUser}`;
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            protectedSections.forEach(section => {
                if (section) section.style.display = '';
            });
        } else {
            userWelcome.innerHTML = '';
            loginBtn.style.display = 'inline-block';
            registerBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            protectedSections.forEach(section => {
                if (section) section.style.display = 'none';
            });
        }
        
        // ⭐ 新增：更新横幅可见性
        updateBannerVisibility(!!loggedInUser);
    }

    // Modal functions
    function showLoginModal() {
        loginModal.style.display = 'flex';
        registerModal.style.display = 'none';
        const loginUsername = document.getElementById('loginUsername');
        const loginPassword = document.getElementById('loginPassword');
        const loginMessage = document.getElementById('loginMessage');
        if (loginUsername) loginUsername.value = '';
        if (loginPassword) loginPassword.value = '';
        if (loginMessage) loginMessage.innerHTML = '';
    }

    function showRegisterModal() {
        registerModal.style.display = 'flex';
        loginModal.style.display = 'none';
        const regFullname = document.getElementById('regFullname');
        const regAge = document.getElementById('regAge');
        const regEmail = document.getElementById('regEmail');
        const regUsername = document.getElementById('regUsername');
        const regPassword = document.getElementById('regPassword');
        const registerMessage = document.getElementById('registerMessage');
        
        if (regFullname) regFullname.value = '';
        if (regAge) regAge.value = '';
        if (regEmail) regEmail.value = '';
        if (regUsername) regUsername.value = '';
        if (regPassword) regPassword.value = '';
        if (registerMessage) registerMessage.innerHTML = '';
        
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        genderRadios.forEach(r => r.checked = false);
    }

    function hideAllModals() {
        if (loginModal) loginModal.style.display = 'none';
        if (registerModal) registerModal.style.display = 'none';
    }

    // Event listeners for buttons
    if (loginBtn) loginBtn.onclick = showLoginModal;
    if (registerBtn) registerBtn.onclick = showRegisterModal;
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            localStorage.removeItem('loggedInUser');
            loggedInUser = null;
            updateUI();
            location.reload();
        };
    }
    if (closeLoginModal) closeLoginModal.onclick = hideAllModals;
    if (closeRegisterModal) closeRegisterModal.onclick = hideAllModals;
    if (switchToRegister) switchToRegister.onclick = showRegisterModal;
    if (switchToLogin) switchToLogin.onclick = showLoginModal;

    // Close modal when clicking outside
    window.onclick = function(e) {
        if (e.target === loginModal) hideAllModals();
        if (e.target === registerModal) hideAllModals();
    };

    // Login function
    if (doLoginBtn) {
        doLoginBtn.onclick = function() {
            const username = document.getElementById('loginUsername').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const msgDiv = document.getElementById('loginMessage');

            if (!username || !password) {
                if (msgDiv) {
                    msgDiv.innerHTML = '❌ Please enter username and password';
                    msgDiv.style.color = '#ed655c';
                }
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const found = users.find(u => u.username === username && u.password === password);

            if (found) {
                localStorage.setItem('loggedInUser', found.username);
                loggedInUser = found.username;
                if (msgDiv) {
                    msgDiv.innerHTML = '✅ Login successful! Refreshing...';
                    msgDiv.style.color = '#4a7a2e';
                }
                setTimeout(() => location.reload(), 800);
            } else {
                if (msgDiv) {
                    msgDiv.innerHTML = '❌ Invalid username or password';
                    msgDiv.style.color = '#ed655c';
                }
            }
        };
    }

    // Register function
    if (doRegisterBtn) {
        doRegisterBtn.onclick = function() {
            const fullname = document.getElementById('regFullname').value.trim();
            let gender = '';
            document.querySelectorAll('input[name="gender"]').forEach(radio => {
                if (radio.checked) gender = radio.value;
            });
            const age = document.getElementById('regAge').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const msgDiv = document.getElementById('registerMessage');

            // Validation
            if (!fullname) {
                if (msgDiv) {
                    msgDiv.innerHTML = '❌ Full Name is required';
                    msgDiv.style.color = '#ed655c';
                }
                return;
            }
            if (!email) {
                if (msgDiv) {
                    msgDiv.innerHTML = '❌ Email is required';
                    msgDiv.style.color = '#ed655c';
                }
                return;
            }
            const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (msgDiv) {
                    msgDiv.innerHTML = '❌ Enter a valid email address';
                    msgDiv.style.color = '#ed655c';
                }
                return;
            }
            if (!username) {
                if (msgDiv) {
                    msgDiv.innerHTML = '❌ Username is required';
                    msgDiv.style.color = '#ed655c';
                }
                return;
            }
            if (!password) {
                if (msgDiv) {
                    msgDiv.innerHTML = '❌ Password is required';
                    msgDiv.style.color = '#ed655c';
                }
                return;
            }
            if (password.length < 3) {
                if (msgDiv) {
                    msgDiv.innerHTML = '❌ Password must be at least 3 characters';
                    msgDiv.style.color = '#ed655c';
                }
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(u => u.username === username)) {
                if (msgDiv) {
                    msgDiv.innerHTML = '❌ Username already exists';
                    msgDiv.style.color = '#ed655c';
                }
                return;
            }

            // Save user data
            const newUser = { username, password, fullname, gender, age: age || '', email };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            if (msgDiv) {
                msgDiv.innerHTML = '✅ Registration successful! Please login.';
                msgDiv.style.color = '#4a7a2e';
            }

            setTimeout(() => {
                hideAllModals();
                showLoginModal();
                const loginUsernameField = document.getElementById('loginUsername');
                if (loginUsernameField) loginUsernameField.value = username;
            }, 1500);
        };
    }

    // Initialize UI
    if (loggedInUser) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let stillValid = users.find(u => u.username === loggedInUser);
        if (!stillValid) {
            localStorage.removeItem('loggedInUser');
            loggedInUser = null;
        }
    }
    updateUI();
})();

 
    
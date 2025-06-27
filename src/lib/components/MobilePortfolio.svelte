<script>
  import { onMount } from 'svelte';
  import { mobileWelcome, mobileAbout, mobileSkills, mobileProjects, mobileProjectDetails } from '../mobileContent.js';
  
  let activeSection = 'welcome';
  let currentContent = mobileWelcome;
  let isMenuOpen = false;
  let currentProject = null;
  
  // Touch handling for swipe gestures
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  
  const sections = ['welcome', 'about', 'skills', 'projects'];
  
  function selectSection(section) {
    try {
      activeSection = section;
      isMenuOpen = false;
      currentProject = null;
      
      switch (section) {
        case 'welcome':
          currentContent = mobileWelcome;
          break;
        case 'about':
          currentContent = mobileAbout;
          break;
        case 'skills':
          currentContent = mobileSkills;
          break;
        case 'projects':
          currentContent = mobileProjects;
          break;
        default:
          currentContent = mobileWelcome;
      }
      
      // Scroll to top when changing sections
      if (typeof window !== 'undefined' && window.scrollTo) {
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.warn('Section selection error:', error);
    }
  }
  
  function showProjectDetail(projectId) {
    try {
      currentProject = projectId;
      currentContent = mobileProjectDetails[projectId];
      if (typeof window !== 'undefined' && window.scrollTo) {
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.warn('Project detail error:', error);
    }
  }
  
  function showProjects() {
    currentProject = null;
    selectSection('projects');
  }
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  function handleTouchStart(e) {
    try {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }
    } catch (error) {
      console.warn('Touch start error:', error);
    }
  }
  
  function handleTouchEnd(e) {
    try {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      }
    } catch (error) {
      console.warn('Touch end error:', error);
    }
  }
  
  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 50;
    
    // Only handle horizontal swipes that are longer than vertical ones
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      const currentIndex = sections.indexOf(activeSection);
      
      if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - previous section
        selectSection(sections[currentIndex - 1]);
      } else if (deltaX < 0 && currentIndex < sections.length - 1) {
        // Swipe left - next section
        selectSection(sections[currentIndex + 1]);
      }
    }
  }
  
  onMount(() => {
    try {
      // Handle project card clicks
      const handleProjectClick = (e) => {
        try {
          const projectCard = e.target.closest('[data-project]');
          if (projectCard) {
            const projectId = projectCard.dataset.project;
            showProjectDetail(projectId);
          }
        } catch (error) {
          console.warn('Project click handler error:', error);
        }
      };
      
      document.addEventListener('click', handleProjectClick);
      
      // Make showProjects function global for back buttons
      if (typeof window !== 'undefined') {
        window.showProjects = showProjects;
      }
      
      return () => {
        try {
          document.removeEventListener('click', handleProjectClick);
          if (typeof window !== 'undefined' && window.showProjects) {
            delete window.showProjects;
          }
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
      };
    } catch (error) {
      console.warn('MobilePortfolio onMount error:', error);
    }
  });
  
  // Add error handling for social media interactions
  function handleSocialClick(url, fallbackText) {
    try {
      window.open(url, '_blank');
    } catch (error) {
      console.warn('Could not open link:', error);
      // Could show a toast notification or copy to clipboard as fallback
    }
  }
  
  function handleEmailClick() {
    try {
      window.location.href = "mailto:mohammedamaar165@gmail.com?subject=Portfolio Contact&body=Hello Mohammed,";
    } catch (error) {
      console.warn('Could not open email client:', error);
      // Could copy email to clipboard as fallback
    }
  }
</script>

<div class="mobile-portfolio" 
     on:touchstart={handleTouchStart} 
     on:touchend={handleTouchEnd}>
  
  <!-- Mobile Header -->
  <header class="mobile-header">
    <div class="header-content">
      <div class="logo">
        <h1>MA</h1>
        <span>Mohammed Alhamadani</span>
      </div>
      <button class="menu-toggle {isMenuOpen ? 'active' : ''}" 
              on:click={toggleMenu}
              aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
  
  <!-- Mobile Navigation -->
  <nav class="mobile-nav {isMenuOpen ? 'open' : ''}">
    <div class="nav-content">
      <button class="nav-btn {activeSection === 'welcome' ? 'active' : ''}"
              on:click={() => selectSection('welcome')}>
        <span class="nav-icon">🏠</span>
        Welcome
      </button>
      <button class="nav-btn {activeSection === 'about' ? 'active' : ''}"
              on:click={() => selectSection('about')}>
        <span class="nav-icon">👤</span>
        About
      </button>
      <button class="nav-btn {activeSection === 'skills' ? 'active' : ''}"
              on:click={() => selectSection('skills')}>
        <span class="nav-icon">⚡</span>
        Skills
      </button>
      <button class="nav-btn {activeSection === 'projects' ? 'active' : ''}"
              on:click={() => selectSection('projects')}>
        <span class="nav-icon">🚀</span>
        Projects
      </button>
    </div>
  </nav>
  
  <!-- Main Content -->
  <main class="mobile-main">
    <div class="content-container">
      {@html currentContent}
    </div>
  </main>
  
  <!-- Mobile Footer -->
  <footer class="mobile-footer">
    <div class="social-links">
      <a href="https://www.linkedin.com/in/mohammed-al-hamadani-a88518302/" 
         target="_blank" 
         class="social-link"
         aria-label="LinkedIn"
         on:click|preventDefault={() => handleSocialClick('https://www.linkedin.com/in/mohammed-al-hamadani-a88518302/', 'LinkedIn')}>
        <img src="/linked2.svg" alt="LinkedIn" />
      </a>
      <a href="https://github.com/Mohammed87FS" 
         target="_blank" 
         class="social-link"
         aria-label="GitHub"
         on:click|preventDefault={() => handleSocialClick('https://github.com/Mohammed87FS', 'GitHub')}>
        <img src="/git.svg" alt="GitHub" />
      </a>
      <a href="mailto:mohammedamaar165@gmail.com" 
         class="social-link"
         aria-label="Email"
         on:click|preventDefault={handleEmailClick}>
        <img src="/mail.svg" alt="Email" />
      </a>
      <a href="https://instagram.com/m877ammar" 
         target="_blank" 
         class="social-link"
         aria-label="Instagram"
         on:click|preventDefault={() => handleSocialClick('https://instagram.com/m877ammar', 'Instagram')}>
        <img src="/insta.svg" alt="Instagram" />
      </a>
    </div>
    <div class="footer-text">
      <p>© 2025 Mohammed Alhamadani</p>
    </div>
  </footer>
  
</div>

<style>
  /* Global Mobile Styles */
  .mobile-portfolio {
    min-height: 100vh;
    background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
    color: #FFAA00;
    font-family: 'Press Start 2P', cursive;
    display: flex;
    flex-direction: column;
  }
  
  /* Header Styles */
  .mobile-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 2px solid #FFAA00;
    z-index: 1000;
    padding: 1rem;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .logo h1 {
    font-size: 1.5rem;
    color: #FFAA00;
    text-shadow: 2px 2px 0 #FF0000;
    margin: 0;
  }
  
  .logo span {
    font-size: 0.6rem;
    color: #FFD700;
    display: block;
    margin-top: 0.2rem;
  }
  
  /* Hamburger Menu */
  .menu-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    z-index: 1001;
  }
  
  .menu-toggle span {
    width: 25px;
    height: 3px;
    background: #FFAA00;
    transition: all 0.3s ease;
    transform-origin: center;
  }
  
  .menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }
  
  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }
  
  /* Navigation Styles */
  .mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.98);
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    z-index: 999;
    padding-top: 100px;
  }
  
  .mobile-nav.open {
    transform: translateY(0);
  }
  
  .nav-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .nav-btn {
    background: transparent;
    border: 2px solid #FFAA00;
    color: #FFAA00;
    padding: 1rem;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 1rem;
    text-align: left;
  }
  
  .nav-btn:hover,
  .nav-btn.active {
    background: #FFAA00;
    color: #000000;
    transform: scale(1.02);
  }
  
  .nav-icon {
    font-size: 1.2rem;
    width: 2rem;
    text-align: center;
  }
  
  /* Main Content */
  .mobile-main {
    flex: 1;
    margin-top: 100px;
    padding: 1rem;
    max-width: 1200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .content-container {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Content Styles */
  :global(.mobile-welcome) {
    text-align: center;
    padding: 2rem 0;
  }
  
  :global(.mobile-welcome h1) {
    font-size: clamp(2rem, 8vw, 4rem);
    color: #FFAA00;
    text-shadow: 3px 3px 0 #FF0000, 6px 6px 0 #990000;
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  
  :global(.mobile-welcome p) {
    font-size: clamp(0.8rem, 3vw, 1.2rem);
    line-height: 1.6;
    color: #FFD700;
    margin-bottom: 2rem;
  }
  
  :global(.welcome-features) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  :global(.feature) {
    background: rgba(255, 170, 0, 0.1);
    border: 2px solid #FFAA00;
    padding: 1rem;
    border-radius: 8px;
    font-size: clamp(0.7rem, 2.5vw, 1rem);
  }
  
  :global(.mobile-content h1) {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    color: #FFAA00;
    text-shadow: 2px 2px 0 #FF0000;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  /* Info Grid */
  :global(.info-grid) {
    display: grid;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  :global(.info-card) {
    background: rgba(255, 170, 0, 0.05);
    border: 2px solid #FFAA00;
    border-radius: 12px;
    padding: 1.5rem;
  }
  
  :global(.info-card h3) {
    color: #FFD700;
    font-size: clamp(0.8rem, 3vw, 1.2rem);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  :global(.info-card p),
  :global(.info-card li) {
    font-size: clamp(0.6rem, 2.5vw, 0.9rem);
    line-height: 1.6;
    color: #FFAA00;
    margin-bottom: 0.5rem;
  }
  
  :global(.info-card ul) {
    list-style: none;
    padding: 0;
  }
  
  :global(.info-card li::before) {
    content: "▶ ";
    color: #FFD700;
    margin-right: 0.5rem;
  }
  
  /* Skills Styles */
  :global(.skills-container) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  :global(.skill-category) {
    background: rgba(255, 170, 0, 0.05);
    border: 2px solid #FFAA00;
    border-radius: 12px;
    padding: 1.5rem;
  }
  
  :global(.skill-category h3) {
    color: #FFD700;
    font-size: clamp(0.8rem, 3vw, 1.2rem);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  :global(.skill-tags) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
  
  :global(.skill-tag) {
    background: rgba(255, 170, 0, 0.2);
    color: #FFAA00;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: clamp(0.5rem, 2vw, 0.7rem);
    border: 1px solid #FFAA00;
    transition: all 0.3s ease;
  }
  
  :global(.skill-tag:hover) {
    background: #FFAA00;
    color: #000000;
    transform: scale(1.05);
  }
  
  /* Projects Styles */
  :global(.projects-grid) {
    display: grid;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  :global(.project-card) {
    background: rgba(255, 170, 0, 0.05);
    border: 2px solid #FFAA00;
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  :global(.project-card:hover) {
    transform: translateY(-5px);
    border-color: #FFD700;
    box-shadow: 0 10px 20px rgba(255, 170, 0, 0.2);
  }
  
  :global(.project-header) {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }
  
  :global(.project-header h3) {
    color: #FFD700;
    font-size: clamp(0.8rem, 3vw, 1.2rem);
    margin: 0;
    flex: 1;
  }
  
  :global(.project-type) {
    background: rgba(255, 215, 0, 0.2);
    color: #FFD700;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: clamp(0.4rem, 1.8vw, 0.6rem);
    border: 1px solid #FFD700;
    white-space: nowrap;
  }
  
  :global(.project-card p) {
    font-size: clamp(0.6rem, 2.5vw, 0.8rem);
    line-height: 1.6;
    color: #FFAA00;
    margin-bottom: 1rem;
  }
  
  :global(.project-tech) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  :global(.tech-tag) {
    background: rgba(255, 0, 0, 0.2);
    color: #FF6B6B;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: clamp(0.4rem, 1.8vw, 0.6rem);
    border: 1px solid #FF6B6B;
  }
  
  /* Project Detail Styles */
  :global(.project-detail) {
    animation: fadeIn 0.5s ease;
  }
  
  :global(.back-btn) {
    background: transparent;
    border: 2px solid #FFAA00;
    color: #FFAA00;
    padding: 0.8rem 1.5rem;
    font-family: 'Press Start 2P', cursive;
    font-size: clamp(0.5rem, 2vw, 0.7rem);
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
    margin-bottom: 2rem;
  }
  
  :global(.back-btn:hover) {
    background: #FFAA00;
    color: #000000;
  }
  
  :global(.project-detail h1) {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
    color: #FFAA00;
    text-shadow: 2px 2px 0 #FF0000;
    margin-bottom: 2rem;
  }
  
  :global(.project-images) {
    margin: 2rem 0;
    text-align: center;
  }
  
  :global(.project-images img) {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    border: 2px solid #FFAA00;
  }
  
  :global(.project-detail p) {
    font-size: clamp(0.6rem, 2.5vw, 0.9rem);
    line-height: 1.6;
    color: #FFAA00;
    margin-bottom: 2rem;
  }
  
  :global(.project-detail h3) {
    color: #FFD700;
    font-size: clamp(0.8rem, 3vw, 1.2rem);
    margin: 2rem 0 1rem 0;
  }
  
  :global(.project-detail ul) {
    list-style: none;
    padding: 0;
  }
  
  :global(.project-detail li) {
    font-size: clamp(0.6rem, 2.5vw, 0.8rem);
    line-height: 1.6;
    color: #FFAA00;
    margin-bottom: 0.5rem;
  }
  
  :global(.project-detail li::before) {
    content: "▶ ";
    color: #FFD700;
    margin-right: 0.5rem;
  }
  
  /* Footer Styles */
  .mobile-footer {
    background: rgba(0, 0, 0, 0.95);
    border-top: 2px solid #FFAA00;
    padding: 2rem 1rem 1rem;
    margin-top: 3rem;
  }
  
  .social-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border: 2px solid #FFAA00;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .social-link:hover {
    background: #FFAA00;
    transform: scale(1.1);
  }
  
  .social-link img {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
    transition: filter 0.3s ease;
  }
  
  .social-link:hover img {
    filter: brightness(0);
  }
  
  .footer-text {
    text-align: center;
  }
  
  .footer-text p {
    font-size: 0.6rem;
    color: #888;
    margin: 0;
  }
  
  /* Responsive Adjustments */
  @media (min-width: 768px) {
    .nav-content {
      flex-direction: row;
      justify-content: space-around;
    }
    
    .nav-btn {
      flex: 1;
      max-width: 200px;
    }
    
    :global(.info-grid) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    
    :global(.projects-grid) {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
    
    :global(.skill-category) {
      display: flex;
      flex-direction: column;
    }
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    .mobile-header {
      padding: 0.5rem 1rem;
    }
    
    .logo h1 {
      font-size: 1.2rem;
    }
    
    .logo span {
      font-size: 0.5rem;
    }
    
    .mobile-main {
      margin-top: 80px;
    }
  }
</style>

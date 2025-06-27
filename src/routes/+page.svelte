<script>
  import { onMount } from 'svelte';
  import ThreeScene from '$lib/components/ThreeScene.svelte';
  import MobilePortfolio from '$lib/components/MobilePortfolio.svelte';
  import ErrorBoundary from '$lib/components/ErrorBoundary.svelte';
  
  let isMobile = false;
  let isTablet = false;
  let isLoading = true;
  
  onMount(() => {
    try {
      // Console message for debugging
      console.log('Mohammed Alhamadani Portfolio - Initializing...');
      
      // Unregister service worker in development to fix conflicts
      if ('serviceWorker' in navigator && window.location.hostname.includes('localhost')) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
            console.log('SW unregistered for development');
          });
        });
      }
      
      // Register service worker for better mobile experience (only in production)
      if ('serviceWorker' in navigator && !window.location.hostname.includes('localhost')) {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered:', registration);
          })
          .catch((error) => {
            console.log('SW registration failed:', error);
          });
      }
      
      const checkDevice = () => {
        const width = window.innerWidth;
        const userAgent = navigator.userAgent.toLowerCase();
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        isMobile = width <= 768 || (isTouchDevice && width <= 1024 && width < window.innerHeight);
        isTablet = width > 768 && width <= 1024 && isTouchDevice;
        
        console.log(`📱 Device detected: ${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'} (${width}px)`);
      };
      
      checkDevice();
      
      const handleResize = () => {
        try {
          checkDevice();
        } catch (error) {
          console.warn('Resize handler error:', error);
        }
      };
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
      
      // Remove loading after device detection
      setTimeout(() => {
        isLoading = false;
        console.log('✅ Portfolio loaded successfully!');
      }, 1000);
      
      return () => {
        try {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('orientationchange', handleResize);
        } catch (error) {
          console.warn('Cleanup error:', error);
        }
      };
    } catch (error) {
      console.warn('onMount error:', error);
      // Fallback: assume desktop and show loading screen briefly
      isLoading = false;
    }
  });
</script>

<ErrorBoundary>
  {#if isLoading}
    <div class="loading-screen">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>Loading Portfolio...</p>
      </div>
    </div>
  {:else if isMobile || isTablet}
    <MobilePortfolio />
  {:else}
    <ThreeScene />
  {/if}
</ErrorBoundary>

<style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    font-family: 'Press Start 2P', cursive;
  }
  
  .loading-content {
    text-align: center;
    color: #FFAA00;
  }
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #333;
    border-top: 4px solid #FFAA00;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  
  .loading-content p {
    font-size: 16px;
    margin: 0;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
  

  

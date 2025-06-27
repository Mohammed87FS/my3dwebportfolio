<script>
  import { onMount } from 'svelte';
  
  export let fallback = 'Something went wrong. Please refresh the page.';
  let hasError = false;
  let errorMessage = '';
  
  // Error boundary for catching JavaScript errors
  onMount(() => {
    const handleError = (error) => {
      console.error('Error caught by boundary:', error);
      hasError = true;
      errorMessage = error.message || fallback;
    };
    
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      hasError = true;
      errorMessage = event.reason?.message || 'Network or loading error occurred';
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  });
  
  function retry() {
    hasError = false;
    errorMessage = '';
    // Force a page reload as fallback
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
</script>

{#if hasError}
  <div class="error-boundary">
    <div class="error-content">
      <h2>⚠️ Oops!</h2>
      <p>{errorMessage}</p>
      <button on:click={retry} class="retry-btn">
        Try Again
      </button>
    </div>
  </div>
{:else}
  <slot />
{/if}

<style>
  .error-boundary {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #000000;
    color: #FFAA00;
    font-family: 'Press Start 2P', cursive;
    padding: 2rem;
  }
  
  .error-content {
    text-align: center;
    max-width: 500px;
  }
  
  .error-content h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #FF6B6B;
  }
  
  .error-content p {
    font-size: 0.8rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #FFD700;
  }
  
  .retry-btn {
    background: transparent;
    border: 2px solid #FFAA00;
    color: #FFAA00;
    padding: 1rem 2rem;
    font-family: 'Press Start 2P', cursive;
    font-size: 0.7rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
  }
  
  .retry-btn:hover {
    background: #FFAA00;
    color: #000000;
    transform: scale(1.05);
  }
</style>

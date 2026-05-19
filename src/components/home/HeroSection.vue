<template>
  <section id="intro" class="hero-wrapper">
    <div class="hero" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="fade-overlay"></div>
      <div class="overlay">
        <div class="hero-content">
          <h1>Care and Compassion</h1>
          <h1>for the Community.</h1>
        </div>

        <div class="actions">
          <router-link to="/pre-application">
            <button class="hero-button primary">Pre-apply for Assistance</button>
          </router-link>
          <router-link to="/pre-donation">
            <button class="hero-button secondary">
              Pledge Donation
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    backgroundImage: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.hero-wrapper {
  width: 100%;
}

.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-bottom-left-radius: 48px;
  border-bottom-right-radius: 48px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.fade-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5));
  pointer-events: none;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.hero-content {
  padding-left: 120px;
  padding-top: 200px;
  max-width: 600px;
  color: white;
}

.hero-content h1 {
  margin: 0 0 10px 0;
  font-size: 50px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.actions {
  position: absolute;
  bottom: 90px;
  right: 90px;
  display: flex;
  gap: 14px;
}

.hero-button {
  padding: 15px 20px;
  border-radius: 6px;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
}

.primary {
  background: var(--primary-color);
  color: white;
}

.primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.secondary:hover {
  background: white;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .hero-content {
    padding-left: 24px;
    padding-top: 120px;
  }

  .hero-content h1 {
    font-size: 32px;
  }

  .actions {
    bottom: 40px;
    right: 24px;
    left: 24px;
    flex-direction: column;
  }

  .hero-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 24px;
  }
}
</style>
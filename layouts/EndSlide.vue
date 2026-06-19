<template>
  <div class="hero-warm-bg h-full w-full flex relative overflow-hidden">
    <!-- Animated background shapes -->
    <div class="floating-blob blob-1" />
    <div class="floating-blob blob-2" />
    <div class="floating-blob blob-3" />
    
    <!-- Gradient overlay -->
    <div class="gradient-overlay" />

    <!-- LEFT SIDE: Content -->
    <div class="left-section z-10 flex flex-col justify-center items-start">
      <!-- Title -->
      <h1 class="text-6xl font-black mb-8 tracking-tight title-text">
        <span class="highlight-warm">
          <slot name="title" />
        </span>
      </h1>

      <!-- Subtitle/Message -->
      <p class="text-xl text-sky-100 font-light subtitle-text max-w-md">
        <slot name="subtitle" />
      </p>
    </div>

    <!-- RIGHT SIDE: Links with Icons -->
    <div class="right-section z-10 flex flex-col justify-center items-end">
      <div class="links-container">
        <a href="#" target="_blank" rel="noopener noreferrer" class="link-item" title="Personal Website">
          <carbon:user-profile />
          <span>Profile</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" class="link-item" title="GitHub">
          <carbon:logo-github />
          <span>GitHub</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" class="link-item" title="Download PDF">
          <carbon:document-download />
          <span>Download</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// Empty setup block for Vue 3 reactivity
</script>

<style scoped>
/* ===== BLUE HERO BACKGROUND ===== */
.hero-warm-bg {
  position: relative;
  overflow: hidden;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(14, 165, 233, 0.15),
      transparent 40%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(59, 130, 246, 0.12),
      transparent 50%
    ),
    linear-gradient(
      135deg,
      #0c1a2e 0%,
      #0f2847 50%,
      #081b34 100%
    );

  animation: warm-shift 20s ease-in-out infinite;
  background-size: 200% 200%;
}

@keyframes warm-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* ===== FLOATING BLOB ELEMENTS ===== */
.floating-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: float-slow 15s ease-in-out infinite;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.3), transparent);
  top: -10%;
  left: -5%;
  animation-delay: 0s;
}

.blob-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.25), transparent);
  bottom: 5%;
  right: 10%;
  animation-delay: 3s;
}

.blob-3 {
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.2), transparent);
  top: 50%;
  right: -10%;
  animation-delay: 6s;
}

@keyframes float-slow {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(15px, -20px) scale(1.02); }
  66% { transform: translate(-10px, 20px) scale(0.98); }
}

/* ===== GRADIENT OVERLAY ===== */
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.02),
    transparent
  );
  pointer-events: none;
}

/* ===== SPLIT LAYOUT ===== */
.hero-warm-bg :deep(.slidev-slide) {
  padding: 0 !important;
}

.hero-warm-bg {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.left-section {
  flex: 0 0 auto;
  padding: 60px 40px 60px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: content-fade-in-left 1.2s ease-out;
}

.right-section {
  flex: 0 0 auto;
  padding: 60px 60px 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: content-fade-in-right 1.2s ease-out;
}

/* ===== TYPOGRAPHY ===== */
.title-text {
  text-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(14, 165, 233, 0.15);
  animation: title-glow 4s ease-in-out infinite;
}

@keyframes title-glow {
  0%, 100% { text-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(14, 165, 233, 0.12); }
  50% { text-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 50px rgba(14, 165, 233, 0.18); }
}

/* Highlight gradient for text */
.highlight-warm {
  background: linear-gradient(
    90deg,
    #0ea5e9 0%,
    #3b82f6 40%,
    #06b6d4 60%,
    #0ea5e9 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle-text {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* ===== LINKS WITH ICONS ===== */
.links-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: 12px;
  background: rgba(14, 165, 233, 0.1);
  border: 2px solid rgba(14, 165, 233, 0.3);
  color: #0ea5e9;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 300ms ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  position: relative;
  min-width: 120px;
  justify-content: center;
}

.link-item :deep(svg) {
  width: 32px;
  height: 32px;
  transition: all 300ms ease;
}

.link-item:hover {
  background: rgba(14, 165, 233, 0.2);
  border-color: rgba(14, 165, 233, 0.7);
  color: #7dd3fc;
  transform: translateX(8px);
  box-shadow: 
    0 8px 20px rgba(14, 165, 233, 0.3),
    inset 0 0 20px rgba(14, 165, 233, 0.1);
}

.link-item:hover :deep(svg) {
  transform: scale(1.15);
}

/* ===== ANIMATIONS ===== */
@keyframes content-fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes content-fade-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

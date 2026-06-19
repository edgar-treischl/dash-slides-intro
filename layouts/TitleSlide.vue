<template>
  <div class="hero-warm-bg h-full w-full flex flex-col justify-center items-center relative overflow-hidden">
    <!-- Animated background shapes -->
    <div class="floating-blob blob-1" />
    <div class="floating-blob blob-2" />
    <div class="floating-blob blob-3" />
    
    <!-- Gradient overlay -->
    <div class="gradient-overlay" />

    <!-- Main content -->
    <div class="max-w-4xl px-8 text-center z-10 content-container">
      <!-- Title with dynamic gradient -->
      <h1 class="text-7xl font-black mb-8 tracking-tight title-text">
        <span class="highlight-warm">
          <slot name="title" />
        </span>
      </h1>

      <!-- Subtitle with accent line -->
      <div class="flex items-center justify-center gap-6 mb-12 subtitle-group">
        <div class="accent-line line-left" />
        <p class="text-2xl text-sky-100 font-light subtitle-text">
          <slot name="subtitle" />
        </p>
        <div class="accent-line line-right" />
      </div>

      <!-- Author -->
      <div class="text-sky-200 text-sm mb-8 author-text">
        <slot name="author" />
      </div>
    </div>

    <!-- CTA buttons - bottom right (small icons) -->
    <div class="abs-br m-6 text-2xl flex gap-3 cta-group">
      <a href="#" target="_blank" rel="noopener noreferrer" class="slidev-icon-btn-warm" title="Personal Website">
        <carbon:user-profile />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" class="slidev-icon-btn-warm" title="GitHub Profile">
        <carbon:logo-github />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" class="slidev-icon-btn-warm" title="Download PDF">
        <carbon:document-download />
      </a>
    </div>

    <!-- Date footer - bottom left -->
    <div class="abs-bl m-6 text-xs text-sky-300 font-mono date-footer">
      <div>{{ new Date().toLocaleDateString() }}</div>
      <div>{{ new Date().toLocaleTimeString() }}</div>
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

/* ===== SUBTITLE & ACCENTS ===== */
.subtitle-group {
  animation: subtitle-fade-in 0.8s ease-out 0.2s both;
}

.accent-line {
  height: 2px;
  width: 20px;
  background: linear-gradient(
    90deg,
    rgba(14, 165, 233, 0),
    rgba(14, 165, 233, 0.8)
  );
  border-radius: 1px;
}

.line-left {
  animation: line-expand-left 0.8s ease-out 0.3s both;
}

.line-right {
  animation: line-expand-right 0.8s ease-out 0.3s both;
}

@keyframes line-expand-left {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 20px;
    opacity: 1;
  }
}

@keyframes line-expand-right {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 20px;
    opacity: 1;
  }
}

.subtitle-text {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* ===== UTILITY CLASSES ===== */
.abs-br {
  @apply absolute bottom-0 right-0;
}

.abs-bl {
  @apply absolute bottom-0 left-0;
}

.slidev-icon-btn-warm {
  @apply inline-flex items-center justify-center w-10 h-10 text-sky-300 transition-all duration-300;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  
  &:hover {
    @apply text-sky-100 scale-125;
    text-shadow: 0 4px 16px rgba(14, 165, 233, 0.5);
    filter: drop-shadow(0 0 8px rgba(14, 165, 233, 0.4));
  }
}

.author-text {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: subtitle-fade-in 0.8s ease-out 0.4s both;
}

.date-footer {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  animation: fade-in-subtle 1s ease-out 0.6s both;
}

/* ===== ANIMATIONS ===== */
@keyframes subtitle-fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-subtle {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.content-container {
  animation: content-fade-in 1.2s ease-out;
}

@keyframes content-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cta-group {
  animation: fade-in-subtle 1s ease-out 0.5s both;
}
</style>
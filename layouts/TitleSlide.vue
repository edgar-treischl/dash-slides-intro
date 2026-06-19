<template>
  <div class="welcome-slide h-full w-full flex items-center justify-center relative overflow-hidden">
    <!-- Subtle background pattern -->
    <div class="background-pattern" />
    
    <!-- Main content container -->
    <div class="content-wrapper">
      <!-- Left Column: Text Content -->
      <div class="text-column">
        <!-- Eyebrow text (subtitle) -->
        <div class="eyebrow">
          <slot name="subtitle">Presentation</slot>
        </div>
        
        <!-- Main title with gradient -->
        <h1 class="main-title">
          <slot name="title">Welcome</slot>
        </h1>
        
        <!-- Author info -->
        <div class="author-info">
          <slot name="author">Author Name</slot>
        </div>
        
        <!-- Date -->
        <div class="date-info">
          {{ new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </div>
      </div>

      <!-- Right Column: Visual Element -->
      <div class="visual-column">
        <div class="visual-container">
          <slot name="visual">
            <!-- Default visual: atom.svg illustration -->
            <img 
              src="/atom.svg" 
              alt="Atom illustration" 
              class="default-image"
            />
          </slot>
        </div>
      </div>
    </div>

    <!-- CTA buttons - bottom right -->
    <div class="abs-br m-6 flex gap-3 cta-group">
      <a href="#" target="_blank" rel="noopener noreferrer" class="icon-btn" title="Personal Website">
        <carbon:user-profile />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" class="icon-btn" title="GitHub Profile">
        <carbon:logo-github />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" class="icon-btn" title="Download PDF">
        <carbon:document-download />
      </a>
    </div>
  </div>
</template>

<script setup>
// Empty setup block for Vue 3 reactivity
</script>

<style scoped>
/* Import Playfair Display font */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&display=swap');

/* ===== MAIN CONTAINER ===== */
.welcome-slide {
  background: linear-gradient(135deg, #f8fbff 0%, #f0f9ff 100%);
  position: relative;
}

/* ===== BACKGROUND PATTERN ===== */
.background-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(0, 152, 212, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(0, 119, 168, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

/* ===== CONTENT WRAPPER ===== */
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  height: 100%;
  padding: 40px 60px;
  position: relative;
  z-index: 1;
}

/* ===== TEXT COLUMN ===== */
.text-column {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: slide-in-left 0.8s ease-out;
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Eyebrow text (subtitle) */
.eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #0f172a;
  opacity: 0.8;
  animation: fade-in 0.6s ease-out 0.2s both;
}

/* Main title with gradient */
.main-title {
  font-size: 72px;
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-style: italic;
  line-height: 1.1;
  margin: 0;
  background: linear-gradient(135deg, #0098d4 0%, #0077a8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fade-in 0.8s ease-out 0.3s both;
}

/* Author info */
.author-info {
  font-size: 20px;
  color: #475569;
  line-height: 1.6;
  animation: fade-in 0.8s ease-out 0.5s both;
}

/* Date info */
.date-info {
  font-size: 16px;
  color: #64748b;
  line-height: 1.6;
  animation: fade-in 0.8s ease-out 0.6s both;
}

/* ===== VISUAL COLUMN ===== */
.visual-column {
  flex: 0 0 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: slide-in-right 0.8s ease-out 0.2s both;
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.visual-container {
  max-width: 320px;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Default image styling */
.default-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 16px;
  animation: float-gentle 6s ease-in-out infinite;
}

@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* ===== UTILITY CLASSES ===== */
.abs-br {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 24px;
  color: #0f172a;
  opacity: 0.6;
  transition: all 0.3s ease;
  border-radius: 8px;
  
  &:hover {
    opacity: 1;
    background: rgba(0, 152, 212, 0.1);
    transform: translateY(-2px);
  }
}

.cta-group {
  animation: fade-in 0.8s ease-out 0.8s both;
}

/* ===== ANIMATIONS ===== */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
    gap: 40px;
    padding: 40px 24px;
  }
  
  .text-column,
  .visual-column {
    flex: 0 0 auto;
    width: 100%;
  }
  
  .main-title {
    font-size: 64px;
  }
  
  .visual-container {
    max-width: 300px;
  }
}
</style>
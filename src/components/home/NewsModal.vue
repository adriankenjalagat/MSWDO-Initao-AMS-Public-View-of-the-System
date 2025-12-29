<template>
  <transition name="modal-fade">
    <div 
      v-if="story" 
      class="modal-overlay" 
      @click.self="close"
      @keydown.esc="close"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div class="modal-content" ref="modalContent">
        <button class="modal-close-icon" @click="close" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <Badge :text="story.category" :category="story.category" class="modal-badge" />
        
        <h2 id="modal-title">{{ story.title }}</h2>
        
        <div class="modal-meta">
          <span class="modal-date">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 3H3C2.44772 3 2 3.44772 2 4V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V4C14 3.44772 13.5523 3 13 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M11 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 6H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ story.date }}
          </span>
        </div>
        
        <div class="modal-body">
          <p>{{ story.details }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Badge from '../shared/Badge.vue'

export default {
  name: 'NewsModal',
  components: {
    Badge
  },
  props: {
    story: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  watch: {
    story(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #f5f5f5;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-dark);
}

.modal-close-icon:hover {
  background: var(--primary-color);
  color: white;
  transform: rotate(90deg);
}

.modal-badge {
  padding: 8px 16px;
  font-size: 13px;
  margin-bottom: 20px;
}

.modal-content h2 {
  margin: 0 0 16px 0;
  color: var(--text-dark);
  font-size: 28px;
  line-height: 1.3;
  padding-right: 40px;
}

.modal-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 2px solid #f0f0f0;
}

.modal-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-lighter);
  font-size: 14px;
}

.modal-body {
  margin-bottom: 32px;
}

.modal-body p {
  line-height: 1.8;
  color: var(--text-dark);
  font-size: 16px;
  margin: 0;
}

.modal-fade-enter-active {
  transition: opacity 0.3s ease;
}

.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 28px;
    max-height: 90vh;
  }

  .modal-content h2 {
    font-size: 24px;
  }

  .modal-body p {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 24px;
  }

  .modal-content h2 {
    font-size: 22px;
  }
}
</style>
<template>
  <section id="news" class="section news-section">
    <div class="wrap">
      <SectionHeader 
        title="News & Updates" 
        subtitle="Stay informed with our latest community initiatives and announcements" 
      />

      <div class="carousel-container">
        <button 
          class="carousel-nav prev" 
          @click="scrollCarousel('left')"
          aria-label="Previous news"
          :disabled="!canScrollLeft"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="carousel" ref="carousel" @scroll="checkScroll">
          <div
            class="carousel-item"
            v-for="(item, i) in news"
            :key="i"
            @click="$emit('open-story', item)"
            @keypress.enter="$emit('open-story', item)"
            tabindex="0"
            role="button"
            :aria-label="`Read more about ${item.title}`"
          >
            <Badge :text="item.category" :category="item.category" class="item-badge" />
            
            <h3 class="item-title">{{ item.title }}</h3>
            
            <div class="item-meta">
              <span class="item-date">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11 2H3C2.44772 2 2 2.44772 2 3V11C2 11.5523 2.44772 12 3 12H11C11.5523 12 12 11.5523 12 11V3C12 2.44772 11.5523 2 11 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.33333 1V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.66667 1V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 5H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ item.date }}
              </span>
            </div>
            
            <p class="item-summary">{{ item.summary }}</p>
            
            <div class="item-footer">
              <span class="read-more">Read more →</span>
            </div>
          </div>
        </div>

        <button 
          class="carousel-nav next" 
          @click="scrollCarousel('right')"
          aria-label="Next news"
          :disabled="!canScrollRight"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="carousel-progress">
        <div 
          class="progress-bar" 
          :style="{ width: scrollProgress + '%' }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeader from '../shared/SectionHeader.vue'
import Badge from '../shared/Badge.vue'

export default {
  name: 'NewsCarousel',
  components: {
    SectionHeader,
    Badge
  },
  props: {
    news: {
      type: Array,
      required: true
    }
  },
  emits: ['open-story'],
  data() {
    return {
      canScrollLeft: false,
      canScrollRight: true,
      scrollProgress: 0
    }
  },
  mounted() {
    this.checkScroll()
  },
  methods: {
    scrollCarousel(direction) {
      const carousel = this.$refs.carousel
      if (!carousel) return
      
      const scrollAmount = 340
      if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    },
    checkScroll() {
      const carousel = this.$refs.carousel
      if (!carousel) return
      
      this.canScrollLeft = carousel.scrollLeft > 0
      this.canScrollRight = carousel.scrollLeft < (carousel.scrollWidth - carousel.clientWidth - 10)
      
      const maxScroll = carousel.scrollWidth - carousel.clientWidth
      this.scrollProgress = maxScroll > 0 ? (carousel.scrollLeft / maxScroll) * 100 : 0
    }
  }
}
</script>

<style scoped>
.section {
  padding: 60px 24px;
}

.news-section {
  padding-top: 10px;
  padding-bottom: 120px;
}

.wrap {
  max-width: 1200px;
  margin: auto;
}

.carousel-container {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1px;
  margin-bottom: -200px;
}

.carousel-nav {
  background: var(--bg-white);
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: none;
}

.carousel-nav:hover:not(:disabled) {
  background: var(--primary-color);
  color: white;
  transform: scale(1.1);
  box-shadow: var(--shadow-md);
}

.carousel-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  border-color: #ddd;
  color: #ddd;
}

.carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 16px 4px;
  scroll-behavior: smooth;
  scrollbar-width: none;
  flex: 1;
  -ms-overflow-style: none;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  flex: 0 0 320px;
  background: #F2E8E8;
  padding: 24px;
  min-height: 200px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.carousel-item:hover,
.carousel-item:focus {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: white;
}

.item-badge {
  margin-bottom: 16px;
}

.item-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: var(--text-dark);
  line-height: 1.3;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.item-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-lighter);
}

.item-summary {
  color: var(--text-light);
  line-height: 1.6;
  margin: 0 0 auto 0;
  font-size: 14px;
}

.item-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.read-more {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
}

.carousel-item:hover .read-more {
  transform: translateX(4px);
  display: inline-block;
}

.carousel-progress {
  width: 100%;
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s ease;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .section {
    padding: 48px 20px;
  }

  .carousel-nav {
    width: 40px;
    height: 40px;
  }

  .carousel-item {
    min-width: 320px;
    max-width: 320px;
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  }

  .item-title {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .carousel-item {
    flex: 0 0 260px;
    padding: 18px;
    min-height: 180px;
  }

  .item-title {
    font-size: 17px;
  }

  .item-summary {
    font-size: 13px;
  }
}
</style>
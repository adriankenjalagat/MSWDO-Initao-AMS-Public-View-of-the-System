<template>
  <div
    class="operation-card"
    @click="$emit('view-details', operation)"
    @keypress.enter="$emit('view-details', operation)"
    tabindex="0"
    role="button"
    :aria-label="`View details of ${operation.title}`"
  >
    <div class="operation-image" :style="{ backgroundImage: `url(${operation.image})` }">
      <div class="operation-status" :class="operation.status">
        <span class="status-dot"></span>
        {{ operation.status === 'ongoing' ? 'Ongoing' : 'Planned' }}
      </div>
    </div>
    
    <div class="operation-content">
      <h3 class="operation-title">{{ operation.title }}</h3>
      
      <div class="operation-meta">
        <span class="operation-date">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 3H3C2.44772 3 2 3.44772 2 4V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V4C14 3.44772 13.5523 3 13 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 6H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ operation.date }}
        </span>
        <span class="operation-location">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 6.66667C13 10.3333 8 14 8 14C8 14 3 10.3333 3 6.66667C3 5.34058 3.52678 4.06881 4.46447 3.13113C5.40215 2.19345 6.67392 1.66667 8 1.66667C9.32608 1.66667 10.5979 2.19345 11.5355 3.13113C12.4732 4.06881 13 5.34058 13 6.66667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ operation.location }}
        </span>
      </div>
      
      <p class="operation-summary">{{ operation.summary }}</p>
      
      <div class="operation-stats">
        <div class="stat">
          <span class="stat-value">{{ operation.beneficiaries }}</span>
          <span class="stat-label">Beneficiaries</span>
        </div>
      
      </div>
      
      <div class="operation-footer">
        <span class="view-details">View Details →</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationCard',
  props: {
    operation: {
      type: Object,
      required: true
    }
  },
  emits: ['view-details']
}
</script>

<style scoped>
.operation-card {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 10px;
  border: 3px solid #f0f0f0;
  outline: none;
  
}

.operation-card:hover,
.operation-card:focus {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  
}

.operation-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.operation-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4));
}

.operation-status {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(8px);
  z-index: 10;
}

.operation-status.ongoing {
  background: rgba(76, 175, 80, 0.95);
  color: white;
}

.operation-status.planned {
  background: rgba(33, 150, 243, 0.95);
  color: white;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.operation-content {
  padding: 24px;
}

.operation-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text-dark);
  line-height: 1.3;
}

.operation-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.operation-date,
.operation-location {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-light);
}

.operation-summary {
  color: var(--text-dark);
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-size: 15px;
}

.operation-stats {
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: var(--text-lighter);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.operation-footer {
  display: flex;
  justify-content: flex-end;
}

.view-details {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
}

.operation-card:hover .view-details {
  transform: translateX(4px);
  display: inline-block;
}
</style>
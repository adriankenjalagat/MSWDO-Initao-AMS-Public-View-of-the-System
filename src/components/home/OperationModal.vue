<template>
  <transition name="modal-fade">
    <div 
      v-if="operation" 
      class="modal-overlay" 
      @click="handleOverlayClick"
      role="dialog"
      aria-modal="true"
      aria-labelledby="operation-modal-title"
    >
      <div class="modal-content operation-modal" ref="operationModalContent" @click.stop>
        <button class="modal-close-icon" @click="close" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="operation-modal-header">
          <div class="operation-status-large" :class="operation.status">
            <span class="status-dot"></span>
            {{ operation.status === 'ongoing' ? 'Ongoing Operation' : 'Planned Operation' }}
          </div>
          
          <h2 id="operation-modal-title">{{ operation.title }}</h2>
          
          <div class="operation-modal-meta">
            <span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14 4H4C3.44772 4 3 4.44772 3 5V14C3 14.5523 3.44772 15 4 15H14C14.5523 15 15 14.5523 15 14V5C15 4.44772 14.5523 4 14 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 3V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 3V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 7H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ operation.date }}
            </span>
            <span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14.5 7.5C14.5 11.5 9 15.5 9 15.5C9 15.5 3.5 11.5 3.5 7.5C3.5 6.04131 4.07946 4.64236 5.11091 3.61091C6.14236 2.57946 7.54131 2 9 2C10.4587 2 11.8576 2.57946 12.8891 3.61091C13.9205 4.64236 14.5 6.04131 14.5 7.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9.5C10.1046 9.5 11 8.60457 11 7.5C11 6.39543 10.1046 5.5 9 5.5C7.89543 5.5 7 6.39543 7 7.5C7 8.60457 7.89543 9.5 9 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ operation.location }}
            </span>
          </div>
        </div>
        
        <div class="operation-modal-stats">
          <div class="stat-large">
            <span class="stat-value">{{ operation.beneficiaries }}</span>
            <span class="stat-label">Expected Beneficiaries</span>
          </div>
        </div>
        
        <div class="modal-body">
          <h3>Operation Overview</h3>
          <p>{{ operation.details }}</p>
          
          <h3>Key Objectives</h3>
          <ul class="objectives-list">
            <li v-for="(objective, idx) in operation.objectives" :key="idx">
              {{ objective }}
            </li>
          </ul>
          
          <h3>How You Can Help Through Donations</h3>
          <p>{{ operation.howToHelp }}</p>
          
          <div class="donation-impact">
            <h4>Your Impact</h4>
            <p>Every contribution helps us reach our goal of serving the community. Your donation will directly support this operation and benefit {{ operation.beneficiaries }} individuals and families.</p>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn secondary-btn" @click="close">Close</button>
          <button class="action-btn primary-btn" @click="pledgeDonation">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3.33337 8.33334L10 1.66667L16.6667 8.33334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10 1.66667V13.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.6667 18.3333H3.33337C2.89135 18.3333 2.46742 18.1577 2.1549 17.8452C1.84228 17.5326 1.66671 17.1087 1.66671 16.6667V13.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.3334 13.3333V16.6667C18.3334 17.1087 18.1578 17.5326 17.8452 17.8452C17.5327 18.1577 17.1088 18.3333 16.6667 18.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Pledge a Donation
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'OperationModal',
  props: {
    operation: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'donate'],
  mounted() {
    document.addEventListener('keydown', this.handleEscape)
  },
  beforeUnmount() {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', this.handleEscape)
  },
  methods: {
    handleOverlayClick(e) {
      if (e.target === e.currentTarget) {
        this.close()
      }
    },
    handleEscape(e) {
      if (e.key === 'Escape' && this.operation) {
        this.close()
      }
    },
    close() {
      document.body.style.overflow = ''
      this.$emit('close')
    },
    pledgeDonation() {
      console.log('Pledge donation clicked!', this.operation)
      
      // Store operation data for the next page
      sessionStorage.setItem('selectedOperation', JSON.stringify(this.operation))
      
      // Close modal first
      document.body.style.overflow = ''
      this.$emit('close')
      
      // Navigate to donation page
      this.$nextTick(() => {
        this.$router.push('/pre-donation')
      })
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

.operation-modal {
  max-width: 800px;
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

.operation-modal-header {
  margin-bottom: 32px;
}

.operation-status-large {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}

.operation-status-large.ongoing {
  background: rgba(76, 175, 80, 0.15);
  color: #2E7D32;
}

.operation-status-large.planned {
  background: rgba(33, 150, 243, 0.15);
  color: #1565C0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
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

.modal-content h2 {
  margin: 0 0 16px 0;
  color: var(--text-dark);
  font-size: 28px;
  line-height: 1.3;
  padding-right: 40px;
}

.operation-modal-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  color: var(--text-light);
  font-size: 15px;
}

.operation-modal-meta span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.operation-modal-stats {
  display: flex;
  justify-content: center;
  padding: 24px;
  background: #f8f9fa;
  border-radius: var(--border-radius-sm);
  margin-bottom: 32px;
}

.stat-large {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-large .stat-value {
  font-size: 60px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-large .stat-label {
  font-size: 20px;
  color: var(--text-light);
}

.modal-body h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--text-dark);
}

.modal-body h3:not(:first-child) {
  margin-top: 28px;
}

.modal-body p {
  line-height: 1.8;
  color: var(--text-dark);
  font-size: 16px;
  margin: 0 0 16px 0;
}

.objectives-list {
  margin: 0;
  padding-left: 24px;
  line-height: 1.8;
  margin-bottom: 24px;
}

.objectives-list li {
  color: var(--text-dark);
  margin-bottom: 8px;
}

.objectives-list li::marker {
  color: var(--primary-color);
  font-weight: bold;
}

.donation-impact {
  background: linear-gradient(135deg, #e6f7ef 0%, #d4f1e3 100%);
  padding: 20px 24px;
  border-radius: 12px;
  border-left: 4px solid var(--primary-color);
  margin-top: 24px;
}

.donation-impact h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 8px 0;
}

.donation-impact p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-dark);
  margin: 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid #f0f0f0;
}

.action-btn {
  padding: 16px 32px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: 'Outfit', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.primary-btn {
  background: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 187, 85, 0.3);
}

.primary-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 187, 85, 0.4);
}

.secondary-btn {
  background: #f5f5f5;
  color: var(--text-dark);
}
 
.secondary-btn:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
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

  .operation-modal-stats {
    display: flex;
    justify-content: center;
    padding: 24px;
    background: #f8f9fa;
    border-radius: var(--border-radius-sm);
    margin-bottom: 32px;
  }

  .stat-large .stat-value {
    font-size: 28px;
  }

  .modal-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
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
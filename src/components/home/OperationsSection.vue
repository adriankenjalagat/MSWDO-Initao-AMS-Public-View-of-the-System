<template>
  <section id="operations" class="section operations-section">
    <div class="wrap">
      <SectionHeader 
        title="Operations and Call for Donations" 
        subtitle="Supporting our community through dedicated programs and initiatives" 
      />

      <div class="operations-filter">
        <button 
          class="filter-btn" 
          :class="{ active: currentFilter === 'all' }"
          @click="$emit('update:filter', 'all')"
        >
          All Operations
        </button>
        <button 
          class="filter-btn" 
          :class="{ active: currentFilter === 'ongoing' }"
          @click="$emit('update:filter', 'ongoing')"
        >
          Ongoing
        </button>
        <button 
          class="filter-btn" 
          :class="{ active: currentFilter === 'planned' }"
          @click="$emit('update:filter', 'planned')"
        >
          Planned
        </button>
      </div>

      <div class="operations-grid">
        <OperationCard
          v-for="op in operations"
          :key="op.id"
          :operation="op"
          @view-details="handleViewDetails(op)"
        />
      </div>
    </div>

    <!-- Operation Modal -->
    <OperationModal 
      :operation="selectedOperation" 
      @close="selectedOperation = null"
      @donate="handleDonate"
    />
  </section>
</template>

<script>
import SectionHeader from '../shared/SectionHeader.vue'
import OperationCard from './OperationCard.vue'
import OperationModal from './OperationModal.vue'
 
export default {
  name: 'OperationsSection',
  components: {
    SectionHeader,
    OperationCard,
    OperationModal
  },
  props: {
    operations: {
      type: Array,
      required: true
    },
    currentFilter: {
      type: String,
      default: 'all'
    }
  },
  emits: ['update:filter', 'view-details'],
  data() {
    return {
      selectedOperation: null
    }
  },
  methods: {
    handleViewDetails(operation) {
      this.selectedOperation = operation
      // Also emit to parent if needed
      this.$emit('view-details', operation)
    },
    handleDonate(operation) {
      console.log('Donation pledged for:', operation.title)
      // Additional handling if needed
    }
  }
}
</script>

<style scoped>
.section {
  padding: 60px 24px;
}

.operations-section {
  background: white;
  padding: 80px 24px;
}

.wrap {
  max-width: 1200px;
  margin: auto;
}

.operations-filter {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 28px;
  border: 2px solid #e0e0e0;
  background: white;
  color: gray;
  border-radius: 50px;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

.filter-btn.active {
  color: black;
  background: var(--primary-color);
  border-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 187, 85, 0.3);
}

.operations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .section {
    padding: 48px 20px;
  }
}

@media (max-width: 480px) {
  .operations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
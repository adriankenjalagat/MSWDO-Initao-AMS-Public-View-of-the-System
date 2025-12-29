<template>
  <span class="badge" :class="badgeClass">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    text: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    badgeClass() {
      const categoryMap = {
        'Relief': 'badge-relief',
        'Pension': 'badge-pension',
        'Health': 'badge-health',
        'Training': 'badge-training'
      }
      return categoryMap[this.category] || 'badge-default'
    }
  }
}
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: fit-content;
}

.badge-relief {
  background: #FFF3E0;
  color: #E65100;
}

.badge-pension {
  background: #E3F2FD;
  color: #1565C0;
}

.badge-health {
  background: #F3E5F5;
  color: #6A1B9A;
}

.badge-training {
  background: #E8F5E9;
  color: #2E7D32;
}

.badge-default {
  background: var(--primary-light);
  color: var(--primary-color);
}
</style>
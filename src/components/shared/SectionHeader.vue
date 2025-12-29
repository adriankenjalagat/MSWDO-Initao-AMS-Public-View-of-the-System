<template>
  <div class="section-header">
    <h2>{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    title: {
      type: String, 
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 15px;
}

.section-header h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--text-dark);
  line-height: 1.2;
}

.section-subtitle {
  font-size: 16px;
  color: var(--text-light);
  margin-bottom: 16px;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 24px;
  }
}
</style>
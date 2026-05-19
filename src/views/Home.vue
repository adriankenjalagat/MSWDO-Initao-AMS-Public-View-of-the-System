<template>
  <div class="page">
    <Header />

    <HeroSection 
      :background-image="officeBg"
    />

    <NewsCarousel 
      :news="news"
      @open-story="openStory"
    />

    <NewsModal 
      :story="activeStory"
      @close="closeStory"
    />

    <OperationsSection 
      :operations="filteredOperations"
      :current-filter="operationFilter"
      @update:filter="operationFilter = $event"
      @view-details="openOperationDetails"
    />

    <OperationModal
        v-if="activeOperation"
        :operation="activeOperation"
        @close="closeOperationDetails"
        @donate="donateToOperation"
    />

    <AboutSection />

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import HeroSection from '../components/home/HeroSection.vue'
import NewsCarousel from '../components/home/NewsCarousel.vue'
import NewsModal from '../components/home/NewsModal.vue'
import OperationsSection from '../components/home/OperationsSection.vue'
import OperationModal from '../components/home/OperationModal.vue'
import AboutSection from '../components/home/AboutSection.vue'
import officeBg from '../assets/office-bg.png'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    HeroSection,
    NewsCarousel,
    NewsModal,
    OperationsSection,
    OperationModal,
    AboutSection
  },
  data() {
    return {
      officeBg,
      activeStory: null,
      activeOperation: null,
      operationFilter: 'all',
      news: [
        { 
          title: 'Relief Distribution', 
          date: 'Jan 10, 2025', 
          category: 'Relief',
          summary: 'Emergency relief items successfully distributed to affected communities.', 
          details: 'Detailed report of relief distribution to barangays A, B, and C, including quantity and beneficiaries. Over 500 families received essential supplies including food, water, and hygiene kits. The distribution was conducted in coordination with local barangay officials to ensure efficient and equitable distribution.' 
        },
        { 
          title: 'Senior Pension Update', 
          date: 'Dec 20, 2024', 
          category: 'Pension',
          summary: 'Updated beneficiaries list now available for review.', 
          details: 'The senior pension listing has been updated to include new beneficiaries and removed inactive ones. All senior citizens are encouraged to verify their enrollment status at the MSWDO office. New applicants can submit their requirements starting next month.' 
        },
        { 
          title: 'Community Health Seminar', 
          date: 'Mar 15, 2025', 
          category: 'Health',
          summary: 'Free health and wellness seminar for all residents.', 
          details: 'Comprehensive health seminar conducted in Barangay X covering nutrition, exercise, and preventive healthcare. Medical professionals provided free consultations and health screenings. Over 200 community members participated in this wellness initiative.' 
        },
        { 
          title: 'Food Drive Success', 
          date: 'Apr 2, 2025', 
          category: 'Relief',
          summary: 'Community food drive reaches 500 families in need.', 
          details: 'Distribution of 500 food packs to low-income families with proper records maintained. Each pack contained rice, canned goods, noodles, and other essential items. We thank all donors and volunteers who made this initiative possible.' 
        },
        { 
          title: 'Youth Skills Training', 
          date: 'May 10, 2025', 
          category: 'Training',
          summary: 'Free vocational training program for young adults.', 
          details: 'A comprehensive skills development program offering training in various trades and digital skills. Participants will receive certificates upon completion and job placement assistance.' 
        }
      ],
      operations: [
        { 
          id: 'op1', 
          title: 'Typhoon Maria Relief Operation', 
          date: 'Feb 2025',
          status: 'ongoing',
          location: 'Multiple Barangays',
          summary: 'Emergency relief distribution to families affected by recent typhoon',
          beneficiaries: '1,200+',
          image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400',
          details: 'Comprehensive emergency response operation providing immediate relief to families affected by Typhoon Maria. Distribution includes food packs, clean water, hygiene kits, and temporary shelter materials.',
          objectives: [
            'Distribute relief goods to 1,200+ affected families',
            'Provide emergency medical assistance and first aid',
            'Set up temporary evacuation centers',
            'Coordinate with local barangay officials for efficient distribution'
          ],
          howToHelp: 'We are accepting monetary donations and in-kind donations of non-perishable food items, bottled water, blankets, and hygiene kits. Every contribution helps us reach more families in need.'
        },
        { 
          id: 'op2', 
          title: 'Flood Emergency Response', 
          date: 'Mar 2025',
          status: 'ongoing',
          location: 'Low-lying Barangays',
          summary: 'Rescue and relief operations for flood-affected communities',
          beneficiaries: '850+',
          image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400',
          details: 'Ongoing flood relief operation providing rescue services, temporary shelter, food assistance, and medical aid to families displaced by severe flooding. Includes rehabilitation support for affected households.',
          objectives: [
            'Conduct rescue operations in flooded areas',
            'Provide temporary shelter and food assistance',
            'Distribute hygiene kits and clean water',
            'Offer medical assistance to evacuees'
          ],
          howToHelp: 'Your monetary donations help us provide emergency supplies, medical care, and temporary housing. We also accept donations of clothing, blankets, waterproof materials, and water purification tablets.'
        },
        { 
          id: 'op3', 
          title: 'Fire Incident Recovery Support', 
          date: 'Jan 2025',
          status: 'planned',
          location: 'Barangay San Isidro',
          summary: 'Assistance for families who lost homes in residential fire',
          beneficiaries: '75+',
          image: 'https://images.pexels.com/photos/6689776/pexels-photo-6689776.jpeg',
          details: 'Emergency relief and rehabilitation program for families affected by the recent residential fire. Provides immediate cash assistance, temporary housing, household items, and rebuilding support.',
          objectives: [
            'Provide emergency cash assistance to fire victims',
            'Distribute essential household items and clothing',
            'Coordinate temporary shelter arrangements',
            'Support home rebuilding and livelihood recovery'
          ],
          howToHelp: 'Monetary donations help fire victims rebuild their lives. We also accept donations of clothing, household items, construction materials, and furniture.'
        },
        
      ]
    }
  },
  computed: {
    filteredOperations() {
      if (this.operationFilter === 'all') {
        return this.operations
      }
      return this.operations.filter(op => op.status === this.operationFilter)
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleEscKey)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscKey)
  },
  methods: {
    scrollToOperations() {
      const el = document.getElementById('operations')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    openStory(story) {
      this.activeStory = story
    },
    closeStory() {
      this.activeStory = null
    },
    
    closeOperationDetails() {
      this.activeOperation = null
    },
    donateToOperation(operation) {
      console.log('donateToOperation called!')
      console.log('Operation data:', operation)
      
      // Force close modal immediately
      this.activeOperation = null
      document.body.style.overflow = ''
      
      // Use nextTick to ensure DOM updates before navigation
      this.$nextTick(() => {
        // Navigate to PreDonation page
        this.$router.push({
          path: '/pre-donation',
          query: {
            operation: operation.id,
            title: operation.title,
            budget: operation.budget
          }
        }).catch(err => {
          console.error('Navigation failed:', err)
          // Fallback to hard navigation
          window.location.href = `/pre-donation?operation=${operation.id}&title=${encodeURIComponent(operation.title)}&budget=${encodeURIComponent(operation.budget)}`
        })
      })
    },
    handleEscKey(e) {
      if (e.key === 'Escape') {
        if (this.activeStory) {
          this.closeStory()
        }
        if (this.activeOperation) {
          this.closeOperationDetails()
        }
      }
    }
  }
}
</script>

<style scoped>
:root {
  --primary-color: #00bb55;
  --primary-hover: #009944;
  --primary-light: #e6f7ef;
  --text-dark: #333;
  --text-light: #666;
  --text-lighter: #999;
  --bg-light: #F2E8E8;
  --bg-white: #ffffff;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.12);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.16);
  --border-radius: 16px;
  --border-radius-sm: 8px;
}

.page { 
  overflow-x: hidden; 
  font-family: 'Outfit', sans-serif; 
}
</style>
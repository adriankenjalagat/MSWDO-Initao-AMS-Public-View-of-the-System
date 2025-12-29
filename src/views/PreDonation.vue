<template>
  <div class="donation-page">
    <Header />

    <div class="container">
      <h1 class="page-title">Donation Page</h1>
      
      <div class="donation-container">
        <h2 class="main-heading">Help Save Lives by Donating IN-KIND</h2>
        
        <div class="content-grid">
          <div class="left-section">
            <h3 class="section-title">To whom the donations will be given:</h3>
            
            <div class="form-group">
              <label>Donation Event:</label>
              <input type="text" v-model="donationEvent" 
              class="form-input" 
              readonly />
            </div>
            
            <div class="form-group">
              <label>Location:</label>
              <input type="text" v-model="location" 
              class="form-input" 
              readonly />
            </div>
            
            <div class="form-group">
              <label>Status Badge</label>
              <input type="text" v-model="statusBadge" 
              class="form-input" 
              readonly />
            </div>
            
            <h3 class="section-title" style="margin-top: 1.5rem;">Tell us about yourself</h3>
            
            <div class="form-group checkbox-group">
              <input type="checkbox" id="foundation" v-model="isFoundation" class="checkbox-input" />
              <label for="foundation">Foundation</label>
            </div>
            
            <div class="form-group" v-if="isFoundation">
              <label>Foundation/Organization:</label>
              <input type="text" v-model="foundationName" class="form-input" />
            </div>
            
            <div class="form-group">
              <label>First Name:</label>
              <input type="text" v-model="firstName" class="form-input" />
            </div>
            
            <div class="form-group">
              <label>Middle Initial:</label>
              <input type="text" v-model="middleInitial" class="form-input" maxlength="1" />
            </div>
            
            <div class="form-group">
              <label>Last Name:</label>
              <input type="text" v-model="lastName" class="form-input" />
            </div>
            
            <div class="form-group">
              <label>Date of Birth:</label>
              <input type="date" v-model="dateOfBirth" class="form-input" />
            </div>
            
            <div class="form-group">
              <label>Email:</label>
              <input type="email" v-model="email" class="form-input" />
            </div>
            
            <div class="form-group">
              <label>Phone:</label>
              <input type="tel" v-model="phone" class="form-input" placeholder="+639" />
            </div>
          </div>
          
          <div class="right-section">
            <h3 class="section-title">What are you donating?</h3>
            
            <button @click="toggleItemsDialog" class="add-items-btn">
              <span class="icon">⊞</span> Add/Remove items
            </button>
            
            <div class="items-table" v-if="items.length > 0">
              <div class="table-header">
                <div class="header-cell">Item Type</div>
                <div class="header-cell">Description</div>
                <div class="header-cell">Weight/Qty</div>
              </div>
              
              <div class="table-row" v-for="(item, index) in items" :key="index">
                <div class="table-cell">{{ item.type }}</div>
                <div class="table-cell">
                  <input type="text" v-model="item.description" placeholder="e.g. Canned goods" class="table-input" />
                </div>
                <div class="table-cell">
                  <input type="text" v-model="item.weight" placeholder="e.g. 5kg" class="table-input" />
                </div>
              </div>
            </div>

            <p class="error-message" v-if="!hasSelectedItem">
              Please add at least one item and fill in details.
            </p>
            
            <div class="certificate-section">
              <label class="certificate-label">Request Certificate of Donation</label>
              <label class="toggle-switch">
                <input type="checkbox" v-model="requestCertificate" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <button @click="handleDonate" class="donate-btn" :disabled="!hasSelectedItem">
              DONATE
            </button>

            <div class="prohibited-section" :class="{ 'is-expanded': isProhibitedExpanded }">
              <div class="prohibited-header" @click="isProhibitedExpanded = !isProhibitedExpanded">
                <div class="header-content">
                  <h3 class="prohibited-title">
                    <span class="prohibited-icon">🚫</span> PROHIBITED DONATIONS
                  </h3>
                  <p class="prohibited-intro">
                    All items are acceptable <strong>EXCEPT</strong> for the following:
                  </p>
                </div>
                <span class="toggle-icon">{{ isProhibitedExpanded ? '▲' : '▼' }}</span>
              </div>

              <transition name="slide-fade">
              <ul class="prohibited-list" v-show="isProhibitedExpanded">
                <li><strong>Food items nearing expiry:</strong> Less than six (6) months for local goods and one (1) year for foreign donations (DSWD AO No. 11);</li>
                <li><strong>Damaged Goods:</strong> Leaking, rusty, or dented/bulging canned goods and items with broken seals;</li>
                <li><strong>Milk Code Violations:</strong> Infant formula, breastmilk substitutes, feeding bottles, teats, and pacifiers (to promote breastfeeding in disaster areas);</li>
                <li><strong>Used Clothing:</strong> Second-hand clothes or "ukay-ukay" (due to health, hygiene, and dignity protocols);</li>
                <li><strong>Medicines:</strong> Any pharmaceutical products without FDA approval or those requiring a specific cold chain that has been broken;</li>
                <li><strong>Industry Restrictions:</strong> Any donations, funding, or branding from the Tobacco Industry;</li>
                <li><strong>Political Material:</strong> Items with political branding, faces, or logos (to maintain MSWDO neutrality during aid distribution).</li>
              </ul>  
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="modal-fade">
      <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
        <div class="success-modal" @click.stop>
          <div class="success-icon">
            <svg width="60" height="60" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" stroke="#86EFAC" stroke-width="3"/>
              <path d="M25 40L35 50L55 30" stroke="#86EFAC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <h2 class="success-title">Pledge Successful</h2>
          <p class="success-message">Your donation pledge has been successfully registered.</p>
          
          <div class="reference-box">
            <p class="reference-label">REFERENCE NUMBER</p>
            <p class="reference-number">DON-{{ referenceNumber }}</p>
          </div>
          
          <div class="pledged-items">
            <h3 class="pledged-title">Pledged Items</h3>
            <div class="items-list">
              <div class="item-row" v-for="(item, index) in filteredItems" :key="index">
                <span class="item-name">{{ item.type }} ({{ item.description }})</span>
                <span class="item-quantity">Qty: {{ item.weight }}</span>
              </div>
            </div>
          </div>
          
          <div class="modal-buttons">
            <button class="save-btn" @click="saveToGallery">Save to Gallery</button>
            <button class="close-btn" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="modal-fade">
      <div v-if="showItemsModal" class="modal-overlay" @click="toggleItemsDialog">
        <div class="selection-modal" @click.stop>
          <h3 class="modal-subtitle">Select Items to Donate</h3>
          <div class="items-selection-grid">
            <label v-for="type in availableItemTypes" :key="type" 
                   class="selection-card" :class="{ 'is-active': isItemSelected(type) }">
              <input type="checkbox" :checked="isItemSelected(type)" 
                     @change="toggleItemSelection(type)" class="hidden-checkbox" />
              <span class="selection-label">{{ type }}</span>
              <span class="selection-check" v-if="isItemSelected(type)">✓</span>
            </label>
          </div>
          <button class="confirm-btn" @click="toggleItemsDialog">Confirm Selection</button>
        </div>
      </div>
    </transition>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'PreDonation',
  components: { Header, Footer },
  data() {
    return {
      donationEvent: '', 
      location: '',
      statusBadge: '',
      isFoundation: false,
      foundationName: '',
      firstName: '',
      middleInitial: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: '+639',
      items: [{ type: 'Food', description: '', weight: '' }],
      availableItemTypes: ['Food', 'New Toiletres', 'Blankets', 'Medicines', 'Clothings', 'Tents', 'New Toys', 'Solar Lamps', 'Others'],
      showItemsModal: false,
      showSuccessModal: false,
      requestCertificate: false,
      referenceNumber: '',
      isProhibitedExpanded: false
    }
  },
  computed: {
    hasSelectedItem() {
      return this.items.length > 0 && this.items.some(item => item.description.trim() !== '' || item.weight.trim() !== '');
    },
    filteredItems() {
      return this.items.filter(item => item.description.trim() !== '' || item.weight.trim() !== '');
    }
  },
  methods: {
    toggleItemsDialog() {
      this.showItemsModal = !this.showItemsModal;
    },
    toggleItemSelection(type) {
      const index = this.items.findIndex(item => item.type === type);
      if (index > -1) {
        this.items.splice(index, 1);
      } else {
        this.items.push({ type: type, description: '', weight: '' });
      }
    },
    isItemSelected(type) {
      return this.items.some(item => item.type === type);
    },
    generateReferenceNumber() {
      const year = new Date().getFullYear();
      const random = Math.floor(1000 + Math.random() * 9000);
      return `${year}-${random}`;
    },
    handleDonate() {
      if (!this.hasSelectedItem) return;
      this.referenceNumber = this.generateReferenceNumber();
      this.showSuccessModal = true;
      this.$emit('donate', { ...this.$data, items: this.filteredItems });
    },
    closeModal() {
      this.showSuccessModal = false;
    },
    saveToGallery() {
      alert('Receipt saved!');
      this.closeModal();
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* { 
  font-family: 'Outfit', sans-serif;
  box-sizing: border-box;
}

.donation-page {
  background: #fafafa;
  min-height: 100vh;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-title {
  color: #5b4b8a;
  font-size: 30px;
  margin-bottom: 10px;
  margin-left: -12px;
  margin-top: 90px;
  font-weight: 600;
}

.donation-container {
  background: #F2E8E8;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.main-heading {
  text-align: center;
  color: #222;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  margin-top: -5px;
  padding-bottom: 10px;
  border-bottom: 2px solid #5b4a8a;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.section-title {
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #5b4a8a;
}

.form-group {
  margin-bottom: 0.875rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.375rem;
  color: #555;
  font-weight: 500;
  font-size: 0.875rem;
}

.form-input {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.form-input:focus {
  outline: none;
  border-color: #5b4a8a;
  box-shadow: 0 0 0 3px rgba(91, 74, 138, 0.1);
}

.form-input:read-only {
  background-color: #f8f8f8;
  color: #666;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.add-items-btn {
  background: #5b4a8a;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.add-items-btn:hover {
  background: #4a3970;
}

.items-table {
  background: #f8f8f8;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1px solid #e5e5e5;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  background: #e8e8e8;
  padding: 0.625rem 0.75rem;
  font-weight: 600;
  font-size: 0.8rem;
}

.header-cell {
  color: #333;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  padding: 0.625rem 0.75rem;
  gap: 0.5rem;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  color: #333;
  font-size: 0.875rem;
}

.table-input {
  width: 100%;
  padding: 0.5rem 0.625rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 0.8rem;
}

.table-input:focus {
  outline: none;
  border-color: #5b4a8a;
}

.error-message {
  color: #dc2626;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  font-weight: 500;
  padding: 0.625rem;
  background-color: #fee;
  border-radius: 4px;
  border-left: 3px solid #dc2626;
}

.certificate-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding: 0.875rem 1rem;
  background: #f8f8f8;
  border-radius: 6px;
  border: 1px solid #e5e5e5;
}

.certificate-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: #333;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.toggle-switch input { 
  opacity: 0; 
  width: 0; 
  height: 0; 
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #5b4a8a;
}

input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

.donate-btn {
  width: 100%;
  background: #5b4a8a;
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: background 0.2s;
}

.donate-btn:hover:not(:disabled) {
  background: #4a3970;
}

.donate-btn:disabled {
  background: #bbb;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.success-modal {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 380px;
  max-width: 90vw;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
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

.success-icon {
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;
}

.success-icon svg {
  width: 60px;
  height: 60px;
}

.success-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #22c55e;
  margin-bottom: 0.25rem;
}

.success-message {
  font-size: 0.825rem;
  color: #666;
  margin-bottom: 1rem;
}

.reference-box {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 2px dashed #d1d5db;
}

.reference-label {
  font-size: 0.65rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.reference-number {
  font-size: 1.2rem;
  font-weight: 700;
  color: #5b4a8a;
  letter-spacing: 1px;
  margin: 0;
}

.pledged-items {
  margin-bottom: 1rem;
  text-align: left;
}

.pledged-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.items-list {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #fafafa;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0.85rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.item-row:last-child {
  border-bottom: none;
}

.item-name {
  font-size: 0.8rem;
  color: #374151;
  font-weight: 500;
}

.item-quantity {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 600;
}

.warning-box {
  background: #FEF3C7;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  text-align: left;
}

.warning-box svg {
  width: 16px;
  height: 16px;
  margin-top: 2px;
}

.warning-text {
  font-size: 0.75rem;
  color: #92400E;
  line-height: 1.4;
  margin: 0;
}

.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.save-btn, .close-btn {
  width: 100%;
  padding: 0.7rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.save-btn {
  background: #5B21B6;
  color: white;
}

.save-btn:hover {
  background: #4C1D95;
}

.close-btn {
  background: white;
  color: #374151;
  border: 1px solid #D1D5DB;
}

.close-btn:hover {
  background: #F9FAFB;
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .donation-container {
    padding: 1.5rem;
  }
  
  .success-modal {
    padding: 1.5rem;
  }
  
  .reference-number {
    font-size: 1.25rem;
  }
}
/* Selection Modal Styles */
.selection-modal {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 450px;
  max-width: 95vw;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.modal-subtitle {
  color: #5b4a8a;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.modal-description {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.items-selection-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 1.5rem;
}

.selection-card {
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.selection-card.is-active {
  border-color: #5b4a8a;
  background: #f5f3ff;
}

.selection-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.selection-check {
  color: #5b4a8a;
  font-weight: bold;
}

.hidden-checkbox {
  display: none;
}

.confirm-btn {
  width: 100%;
  background: #5b4a8a;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.confirm-btn:hover {
  background: #4a3970;
}

/* ---Prohibited Donations Accordion --- */
.prohibited-section {
  margin-top: 2rem;
  background-color: #FFF5F5;
  border: 2px solid #FEB2B2;
  border-radius: 10px;
  overflow: hidden; 
  transition: all 0.3s ease;
}

/* Add hover effect so user knows it's clickable */
.prohibited-section:hover {
  border-color: #c53030;
  box-shadow: 0 4px 6px -1px rgba(197, 48, 48, 0.1);
}

.prohibited-header {
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prohibited-title {
  color: #C53030;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.prohibited-intro {
  font-size: 0.9rem;
  color: #374151;
  margin: 0;
  line-height: 1.4;
}

.prohibited-intro strong {
  font-weight: 800;
  color: #C53030;
}

.toggle-icon {
  color: #C53030;
  font-size: 1.2rem;
  margin-left: 1rem;
  width: 24px;
  text-align: center;
}

/* The list itself */
.prohibited-list {
  list-style-type: disc;
  padding: 0 1.5rem 1.5rem 3rem; /* Added padding-left for bullets */
  margin: 0;
  border-top: 1px solid #FED7D7; /* Light separator line */
}

.prohibited-list li {
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  color: #4B5563;
  line-height: 1.4;
}

.prohibited-list li:last-child {
  margin-bottom: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px; 
  opacity: 1;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.prohibited-header:hover .prohibited-title {
  text-decoration: underline;
}

.prohibited-section {
  transition: box-shadow 0.3s ease;
}

.prohibited-section.is-expanded {
  box-shadow: 0 4px 15px rgba(197, 48, 48, 0.1);
  border-color: #FEB2B2;
}
</style>
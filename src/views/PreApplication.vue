<template>
  <div>
    <Header />
    <main style="max-width: 800px; margin: 40px auto; padding: 0 16px;">
      <h2 style="color: #5b4b8a; font-size: 24px; margin-bottom: 20px; margin-top: 100px; margin-left: -100px;">
        Assistance Pre-application Page
      </h2>
      
      <form @submit.prevent="submitForm" style="background: white; border: 2px solid #333; border-radius: 12px; padding: 40px;">
        <!-- CLIENT IDENTIFYING DATA -->
        <h3 style="text-align: center; font-size: 20px; font-weight: 1000; margin-bottom: 24px; margin-top: -10px;">
          CLIENT IDENTIFYING DATA
        </h3>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 25px; margin-bottom: 16px;">
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Surname</label>
            <input v-model="client.surname" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" required />
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">First Name</label>
            <input v-model="client.firstName" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" required />
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Middle Name</label>
            <input v-model="client.middleName" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;"> Name Ext.</label>
            <input v-model="client.ext" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 25px; margin-bottom: 16px;">
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Age</label>
            <input v-model="client.age" type="number" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" required />
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Sex</label>
            <div style="display: flex; gap: 16px; align-items: center; height: 38px; margin-top:-5px;margin-left: 18px; font-size: 13px;">
              <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                <input type="radio" v-model="client.sex" value="Male" required /> Male
              </label>
              <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                <input type="radio" v-model="client.sex" value="Female" required /> Female
              </label>
            </div>
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Religion</label>
            <input v-model="client.religion" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 25px; margin-bottom: 16px;">
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Purok</label>
            <input v-model="client.purok" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Barangay</label>
            <input v-model="client.barangay" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Municipality</label>
            <input v-model="client.municipality" value="Initao" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f5f5f5;" readonly />
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Province</label>
            <input v-model="client.province" value="Mis. Or." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f5f5f5;" readonly />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 25px; margin-bottom: 16px;">
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 11px;">Civil Status</label>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                <input type="radio" v-model="client.civilStatus" value="Single" required /> Single
              </label>
              <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                <input type="radio" v-model="client.civilStatus" value="Married" required /> Married
              </label>
              <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                <input type="radio" v-model="client.civilStatus" value="Widow/er" required /> Widow/er
              </label>
              <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                <input type="radio" v-model="client.civilStatus" value="Separated" required /> Separated
              </label>
              <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                <input type="radio" v-model="client.civilStatus" value="Others" required /> Others
              </label>
              <input v-if="client.civilStatus === 'Others'" v-model="client.civilStatusOther" placeholder="Specify" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; margin-top: 4px;" />
            </div>
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Highest Educational Attainment</label>
            <input v-model="client.education" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          </div>
          <div>
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Date of Birth</label>
            <input v-model="client.dateOfBirth" type="date" style="width: 100%; padding: 7px; border: 1px solid #ccc; border-radius: 4px; font-family: outfit;" required />
          </div>
        </div>

       <div style="margin-bottom: 16px;">
  <label
    style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;"
  >
    Place of Birth
  </label>

  <div
    style="
      display: grid;
      grid-template-columns: repeat(4, 1fr) auto;
      gap: 25px;
      align-items: center;
      margin-top: 10px;
    "
  >
    <input v-model="client.birthPurok" placeholder="Purok" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
    <input v-model="client.birthBarangay" placeholder="Barangay" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
    <input v-model="client.birthMunicipality" placeholder="Municipality" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
    <input v-model="client.birthProvince" placeholder="Province" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />

    <label
      style="
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        white-space: nowrap;
      "
    >
      <input type="checkbox" style = "margin-top: 4.5px;" v-model="client.pantawid" />
      Pantawid
    </label>
  </div>
</div>


        <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 25px; margin-bottom: 24px;">
  <div>
    <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">
      Occupation
    </label>
    <input
      v-model="client.occupation"
      style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
    />
  </div>

  <div>
    <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">
      Monthly Income
    </label>
    <input
      v-model="client.monthlyIncome"
      type="number"
      style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
    />
  </div>

  <div style="display: flex; align-items: center;">
    <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; white-space: nowrap; margin-top: 15px;">
      <input type="checkbox" style = "margin-top: 4.5px;" v-model="client.philhealth" />
      PhilHealth
    </label>
  </div>
</div>


        <div style="margin-bottom: 24px;">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; margin-top: -5px; margin-bottom: 20px;">
            <input type="checkbox" style = "margin-top: 4.5px"; v-model ="isBeneficiary" @change="toggleBeneficiary" />
            <span style="font-weight: 500;">I am the beneficiary</span>
          </label>
          <div v-if="!isBeneficiary">
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 10px;">Relationship to Beneficiary</label>
            <input v-model="relationshipToBeneficiary" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
          </div>
        </div>

        <!-- BENEFICIARY IDENTIFYING DATA -->
        <div v-if="!isBeneficiary">
          <h3 style="text-align: center; font-size: 20px; font-weight: 700; margin-bottom: 24px;">
            BENEFICIARY IDENTIFYING DATA
          </h3>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 25px; margin-bottom: 16px;">
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Surname</label>
              <input v-model="beneficiary.surname" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">First Name</label>
              <input v-model="beneficiary.firstName" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Middle Name</label>
              <input v-model="beneficiary.middleName" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Name Ext.</label>
              <input v-model="beneficiary.ext" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 25px; margin-bottom: 16px;">
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Age</label>
              <input v-model="beneficiary.age" type="number" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Sex</label>
              <div style="display: flex; gap: 16px; align-items: center; height: 38px; margin-top: -5px; margin-left: 18px; font-size: 13px;">
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="radio" v-model="beneficiary.sex" value="Male" /> Male
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
                  <input type="radio" v-model="beneficiary.sex" value="Female" /> Female
                </label>
              </div>
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Religion</label>
              <input v-model="beneficiary.religion" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 25px; margin-bottom: 16px;">
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Purok</label>
              <input v-model="beneficiary.purok" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Barangay</label>
              <input v-model="beneficiary.barangay" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Municipality</label>
              <input v-model="beneficiary.municipality" value="Initao" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f5f5f5;" readonly />
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Province</label>
              <input v-model="beneficiary.province" value="Mis. Or." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; background: #f5f5f5;" readonly />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 2fr 1fr; gap: 25px; margin-bottom: 16px;">
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 13px;">Civil Status</label>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                  <input type="radio" v-model="beneficiary.civilStatus" value="Single" /> Single
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                  <input type="radio" v-model="beneficiary.civilStatus" value="Married" /> Married
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                  <input type="radio" v-model="beneficiary.civilStatus" value="Widow/er" /> Widow/er
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                  <input type="radio" v-model="beneficiary.civilStatus" value="Separated" /> Separated
                </label>
                <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 14px;">
                  <input type="radio" v-model="beneficiary.civilStatus" value="Others" /> Others
                </label>
                <input v-if="beneficiary.civilStatus === 'Others'" v-model="beneficiary.civilStatusOther" placeholder="Specify" style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px; margin-top: 4px;" />
              </div>
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Highest Educational Attainment</label>
              <input v-model="beneficiary.education" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <div>
              <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;">Date of Birth</label>
              <input v-model="beneficiary.dateOfBirth" type="date" style="width: 100%; padding: 7px; border: 1px solid #ccc; border-radius: 4px; font-family: outfit;" />
            </div>
          </div>

         <div style="margin-bottom: 15px;">
  <label
    style="
      display: block;
      font-size: 11px;
      color: #999;
      text-transform: uppercase;
      margin-bottom: 8px;
    "
  >
    Place of Birth
  </label>

  <div
    style="
      display: grid;
      grid-template-columns: repeat(4, 1fr) auto;
      gap: 25px;
      align-items: center;
    "
  >
    <input
      v-model="beneficiary.birthPurok"
      placeholder="Purok"
      style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
    />
    <input
      v-model="beneficiary.birthBarangay"
      placeholder="Barangay"
      style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
    />
    <input
      v-model="beneficiary.birthMunicipality"
      placeholder="Municipality"
      style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
    />
    <input
      v-model="beneficiary.birthProvince"
      placeholder="Province"
      style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
    />

    <label
      style="
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        white-space: nowrap;
        height: 38px;
      "
    >
      <input
        type="checkbox"
        v-model="beneficiary.pantawid"
        style="margin-top: 4.5px;"
      />
      Pantawid
    </label>
  </div>
</div>


          <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 25px; margin-bottom: 24px;">
  <div>
    <label
      style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;"
    >
      Occupation
    </label>
    <input
      v-model="beneficiary.occupation"
      style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
    />
  </div>

  <div>
    <label
      style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 4px;"
    >
      Monthly Income
    </label>
    <input
      v-model="beneficiary.monthlyIncome"
      type="number"
      style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
    />
  </div>

  <div style="display: flex; align-items: center;">
    <label
      style="
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        white-space: nowrap;
        height: 38px;
        margin-top: 15px;
      "
    >
      <input
        type="checkbox"
        v-model="beneficiary.philhealth"
        style="margin-top: 5px;"
      />
      PhilHealth
    </label>
  </div>
</div>

          <div style="margin-bottom: 24px;">
            <label style="display: block; font-size: 11px; color: #999; text-transform: uppercase; margin-bottom: 8px;">Context of Need</label>
            <div style="display: flex; flex-wrap: wrap; gap: 16px;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" v-model="contextOfNeed" value="Medicine" /> Medicine
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" v-model="contextOfNeed" value="Burial" /> Burial
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" v-model="contextOfNeed" value="Temporary Shelter" /> Temporary Shelter
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" v-model="contextOfNeed" value="Financial Aid" /> Financial Aid
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" v-model="contextOfNeed" value="Transportation" /> Transportation
              </label>
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                <input type="checkbox" v-model="contextOfNeedOther" value="true" /> Others
              </label>
            </div>
            <input v-if="contextOfNeedOther" v-model="contextOfNeedOtherText" placeholder="Specify" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; margin-top: 8px;" />
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 32px; padding-top: 24px; border-top: 2px solid #333;">
          <button type="button" @click="resetForm" style="padding: 10px 24px; border: 1px solid #ccc; background: white; border-radius: 4px; cursor: pointer;">
            Reset Form
          </button>
          <button type="submit" style="padding: 10px 24px; border: none; background: #4845d2; color: white; border-radius: 4px; cursor: pointer; font-weight: 500;">
            Submit Form
          </button>
        </div>
      </form>
    </main>
    <Footer />

    <!-- Success Modal -->
  <!-- Success Modal -->
    <div v-if="showModal" @click="closeModal" 
    style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
    background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div @click.stop style="background: white; border-radius: 12px; padding: 32px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
        <!-- Success Icon -->
        <div style="margin-bottom: 16px;">
          <svg width="60" height="60" viewBox="0 0 100 100" style="margin: 0 auto;">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#8FD9A8" stroke-width="6"/>
            <path d="M30 50 L45 65 L70 35" fill="none" stroke="#8FD9A8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 12px; color: #000;">
          Submission Successful
        </h2>

        <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
          Your pre-application has been successfully recorded.
        </p>

        <div style="background: #e8e8e8; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
          <p style="font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
            REFERENCE NUMBER
          </p>
          <p style="font-size: 28px; font-weight: 600; color: #666; letter-spacing: 2px;">
            {{ reference }}
          </p>
        </div>

        <p style="color: #e74c3c; font-size: 12px; margin-bottom: 20px; line-height: 1.4;">
          Note: Your pre-application record will be automatically deleted after 15 days of pending verification.
        </p>

        <button @click="saveToGallery" style="width: 100%; padding: 12px; border: none; background: #4845d2; color: white; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500; margin-bottom: 10px;">
          Save to Gallery
        </button>

        <button @click="closeModal" style="width: 100%; padding: 12px; border: 2px solid #333; background: white; color: #333; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: { Header, Footer },
  data() {
    return {
      client: {
        surname: '',
        firstName: '',
        middleName: '',
        ext: '',
        age: '',
        sex: '',
        religion: '',
        purok: '',
        barangay: '',
        municipality: 'Initao',
        province: 'Mis. Or.',
        civilStatus: '',
        civilStatusOther: '',
        education: '',
        dateOfBirth: '',
        birthPurok: '',
        birthBarangay: '',
        birthMunicipality: '',
        birthProvince: '',
        pantawid: false,
        occupation: '',
        monthlyIncome: '',
        philhealth: false
      },
      beneficiary: {
        surname: '',
        firstName: '',
        middleName: '',
        ext: '',
        age: '',
        sex: '',
        religion: '',
        purok: '',
        barangay: '',
        municipality: 'Initao',
        province: 'Mis. Or.',
        civilStatus: '',
        civilStatusOther: '',
        education: '',
        dateOfBirth: '',
        birthPurok: '',
        birthBarangay: '',
        birthMunicipality: '',
        birthProvince: '',
        pantawid: false,
        occupation: '',
        monthlyIncome: '',
        philhealth: false
      },
      isBeneficiary: true,
      relationshipToBeneficiary: '',
      contextOfNeed: [],
      contextOfNeedOther: false,
      contextOfNeedOtherText: '',
      reference: '',
      showModal: false
    }
  },
  methods: {
    generateRef() {
      const year = new Date().getFullYear()
      const rand = Math.floor(100 + Math.random() * 900)
      return `PRE-${year}-${rand}`
    },
    toggleBeneficiary() {
      if (this.isBeneficiary) {
        this.relationshipToBeneficiary = ''
        this.beneficiary = {
          surname: '',
          firstName: '',
          middleName: '',
          ext: '',
          age: '',
          sex: '',
          religion: '',
          purok: '',
          barangay: '',
          municipality: 'Initao',
          province: 'Mis. Or.',
          civilStatus: '',
          civilStatusOther: '',
          education: '',
          dateOfBirth: '',
          birthPurok: '',
          birthBarangay: '',
      birthMunicipality: '',
      birthProvince: '',
      pantawid: false,
      occupation: '',
      monthlyIncome: '',
      philhealth: false
    }
  }
},
submitForm() {
  if (!this.client.surname || !this.client.firstName || !this.client.age || !this.client.sex || !this.client.civilStatus || !this.client.dateOfBirth) {
    alert('Please fill out all required fields in Client Identifying Data.')
    return
  }

  this.reference = this.generateRef()

  const stored = JSON.parse(localStorage.getItem('preApplications') || '[]')
  stored.push({
    reference: this.reference,
    client: { ...this.client },
    beneficiary: this.isBeneficiary ? null : { ...this.beneficiary },
    isBeneficiary: this.isBeneficiary,
    relationshipToBeneficiary: this.relationshipToBeneficiary,
    contextOfNeed: this.contextOfNeed,
    contextOfNeedOtherText: this.contextOfNeedOtherText,
    createdAt: new Date().toISOString()
  })
  localStorage.setItem('preApplications', JSON.stringify(stored))

  this.showModal = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
},
closeModal() {
  this.showModal = false
  this.resetForm()
},
saveToGallery() {
  // Create a canvas to generate an image
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, 800, 600)

  // Draw check icon circle
  ctx.strokeStyle = '#8FD9A8'
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.arc(400, 120, 60, 0, Math.PI * 2)
  ctx.stroke()

  // Draw check mark
  ctx.beginPath()
  ctx.moveTo(360, 120)
  ctx.lineTo(385, 145)
  ctx.lineTo(440, 95)
  ctx.stroke()

  // Title
  ctx.fillStyle = '#000'
  ctx.font = 'bold 36px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('Submission Successful', 400, 240)

  // Subtitle
  ctx.fillStyle = '#666'
  ctx.font = '18px Arial'
  ctx.fillText('Your pre-application has been successfully recorded.', 400, 280)

  // Reference box
  ctx.fillStyle = '#e8e8e8'
  ctx.fillRect(150, 320, 500, 120)

  ctx.fillStyle = '#999'
  ctx.font = '12px Arial'
  ctx.fillText('REFERENCE NUMBER', 400, 360)

  ctx.fillStyle = '#666'
  ctx.font = 'bold 42px monospace'
  ctx.fillText(this.reference, 400, 410)

  // Note
  ctx.fillStyle = '#e74c3c'
  ctx.font = '14px Arial'
  ctx.fillText('Note: Your pre-application record will be automatically deleted', 400, 480)
  ctx.fillText('after 15 days of pending verification.', 400, 505)

  // Convert to blob and download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Reference-${this.reference}.png`
    a.click()
    URL.revokeObjectURL(url)
    alert('Reference image saved to your downloads!')
  })
},
resetForm() {
  this.client = {
    surname: '',
    firstName: '',
    middleName: '',
    ext: '',
    age: '',
    sex: '',
    religion: '',
    purok: '',
    barangay: '',
    municipality: 'Initao',
    province: 'Mis. Or.',
    civilStatus: '',
    civilStatusOther: '',
    education: '',
    dateOfBirth: '',
    birthPurok: '',
    birthBarangay: '',
    birthMunicipality: '',
    birthProvince: '',
    pantawid: false,
    occupation: '',
    monthlyIncome: '',
    philhealth: false
  }
  this.beneficiary = {
    surname: '',
    firstName: '',
    middleName: '',
    ext: '',
    age: '',
    sex: '',
    religion: '',
    purok: '',
    barangay: '',
    municipality: 'Initao',
    province: 'Mis. Or.',
    civilStatus: '',
    civilStatusOther: '',
    education: '',
    dateOfBirth: '',
    birthPurok: '',
    birthBarangay: '',
    birthMunicipality: '',
    birthProvince: '',
    pantawid: false,
    occupation: '',
    monthlyIncome: '',
    philhealth: false
  }
  this.isBeneficiary = true
  this.relationshipToBeneficiary = ''
  this.contextOfNeed = []
  this.contextOfNeedOther = false
  this.contextOfNeedOtherText = ''
  this.reference = ''
}}
}
</script>
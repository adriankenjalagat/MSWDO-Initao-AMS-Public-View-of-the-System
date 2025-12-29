<template>
  <header class="site-header">
    <div class="wrap">
      <div class="brand">
        <img :src="logoImg" alt="MSWDO Logo" style="height:60px; margin-right:10px;" />
        <div class="brand-text">
          <strong>MSWDO</strong>
          <div class="tag">Initao, Misamis Oriental</div>
        </div>
      </div>
      <nav class="nav">
        <a href="#" @click.prevent="scrollTo('intro')">Home</a>
        <a href="#" @click.prevent="scrollTo('news')">News</a>
        <a href="#" @click.prevent="scrollTo('about')">About us</a>
        <a href="#" @click.prevent="scrollTo('operations')">Operations</a>
        <button class="btn-apply" @click="goPreApp">Assistance pre-application</button>
      </nav>
    </div>
  </header>
</template>

<script>
import logoImg from '../assets/mswdo-logo.png'

export default {
  name: 'Header',
  data() {
    return { logoImg }
  },
  methods: {
    scrollTo(id) {
      if (this.$route.path !== '/') {
        this.$router.push('/').then(() => {
          this.$nextTick(() => {
            const el = document.getElementById(id)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          })
        })
      } else {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    goPreApp() {
      this.$router.push('/pre-application')
    }
  }
}
</script>

<style scoped>
.site-header {
 position: fixed;
  top: 0;
  left: 0;
  width: 100%;          /* important to cover full viewport width */
  background: #F2E8E8;
  color: black;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  border-bottom: 0.5px solid rgba(0,0,0,0.3);
}
.brand-text, .site-header, .site-header * {
  font-family: 'Outfit', sans-serif;
}
.brand-text strong {
  font-size: 20px; 
}

.brand-text .tag {
  font-size: 14px; 
  opacity: 0.9;  
  font-weight: 600;
}

.wrap {
   max-width: 1100px;
  margin: 0 auto;      /* centers it */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
}
.brand {
  display: flex;
  align-items: center;
}
.brand-text {
  display: flex;
  flex-direction: column;
}
.tag {
  font-size: 12px;
  opacity: 0.9;
}
.nav a {
  color: black;
  margin-right: 50px;
  text-decoration: none;
  cursor: pointer;
  font-size: 14.5px;
}
.nav a:hover {
  opacity: 0.85;
}
.btn-apply {
   background: transparent;   /* remove button background */
  color: black;              /* same as links */
  border: none;              /* no border */
  padding: 0;                /* remove extra padding */
  font: inherit;             /* inherit font style from parent */
  cursor: pointer;           /* pointer cursor */
  text-decoration: none; 
  font-size: 14.5px;
}
.btn-apply:hover {
  opacity: 2;
}
</style>

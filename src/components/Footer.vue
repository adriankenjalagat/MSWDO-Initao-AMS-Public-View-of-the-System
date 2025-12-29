<template>
  <footer style="background:#F2E8E8; padding:15px 0; margin-top:32px;">
    <div style="max-width:1100px; margin:auto; text-align:center; display:flex; align-items:center; justify-content:center; gap:8px;">
      <img :src="initaoLogo" alt="Initao Logo" style="height:40px; width:auto;" />
      <img :src="mswdoLogo" alt="MSWDO Logo" style="height:40px; width:auto;" />
      <span>© {{ year }}</span>
      <span>MSWDO Initao, Misamis Oriental. All rights reserved.</span>
    </div>
  </footer>
</template>

<script>
import initaoLogo from '../assets/initao-logo.png'
import mswdoLogo from '../assets/mswdo-logo.png'

export default { 
  data(){ 
    return { 
      year: new Date().getFullYear(),
      initaoLogo,
      mswdoLogo
    } 
  } 
}
</script>
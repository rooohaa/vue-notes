<template>
   <div id="overlay" @click="closeModal">
      <section>
         <div id="close" @click="closeModal">&times;</div>
         <header>Some error occurred</header>
         <p><slot></slot></p>
      </section>
   </div>
</template>

<script>
export default {
   emits: ['close-modal'],
   methods: {
      closeModal() {
         this.$emit('close-modal')
      }
   }
}
</script>

<style scoped>
#overlay {
   position: fixed;
   top: 0;
   right: 0;
   left: 0;
   bottom: 0;
   background-color: rgba(0, 0, 0, 0.7);
   z-index: 10;
}

section {
   width: 400px;
   height: 130px;
   border-radius: 5px;
   background-color: #fff;
   margin: 0 auto;
   margin-top: 200px;
   position: relative;
}

#close {
   position: absolute;
   top: -7px;
   right: 7px;
   color: #fff;
   cursor: pointer;
   font-size: 40px;
}

p {
   font-size: 16px;
   margin: 10px;
}

header {
   border-top-left-radius: 5px;
   border-top-right-radius: 5px;
   color: #fff;
   font-weight: 500;
   font-size: 17px;
   padding: 10px 8px;
   height: 45px;
   background-color: #2196F3;
}
</style>
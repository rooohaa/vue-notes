<template>
   <header class="header">
      <container class="header__container">

         <div class="header__block">
           <img src="../../assets/header-logo.png" alt="App logo">
           <router-link to="/">
              <h1>VueNotes</h1>
           </router-link>
         </div>

         <div class="header__block">
            <router-link to="/">Add Note</router-link>
            <router-link to="/notes">Notes</router-link>
         </div>

      </container>
   </header>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.header {
   height: 70px;
   background-color: #26A69A;
   box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;

   &__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
   }

   &__block {
      width: 180px;
      display: flex;
      align-items: center;
      justify-content: space-between;
   }
}

a {
   text-decoration: none;
   color: #fff;
   font-size: 18px;
}

.router-link-active {
   color: #D4E157;
}

h1 {
   font-weight: 500;
   font-size: 20px;
   color: #fff;
}

img {
   object-fit: cover;
   width: 50px;
   height: 50px;
}

button {
   outline: none;
   border: none;
   background-color: #fff;
   border-radius: 100%;
   width: 45px;
   height: 45px;
   transition: all 0.3s ease;
   cursor: pointer;
   i {
      font-size: 20px;
      color: grey;
   }
   &:hover {
      background-color: lighten(lightgrey, 10);
   }
}
</style>
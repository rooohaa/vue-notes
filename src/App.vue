<template>
  <the-header />

  <router-view />
</template>

<script>
import TheHeader from "@/components/layout/TheHeader";

export default {
   components: {
      TheHeader,
   },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

</style>

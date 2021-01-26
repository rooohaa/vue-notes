<template>
   <div id="formSuccess">
      <slot></slot>
   </div>
</template>


<style scoped lang="scss">
#formSuccess {
   position: absolute;
   bottom: 0px;
   width: 250px;
   height: 40px;
   border-radius: 5px;
   background: #4CAF50;
   display: flex;
   align-items: center;
   padding-left: 10px;
   color: #fff;
}
</style>
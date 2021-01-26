<template>
   <section>
      <container class="form-container">

         <h1>Add some notes</h1>

         <note-form @add-note="addNote"></note-form>

         <transition name="fade">
            <notify v-if="notify">
               Note saved
            </notify>
         </transition>

      </container>
   </section>
</template>

<script>
import NoteForm from "@/components/NoteForm";

export default {
   data() {
      return {
         notify: false
      }
   },
   components: {
      NoteForm
   },
   methods: {
      async addNote(note) {
         try {
            this.$store.dispatch('addNote', note)
         } catch (e) {
            console.log(e.message || 'failed')
         }

         setTimeout(() => {
            this.notify = true
         }, 600)

         setTimeout(() => {
            this.notify = false
         }, 3000)
      }
   }
}
</script>

<style lang="scss">
section {
   height: 650px;
   position: relative;
   h1 {
      margin-bottom: 35px;
      font-size: 30px;
      font-weight: normal;
   }
}

.fade-enter-active,
.fade-leave-active {
   transition: all 0.4s ease-out;
}

.fade-enter-from,
.fade-leave-to {
   opacity: 0;
   transform: translateY(-50px);
}

.fade-enter-to,
.fade-leave-from {
   opacity: 1;
   transform: translateY(0);
}

.form-container {
   height: 90%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
}
</style>
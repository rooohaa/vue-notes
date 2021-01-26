<template>
   <section>
      <modal v-if="error" @close-modal="handleError">
         {{ error }}
      </modal>

      <h1>My notes</h1>
      <spinner v-if="isLoading" />

      <span v-if="notesIsEmpty && !isLoading">You do not have any notes yet...</span>

      <container class="notes__wrapper" v-if="!isLoading && !notesIsEmpty">
         <note-item
            v-for="note in notes"
            :key="note.id"
            :id="note.id"
            :title="note.title"
            :note="note.text"
            :color="note.color"
            @remove-note="notify"
            @update-note="notify">
         </note-item>
      </container>

      <transition name="fade">
         <notify class="list__notify" v-if="notifyDel">
            Note {{ type }}
         </notify>
      </transition>
   </section>
</template>

<script>
import NoteItem from "@/components/NoteItem"

export default {
   data() {
      return {
         isLoading: false,
         error: null,
         notifyDel: false,
         type: ''
      }
   },
   components: {
      NoteItem,
   },
   computed: {
      notes() {
         return this.$store.getters.notes
      },
      notesIsEmpty() {
         return this.$store.getters.isEmpty
      }
   },
   async created() {
      this.isLoading = true
      try {
         await this.$store.dispatch('setNotes')
      } catch (e) {
         this.error = e.message || 'Failed to fetch notes from DB'
      }
      this.isLoading = false
   },
   methods: {
      handleError() {
         this.error = null
      },
      notify(type) {
         this.type = type

          setTimeout(() => {
            this.notifyDel = true
         }, 1200)

         setTimeout(() => {
            this.notifyDel = false
         }, 3000)
      }
   }
}
</script>

<style scoped lang="scss">
section {
   height: 850px;
   position: relative;
}

h1 {
   margin-top: 30px;
   text-align: center;
}

.notes__wrapper {
   height: 70%;
   margin-top: 35px !important;
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-template-rows: repeat(4, 1fr);
   gap: 20px;
}

span {
   font-weight: bold;
   font-size: 23px;
   display: block;
   margin: 40px 0 0px 120px;
}

.list__notify {
   right: 42%;
   bottom: 26%!important;
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
</style>
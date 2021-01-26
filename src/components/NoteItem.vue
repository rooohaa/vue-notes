<template>
   <div class="note-item"
        :style="'background-color:' + noteColor">
      
      <h3>{{ noteTitle }}</h3>
      <span>{{ noteText }}</span>

      <button @click="editNote"><i class="fas fa-pencil-alt"></i></button>
   </div>
   
   <note-modal 
      v-if="isEditting" 
      :item="noteItem"
      @update-note="handleUpdate"
      @close-modal="closeEdit"
      @remove-note="removeNote">
   </note-modal>
</template>

<script>
import NoteModal from './ui/NoteModal'

export default {
   props: ['id', 'title', 'note', 'color'],
   emits: ['remove-note', 'update-note'],
   data() {
      return {
         isEditting: false,
         noteId: this.id,
         noteTitle: this.title,
         noteText: this.note,
         itemColor: this.color,
         noteItem: { 
            id: this.id,
            title: this.title, 
            note: this.note, 
            color: this.color 
         }
      }
   },
   components: {
      NoteModal
   },
   methods: {
      closeEdit() {
         this.isEditting = false
      },
      editNote() {
         this.isEditting = true
      },
      handleUpdate({ id, title, note, color }) {
         this.isEditting = false

         this.noteId = id
         this.noteTitle = title
         this.noteText = note
         this.itemColor = color

         const res = {
            color: this.itemColor,
            id: this.noteId,
            text: this.noteText,
            title: this.noteTitle
         }

         this.$store.dispatch('updateNote', res)
         this.$emit('update-note', 'updated')
      },
      removeNote(id) {
         this.$store.dispatch('removeNote', id)
         this.$emit('remove-note', 'removed')
      }
   },
   computed: {
      noteColor() {
         switch (this.itemColor) {
            case 'default': return '#fff'
            case 'blue': return '#b2ebf2'
            case 'green': return '#ccff90'
            case 'yellow': return '#ffff8d'
         }
         return ''
      }
   }
}
</script>

<style scoped lang="scss">
.note-item {
   width: 272px;
   min-height: 165px;
   word-wrap: break-word;
   overflow: auto;
   border-radius: 5px;
   padding: 0px 20px;
   display: flex;
   flex-direction: column;
   margin-bottom: 10px;
   transition: all 0.3s ease;
   cursor: pointer;
   border: 1px solid #ccc;
   position: relative;
   &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 4px 12px;
      button { display: block; }
   }

   h3 {
      font-size: 18px;
      position: absolute;
      top: 30px;
   }

   span {
      position: absolute;
      bottom: 50px;
      font-size: 15px;
      color: gray;
      width: 80%;
   }
}

button {
   display: none;
   outline: none;
   position: absolute;
   border: none;
   width: 40px;
   height: 40px;
   top: 20px;
   right: 15px;
   cursor: pointer;
   background-color: inherit;
   border-radius: 100%;
   transition: all 0.3s ease;
   text-align: center;
   i {
      font-size: 17px;
      color: darken(gray, 10);
   }

   &:hover {
      background-color: #B2DFDB;
   }
}

.item__notify {
   right: 43%;
}

</style>
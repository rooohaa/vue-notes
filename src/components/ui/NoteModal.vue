<template>
  <div id="backdrop">
      <form @submit.prevent="updateNote" :style="'background-color:' + backcolor">
         <div class="form-control">
            <input 
               type="text" 
               v-model="title" 
               :style="'background-color:' + backcolor"  
               placeholder="Title" 
               maxlength="30">

            <span>{{ title.length }} / 30</span>
         </div>

         <div class="form-control">
            <input type="text"
               v-model="note"
               :style="'background-color:' + backcolor"
               placeholder="Note..." 
               maxlength="60">

            <span>{{ note.length }} / 60</span>
         </div>

         <div class="wrapper">
            <div>
               <button class="delete" type="button" @click="removeNote">
                  <i class="fas fa-trash"></i>
               </button>

               <button class="color-picker" type="button" @click="openColorPicker"> 
                  <i class="fas fa-palette"></i>
               </button>
            </div>

            <div>
               <button type="button" @click="closeModal" class="close">Close</button>
               <button type="submit" class="update">Update</button>
            </div>

            <div id="color-picker" :class="{ active: colorPickerActive }">
               <div 
                  class="circle" 
                  id="default" 
                  @click="setColor('default')" 
                  title="Default">
               </div>

               <div 
                  class="circle" 
                  id="blue" 
                  @click="setColor('blue')" 
                  title="Blue">
               </div>

               <div 
                  class="circle"
                  id="yellow"
                  @click="setColor('yellow')"
                  title="Yellow">
               </div>

               <div 
                  class="circle" 
                  id="green" 
                  @click="setColor('green')" 
                  title="Green">
               </div>
            </div>

         </div>
      </form>
  </div>
</template>

<script>
export default {
   props: ['item'],
   emits: ['update-note', 'close-modal', 'remove-note'],
   data() {
      return {
         id: this.item.id,
         title: this.item.title,
         note: this.item.note,
         color: this.item.color,
         colorPickerActive: false
      }
   },
   computed: {
      backcolor() {
         switch (this.color) {
            case 'default': return '#fff'
            case 'blue': return '#b2ebf2'
            case 'green': return '#ccff90'
            case 'yellow': return '#ffff8d'
         }
         return ''
      }
   },
   methods: {
      updateNote() {
         this.$emit('update-note', {
            id: this.id,
            title: this.title,
            note: this.note,
            color: this.color
         })
      },
      removeNote() {
         this.$emit('remove-note', this.id)
      },
      closeModal() {
         this.$emit('close-modal')
      },
      openColorPicker() {
         this.colorPickerActive = !this.colorPickerActive
      },
      setColor(color) {
         this.color = color
      }
   }
}
</script>

<style scoped lang="scss">
#backdrop {
   position: fixed;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 4;
   background-color: rgba(0, 0, 0, 0.4);
}

form {
   position: absolute;
   top: 30%;
   right: 35%;
   background-color: #fff;
   border-radius: 5px;
   width: 500px;
   height: 300px;
   padding: 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;

   .form-control {
      width: 100%;
      position: relative;
      input {
         position: relative;
         width: 100%;
         font-size: 17px;
         height: 40px;
         border: none;
         outline: none;
         padding: 5px 10px;
         border-bottom: 2px solid #009688;
      }
      span {
         color: grey;
         font-weight: normal;
         font-size: 13px;
         position: absolute;
         right: 10px;
         bottom: -30px;
      }
   }
}

.wrapper {
   margin-top: 15px;
   width: 95%;
   display: flex;
   align-items: center;
   justify-content: space-between; 

   div {
      display: flex;
   }
}

.update {
   border: none;
   outline: none;
   color: #fff;
   font-size: 15px;
   cursor: pointer;
   background-color: #009688;
   border-radius: 5px;
   width: 70px;
   height: 35px;
}

.close {
   outline: none;
   cursor: pointer;
   border: none;
   color: #000;
   background-color: inherit;
   margin-right: 20px;
   font-size: 17px;
}

.delete,
.color-picker {
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 12px;
   outline: none;
   border: none;
   background-color: #fff;
   cursor: pointer;
   border-radius: 100%;
   width: 35px;
   height: 35px;
   i {
      color: grey;
      font-size: 18px;
   }
   &:hover {
      background-color: darken(#fff, 5);
   }
}

#color-picker {
   display: none;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
   width: 150px;
   height: 35px;
   border-radius: 5px;
   background: #fff;
   position: absolute;
   bottom: 75px;
   left: 50px;
   z-index: 2;
   justify-content: space-around;
   align-items: center;
   .circle {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      background-color: red;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
         transform: scale(1.2);
      }
   }

   #default {
      background-color: #fff;
      border: 2px solid grey;
   }

   #blue {
      background-color: #b2ebf2;
   }

   #green {
      background-color: #ccff90;
   }

   #yellow {
      background-color: #ffff8d;
   }
}

.active {
   display: flex !important;
}
</style>
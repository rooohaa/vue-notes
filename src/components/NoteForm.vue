<template>
   <form @submit.prevent="submitForm" :style="'background-color:' + bgColor">

      <div class="form__block">
         <div class="form-control">
            <label for="title">Title:</label>

            <input type="text"
               id="title"
               v-model="title"
               @input="validateLimit('title')"
               placeholder="Title"
               maxlength="30"
               :style="'background-color:' + bgColor">

            <span>{{ title.length }} / 30</span>
         </div>

         <div class="form-control">
            <label for="note">Note:</label>

            <input type="text"
               id="note"
               v-model="note"
               @input="validateLimit('note')"
               placeholder="Take a note..."
               maxlength="60"
               :style="'background-color:' + bgColor">

            <span>{{ note.length }} / 60</span>
         </div>

         <p v-if="!formIsValid">Please enter valid input fields...</p>

         <div class="form-control">
            <button type="button" id="colors" @click="openColorPicker">
               <i class="fas fa-palette"></i>
            </button>

            <button type="submit" id="add-note">Add Note</button>
         </div>
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

   </form>
</template>

<script>
export default {
   emits: ['add-note'],
   data() {
      return {
         colorPickerActive: false,
         color: '',
         title: '',
         note: '',
         formIsValid: true
      }
   },
   computed: {
      bgColor() {
         if (this.color === 'default') {
            return '#fff'
         } else if (this.color === 'yellow') {
            return '#ffff8d'
         } else if (this.color === 'green') {
            return '#ccff90'
         } else if (this.color === 'blue') {
            return '#b2ebf2'
         }
         return ''
      }
   },
   methods: {
      submitForm() {
         if (this.title === '' || this.note === '') {
            this.formIsValid = false
            return
         }
         this.$emit('add-note', {
            id: new Date().getUTCMilliseconds(),
            title: this.title,
            text: this.note,
            color: this.color
         })
         this.resetFields()
      },
      resetFields() {
         this.title = this.note = ''
         this.formIsValid = true
         this.colorPickerActive = false
      },
      openColorPicker() {
         this.colorPickerActive = !this.colorPickerActive
      },
      setColor(color) {
         this.color = color
      },
      validateLimit(inputField) {
         if (inputField === 'title') {
            this.titleLimit = this.title.length
         } else if (inputField === 'note') {
            this.noteLimit = this.note.length
         }
      }
   }
}
</script>

<style scoped lang="scss">
form {
   box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
   border-radius: 8px;
   width: 60%;
   height: 360px;
   position: relative;
   transition: all 0.3s ease-out;
}

.form__block {
   display: flex;
   align-items: flex-start;
   justify-content: space-around;
   flex-direction: column;
   padding: 15px 30px;
   height: 100%;
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

p {
   color: crimson;
}

.form-control {
   width: 100%;
   position: relative;
   label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 18px;
   }

   input {
      width: 100%;
      outline: none;
      border: none;
      border-bottom: 2px solid #009688;
      padding: 10px;
      font-size: 17px;
      transition: all 0.3s ease-out;
   }

   span {
      color: grey;
      font-weight: normal;
      font-size: 13px;
      position: absolute;
      right: 10px;
      bottom: -30px;
   }

   &:last-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      #colors {
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

      #add-note {
         border: none;
         outline: none;
         background-color: #009688;
         color: #fff;
         border-radius: 4px;
         cursor: pointer;
         width: 85px;
         height: 38px;
         font-size: 15px;
      }
   }
}
</style>
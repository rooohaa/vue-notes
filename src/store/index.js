import { createStore } from "vuex";

export default createStore({
   state: {
      notes: [],
   },
   mutations: {
      addNote(state, payload) {
         state.notes.push(payload);
      },
      setNotes(state, payload) {
         state.notes = payload;
      },
      removeNote(state, payload) {
         state.notes = payload
      }
   },
   actions: {
      async addNote(context, payload) {
         const res = await fetch(
         "https://vue-notes-7af87-default-rtdb.firebaseio.com/notes.json",
         {
            method: "POST",
            body: JSON.stringify(payload),
         }
         );

         const resData = await res.json();

         if (!res.ok) {
            throw new Error(resData.message || "Failed to post data...");
         }

         context.commit("addNote", payload);
      },
      async setNotes(context) {
         const res = await fetch(
         "https://vue-notes-7af87-default-rtdb.firebaseio.com/notes.json"
         );
         const resData = await res.json();

         const notes = [];

         if (!res.ok) {
            throw new Error(resData.message || "Failed to fetch data...");
         }

         for (const key in resData) {
            notes.push(resData[key]);
         }

         context.commit("setNotes", notes);
      },
      async updateNote(context, payload) {
         // getting id 
         const res = await fetch(
            "https://vue-notes-7af87-default-rtdb.firebaseio.com/notes.json"
         );
         const resData = await res.json()
         const arr = []
         let ID = null
         
         Object.keys(resData).forEach(key => {
            let obj = {}
            obj[key] = resData[key]

            arr.push(obj)
         })

         for (let i = 0; i < arr.length; i++) {
            let item = arr[i]
          
            Object.keys(item).forEach(key => {
               if (item[key].id === payload.id) {
                  ID = key
               }
            });
         }
         console.log(ID)

         // patching data
         const r = await fetch(`https://vue-notes-7af87-default-rtdb.firebaseio.com/notes/${ID}.json`, {
            method: 'PATCH',
            body: JSON.stringify(payload)
         })

         const rData = await r.json()

         console.log(rData)
      },
      async removeNote(context, payload) {
         let notes = context.getters.notes
         
         notes = notes.filter(note => note.id !== payload)
      
         const res = await fetch(
            "https://vue-notes-7af87-default-rtdb.firebaseio.com/notes.json"
         );
         const resData = await res.json()
         const arr = []
         
         Object.keys(resData).forEach(key => {
            let obj = {}
            obj[key] = resData[key]

            arr.push(obj)
         })
         
         let ID = null
         
         for (let i = 0; i < arr.length; i++) {
            let item = arr[i]

            Object.keys(item).forEach(key => {
               if (item[key].id === payload) {
                  ID = key
               }
            });
         }

         const r = await fetch(`https://vue-notes-7af87-default-rtdb.firebaseio.com/notes/${ID}.json`, {
            method: 'DELETE'
         });

         const rData = await r.json()

         console.log(rData)

         context.commit('removeNote', notes)
      }
   },
   getters: {
      notes(state) {
         return state.notes;
      },
      isEmpty(state) {
         return state.notes && state.notes.length === 0;
      },
   },
});
import { createRouter, createWebHashHistory } from 'vue-router'

const AddNote = () => import("@/views/AddNote")
const NoteList = () => import("@/views/NoteList")

const routes = [
  {
   path: '/',
   component: AddNote
  },
  {
   path: '/notes',
   component: NoteList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

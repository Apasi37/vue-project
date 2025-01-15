import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
      return {
        loggedIn: false,
        name: "username",
        role: "role"
      }
    },
    actions:{
      login(username: string, role: string){
        this.loggedIn = true
        this.name = username
        this.role = role
      }
    }
  })
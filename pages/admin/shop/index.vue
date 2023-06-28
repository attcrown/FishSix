<template>
  <v-sheet class="m-3 p-3" style="background-color: rgb(172, 169, 169); border-radius: 20px;" elevation="24">
    <titles></titles>
    <item></item>
  </v-sheet>

</template>
  
  <script>
  import item from '@/pages/admin/shop/item.vue'
  import titles from '@/pages/admin/shop/title.vue'
  export default {
    data() {
        return {

        }
    },
    components: {
      item,
      titles,
    },
    methods: {
        sum(){
            
        },
    },
    
  }
  </script>
  

<template>
    <div class="mx-0">
        <v-btn @click="switch_calendar()" class="mb-5 rounded-xl font-weight-bold" style="font-size: 20px;" color="brown lighten-4">
            แสดงตารางสอน <v-icon class="mdi mdi-calendar-month text-h8"></v-icon>
        </v-btn>       
        <calendar :hidden="show_date"></calendar>
        <tabletea></tabletea>
    </div>
</template>
    
<script>
import tabletea from './table_tea.vue';
import calendar from './calendar.vue';
export default {
    data() {
        return {
            show_date: true,
        }
    },
    components: {
        tabletea,
        calendar,
    },
    mounted() {
        this.fullName();
    },
    methods: {
        switch_calendar(){
            if(this.show_date){
                this.show_date = false;
            }else{
                this.show_date = true;
            }
        },
        fullName() {
            if (localStorage.getItem('firstName') == null) {
                this.firstName = sessionStorage.getItem('firstName') || '';
                this.keyuser = sessionStorage.getItem('lastName') || '';
            } else {
                this.firstName = localStorage.getItem('firstName') || '';
                this.keyuser = localStorage.getItem('lastName') || '';
            }
        },
    },
}
</script>
    
<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>
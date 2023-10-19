<template>
    <div class="mx-15">
        <v-btn @click="switch_calendar()" class="mb-5 rounded-xl font-weight-bold" style="font-size: 20px;" color="brown lighten-4">
            แสดงตารางสอน <v-icon class="mdi mdi-calendar-month text-h8"></v-icon>
        </v-btn>       
        <calendar :hidden="show_date"></calendar>
        <table_tea></table_tea>
    </div>
</template>
<script>
import calendar from '~/pages/admin/table_teacher/calendar.vue';
import table_tea from '~/pages/admin/table_teacher/table_tea.vue';
    export default {
        layout: 'teacherNav',
        data() {
            return {
                show_date: true,
            }
        },
        components:{
            calendar,
            table_tea
        },
        methods: {
            switch_calendar(){
                if(this.show_date){
                    this.show_date = false;
                }else{
                    this.show_date = true;
                }
            },
        }
    }
</script>
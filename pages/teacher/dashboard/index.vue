<template>
    <div class="mx-10">
        <dashboard></dashboard>        
    </div>
</template>
<script>
import dashboard from './dashboard.vue'
export default {
    layout: 'teacherNav',
    data() {
        return {
            firstName: 'ไม่มี',
            keyuser: 'ไม่มี',
        }
    },
    components: {
        dashboard,
    },    
}

</script>
<style>
.v-data-table-header th {
    background-color: #D4C1B2;
    /* เปลี่ยนเป็นสีที่คุณต้องการ */
}

.fonts500 {
    font-family: 'Prompt', sans-serif;
    /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
    font-weight: 500;
}

.fonts300 {
    font-family: 'Prompt', sans-serif;
    /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
    font-weight: 300;
}
</style>
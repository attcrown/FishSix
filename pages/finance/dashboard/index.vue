<template>
    <div class="mx-10">
        <table_now></table_now>        
    </div>
</template>
<script>
import table_now from '~/pages/admin/table_now.vue';
export default {
    layout: 'financeNav',
    data() {
        return {
        }
    },
    components: {
        table_now,
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
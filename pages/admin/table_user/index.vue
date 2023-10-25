<template>
    <div class="mx-0">
        <table_tea v-if="!isMobile"></table_tea>
    </div>
</template>
<script>
import table_tea from './table_tea.vue';

export default {
    data() {
        return {
            isMobile: false, // กำหนดให้เป็น false เริ่มต้น
        }
    },
    components: {
        table_tea,
    },
    computed: {
        // ตรวจสอบว่าอยู่ในโหมดมือถือหรือไม่
        isMobileMode() {
            return window.innerWidth <= 768; // คุณสามารถปรับค่า 768 เป็นขนาดหน้าจอที่คุณต้องการ
        }
    },
    created() {
        this.isMobile = this.isMobileMode;
    },
}
</script>

  
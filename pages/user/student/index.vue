<template>
    <div>
        <tableUser></tableUser>
    </div>
</template>

<script>
import tableUser from '@/pages/admin/table_user/table_tea.vue';
export default {
    layout:'userNav',
    data() {
        return {
            isMobile: false, // กำหนดให้เป็น false เริ่มต้น
        };
    },
    components: {
        tableUser
    },
    created() {

    },
    methods: {
        
    },
}
</script>
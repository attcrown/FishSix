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
             // กำหนดให้เป็น false เริ่มต้น
             showder: false,
        };
    },
    components: {
        tableUser
    },
    created() {
        this.isMobile();
    },
    methods: {
        isMobile(){
            if(typeof window !== 'undefined' && window.innerWidth <= 768){
                this.showder = true;
                // this.$router.push({ path: 'student_m/'});
            }            
        }
    },
}
</script>
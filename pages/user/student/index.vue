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
            
        };
    },
    components: {
        tableUser
    }
}
</script>
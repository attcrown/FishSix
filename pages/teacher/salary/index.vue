<template>
    <div>
        <Table_detail></Table_detail>        
    </div>
</template>
<script>
import Table_detail from '~/pages/admin/salary/Table_detail.vue'
import { mapState } from 'vuex';
export default {
    layout: 'teacherNav',
    data() {
        return {
        }
    },
    components: {
        Table_detail

    },   
    computed: {
        ...mapState(['firstName', 'status']),
        // ...
    }, 
}
</script>
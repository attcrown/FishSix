<template>
    <div class="mx-15">
        <table_match></table_match>
        <table_active></table_active>
    </div>
</template>
<script>
import table_active from '~/pages/admin/matching/table_active.vue';
import table_match from '~/pages/admin/matching/table_match.vue';
export default {
    layout: 'teacherNav',
    data() {
        return {
        }
    },
    components: {
        table_active,
        table_match
    },    
}

</script>
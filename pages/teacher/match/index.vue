<template>
    <div class="mx-15">
        <table_match></table_match>
        <table_active></table_active>
    </div>
</template>
<script>
import table_active from './table_active.vue';
import table_match from './table_match.vue'
export default {
    layout: 'teacherNav',
    data() {
        return {
            firstName: 'ไม่มี',
            keyuser: 'ไม่มี',
        }
    },
    components: {
        table_active,
        table_match
    },    
}

</script>
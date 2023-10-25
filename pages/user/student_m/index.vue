<template>
    <div>
        <table_stu style="background-color:red"></table_stu>
    </div>
</template>
<script>
import table_stu from './table_stu.vue';
export default {
    layout:'userNav',
    data() {
        return {
            property: 'value',
        };
    },
    components: {
        table_stu
    }
}
</script>
<template>
    <div class="mx-15">
        <calendar></calendar>
        <table_tea></table_tea>
    </div>
</template>
<script>
import calendar from './calendar.vue';
import table_tea from './table_tea.vue';
    export default {
        layout: 'teacherNav',
        components:{
            calendar,
            table_tea
        }
    }
</script>
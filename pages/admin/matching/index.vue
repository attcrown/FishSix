<template>
    <div>
        <calendar hidden></calendar>
        <tablematch></tablematch>
        <tableactive></tableactive>
    </div>
</template>
    
<script>
import tablematch from './table_match.vue';
import calendar from './calendar.vue';
import tableactive from './table_active.vue';
export default {
    data() {
        return {

        }
    },

    components: {
        tablematch,
        calendar,
        tableactive
    },
    mounted() {
        this.fullName();
    },
    methods: {
        fullName() {
            if (localStorage.getItem('firstName') == null) {
                this.firstName = sessionStorage.getItem('firstName') || '';
                this.keyuser = sessionStorage.getItem('lastName') || '';
            } else {
                this.firstName = localStorage.getItem('firstName') || '';
                this.keyuser = localStorage.getItem('lastName') || '';
            }
        },
    },
}
</script>
    
<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>
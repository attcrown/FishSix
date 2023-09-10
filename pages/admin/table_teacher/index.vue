<template>
    <div class="mx-0">
        <calendar></calendar>
        <tabletea></tabletea>
    </div>
</template>
    
<script>
import tabletea from './table_tea.vue';
import calendar from './calendar.vue';
export default {
    data() {
        return {

        }
    },
    components: {
        tabletea,
        calendar,
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
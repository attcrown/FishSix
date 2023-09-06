<template>
    <div class="mx-16">        
        <tablematch></tablematch>
        <tableactive></tableactive>
    </div>
</template>
    
<script>
import tablematch from './table_match_test.vue';
import tableactive from './table_active_test.vue';
export default {
    data() {
        return {

        }
    },

    components: {
        tablematch,
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
<template>
    <div class="mx-15">        
        <tablematch class="mb-10"></tablematch>
        <tableactive></tableactive>
    </div>
</template>
    
<script>
import tablematch from './table_match.vue';
import tableactive from './table_active.vue';
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
        
    },
    methods: {
        
    },
}
</script>
    
<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>
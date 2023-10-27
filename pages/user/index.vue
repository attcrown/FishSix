<template>
    <div>
        <pageLoader v-if="isLoading"></pageLoader>
        <table_now></table_now>        
    </div>
</template>

<script>
import table_now from '../admin/table_now.vue';
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'userNav',
    data() {
        return {
            firstName: '',
            username: '',
            keyuser: '',
            totalHour: null,
            studyHour: null,
            hourLeft: null,
            isLoading: false,
        }
    },
    computed: {
        
    },
    components: {
        table_now,
        pageLoader
    },
    mounted() {
            
    },
    methods: {        
        
    
    },
}
</script>
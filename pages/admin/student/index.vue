<template>
    <div class="container">
        <div>
            <list class="mt-3"></list>
        </div>

    </div>
</template>
<script>
import register from './register.vue';
import list from './list.vue';

export default {
    layout: 'default',
    data() {
        return {
            //data here
        }
    },
    components:
    {
        register,
        list,

    },
    computed: {

    },
    mounted() {

    },
    methods: {

    },
}
</script>
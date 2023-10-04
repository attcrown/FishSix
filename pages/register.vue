<template>
    <div>
        <div class="mt-8 m-8 mx-8">
            <register></register>
        </div>        
    </div>
</template>
<script>
import register from './admin/teacher/register.vue';
export default {
    layout: 'register',
    data: () => ({

    }),
    components:{
        register
    }
}
</script>
<template>
    <div class="container">
        <div style="max-width: 500px;">
            <h1 class="font-weight-bold">ข้อมูลผู้สอน</h1>
        </div>
        <v-btn color="indigo"  to="/admin/register-teacher/register" router exact >เพิ่มผู้สอน</v-btn>

        <list></list>
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
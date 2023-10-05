<template>
    <div>
        <h1 style="font-size:32px"><b>Academic</b></h1>
        <pending></pending>
        <unapproved></unapproved>
    </div>
</template>
<script>
import pending from './pending.vue'
import unapproved from './unapproved.vue'
export default {
    data() {
        return {
            
        };
    },
    components:{
        pending,
        unapproved
    }
}
</script>
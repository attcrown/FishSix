<template>
    <div>
        <h1 style="font-size:32px"><b>ยืนยันครู</b></h1>
        <pending></pending>
        <unapproved class="mt-4"></unapproved>
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
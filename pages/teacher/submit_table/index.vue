<template>
    <div class="mx-6">
        <!-- <dashboard></dashboard> -->
        <card class="mx-7"></card>
    </div>
</template>
<script>
import card from './card.vue';
import dashboard from './dashboard.vue';
    export default {
        layout: 'teacherNav',
        components:{
            card,
            // dashboard
        }
    }
</script>
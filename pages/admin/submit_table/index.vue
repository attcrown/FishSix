<template>
    <div class="mx-15">
        <h3 style="font-size:32px"><b>เช็คชื่อ/ส่งพัฒนาการ</b></h3>
        <card></card>
        <card_controller></card_controller>
    </div>
</template>
    
<script>
import card from './card.vue';
import card_controller from './card_controller.vue';
export default {
    data() {
        return {

        }
    },

    components: {
        card,
        card_controller
    },
    created() {

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
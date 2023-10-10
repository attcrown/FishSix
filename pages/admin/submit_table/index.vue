<template>
    <div class="mx-0">
        <h3 style="font-size:32px"><b>เช็คชื่อ/ส่งพัฒนาการ</b></h3>
        <card></card>
        <card_controller></card_controller>
        <checkTeaController></checkTeaController>
        <checkStuController></checkStuController>
    </div>
</template>
    
<script>
import card from './card.vue';
import card_controller from './card_controller.vue';
import checkTeaController from './checkTeaController.vue';
import checkStuController from './checkStuController.vue';
export default {
    data() {
        return {

        }
    },

    components: {
        card,
        card_controller,
        checkTeaController,
        checkStuController
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
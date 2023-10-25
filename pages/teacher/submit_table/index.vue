<template>
    <div>        
        <card></card>
        <card_controller></card_controller>
        <checkTeaController></checkTeaController>
        <checkStuController></checkStuController>
    </div>
</template>
<script>
import card from '~/pages/admin/submit_table/card.vue';
import card_controller from '~/pages/admin/submit_table/card_controller.vue';
import checkTeaController from '~/pages/admin/submit_table/checkTeaController.vue';
import checkStuController from '~/pages/admin/submit_table/checkStuController.vue';
    export default {
        layout: 'teacherNav',
        components:{
            card,
            card_controller,    
            checkTeaController,
            checkStuController,
        }
    }
</script>
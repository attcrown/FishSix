<template>
    <div>
        <card_tea></card_tea>
    </div>
</template>
<script>
import card_tea from '~/pages/admin/ProfileTea/card_tea.vue'
export default {
    layout:"teacherNav",
    data() {
        return {
            property: 'value',
        };
    },
    components:{
        card_tea
    }
}
</script>
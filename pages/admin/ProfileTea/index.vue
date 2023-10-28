<template>
    <div>
        <p style="font-size: 24px;"><b>โปรไฟล์ครู</b></p> 
        <card_tea></card_tea>
    </div>
</template>
<script>
import card_tea from './card_tea.vue';
export default {
    data() {
        return {
            property: 'value',
        };
    },
    components: {
        card_tea
    },
}
</script>
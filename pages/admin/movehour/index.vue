<template>
    <div>
        <setting></setting>
        <menuder></menuder>
        <history></history>
    </div>
</template>
<script>
import menuder from './menu.vue'
import setting from './setting.vue';
import history from './history.vue';
export default {
    data() {
        return {
            
        };
    },
    components: {
        menuder,
        setting,
        history,
    },
}
</script>
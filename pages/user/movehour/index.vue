<template>
    <div>
        <setting></setting>
        <menuder></menuder>
        <history></history>
    </div>
</template>
<script>
import menuder from '~/pages/admin/movehour/menu.vue'
import setting from '~/pages/admin/movehour/setting.vue';
import history from '~/pages/admin/movehour/history.vue';
export default {
    layout:'userNav',
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
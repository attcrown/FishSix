<template>
    <div class="mx-15">
        <setting></setting>
        <h1>salary</h1>
        <Table_detail>></Table_detail>
    </div>
</template>
<script>
import setting from './setting.vue'
import Table_detail from './Table_detail.vue'
export default {
    layout: 'default',
    data() {
        return {
            
        }
    },
    components:
    {
        setting,
        Table_detail
    }
}
</script>
<template>
    <div class="mx-0">
        <setting :hidden="status == 'opFS'"></setting>
        <Table_detail>></Table_detail>
    </div>
</template>
<script>
import setting from './setting.vue'
import Table_detail from './Table_detail.vue'
import { mapState } from 'vuex';
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
    },
    computed: {
        ...mapState(['firstName', 'status']),
        // ...
    },
}
</script>
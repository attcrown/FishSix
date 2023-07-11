<template>
    <div style="background-color:rgba(227, 228, 227, 0.623)">
        <v-row class="mx-5 pt-5">
            <sub_ject></sub_ject>
            <v-col cols="12" sm="6">
                <tablesubject></tablesubject>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import tablesubject from './table_sub.vue';
import sub_ject from './sub.vue';
export default {
    data() {
        return {

        }
    },
    components: {
        tablesubject,
        sub_ject
    }
}
</script>
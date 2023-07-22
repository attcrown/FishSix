<template>
    <div style="background-color:rgba(227, 228, 227, 0.623)">
        <v-row class="mx-5 pt-5" style="background-color:green">
            <v-col cols="12" sm="12">
                <sub_ject></sub_ject>
            </v-col>
            <v-col cols="12" sm="12">
                <tablesubject></tablesubject>
            </v-col>
        </v-row>
        <v-row class="mx-5 pt-5 mt-10" style="background-color:rgb(3, 103, 184)">
            <v-col cols="12" sm="12">
                <input_location></input_location>
            </v-col>
            <v-col cols="12" sm="12">
                <table_location></table_location>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import tablesubject from './table_sub.vue';
import sub_ject from './sub.vue';
import input_location from './input_location.vue';
import table_location from './table_location.vue';
export default {
    data() {
        return {

        }
    },
    components: {
        tablesubject,
        sub_ject,
        input_location,
        table_location
    }
}
</script>
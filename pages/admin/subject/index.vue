<template>
    <div class="mx-0">
        <h3 style="font-size:32px"><b>รายวิชา</b></h3>
        <v-row class="pt-5">
            <v-col cols="12" sm="12">
                <sub_ject :hidden="status == 'opFS'"></sub_ject>
                <tablesubject style="margin-top: -5px;"></tablesubject>
            </v-col>
        </v-row>
        <h3 style="font-size:32px" class="mt-10"><b>สถานที่สอน</b></h3>
        <v-row class="pt-5">
            <v-col cols="12" sm="12">
                <input_location :hidden="status == 'opFS'"></input_location>
                <table_location style="margin-top: -5px;"></table_location>
            </v-col>
        </v-row>
        <!-- <h3 style="font-size:32px" class="mt-10"><b>Product</b></h3>
        <v-row class="pt-5">
            <v-col cols="12" sm="12">
                <product></product>
            </v-col>
        </v-row> -->
    </div> 
</template>
<script>
import tablesubject from './table_sub.vue';
import sub_ject from './sub.vue';
import input_location from './input_location.vue';
import table_location from './table_location.vue';
import product from './product.vue';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            
        }
    },
    components: {
        tablesubject,
        sub_ject,
        input_location,
        table_location,
        product
    },
    computed:{
        ...mapState(['firstName', 'status']),
    },
    methods:{
        
    }
}
</script>
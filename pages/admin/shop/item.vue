<template>
    <div style="background-color:rgb(172, 169, 169);">
        <v-sheet class="row d-flex justify-space-around" style="background-color:rgb(172, 169, 169);">
            <v-sheet class="col-md-3" style="background-color:rgb(172, 169, 169);" v-for="(item, index) in items" :key="index">
                <v-hover>
                    <template v-slot:default="{ hover }">
                        <v-card :elevation="hover ? 24 : 6" class="mx-auto pa-3">
                            <template slot="progress">
                                <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                            </template>
                            <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
                            <v-card-title>{{ item.title }}Cafe Badilico</v-card-title>
                            <v-card-text>
                                <v-row align="center" class="mx-0">
                                    <v-rating :value="4.5" color="amber" dense half-increments readonly
                                        size="14"></v-rating>
                                    <div class="grey--text ms-4 mb-3">
                                        4.5 (413)
                                    </div>
                                </v-row>
                                <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus
                                    patio seating.</div>
                            </v-card-text>

                            <v-divider class="mx-4 my-0"></v-divider>

                            <v-card-title>Tonight's availability</v-card-title>

                            <v-card-text>
                                <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
                                    <v-chip v-for="(bath, index) in item.bath" :key="index" :value="bath">
                                        {{ parseInt(bath) }}฿
                                    </v-chip>
                                </v-chip-group>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="amber darken-4" outlined @click="reserve, show(item)">
                                    เพิ่มใส่รถเข็น
                                </v-btn>
                                <v-btn color="light-green darken-4" outlined>
                                    ชำระเงิน
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-hover>
            </v-sheet>
        </v-sheet>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            loading: false,
            selection: [],
            items: [
                { title: 'Card 1', bath: ['150.21313', '300.123', '600.57567', '900.54645'] },
                { title: 'Card 2', bath: ['180.934534', '220.64564565', '330.45345', '440.4534534'] },
                { title: 'Card 1', bath: ['1530.34535', '3200.546456', '600.567567', '440.345345'] },
                { title: 'Card 2', bath: ['140.546456', '303.45355', '640.78989', '330.23242'] },
                { title: 'Card 2', bath: ['150.345435', '300.56675', '360.345345', '940.456456'] },
            ],
        };
    },
    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },

        show(item) {
            console.log(this.selection);
            console.log(item.bath ,item.title);
        },

    },
};
</script>
  
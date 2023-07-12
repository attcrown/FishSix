<template>
    <div>
        <v-row>

            <v-col cols="12" sm="6" md="6">
                <div class="text-center">
                    <v-progress-circular xl :rotate="270" :size="200" :width="15" :value="value" color="teal">
                        {{ value }}% Active
                    </v-progress-circular>

                    <v-progress-circular :rotate="270" :size="200" :width="15" :value="value_not" color="red">
                        {{ value_not }}% Not Active
                    </v-progress-circular>

                </div>
            </v-col>

            <v-col cols="12" sm="6" md="6" hidden>
                <v-card class="mx-auto text-center" color="green" dark max-width="600">
                    <v-card-text>
                        <v-sheet color="rgba(0, 0, 0, .12)">
                            <v-sparkline :value="value_green" color="rgba(255, 255, 255, .7)" height="100" padding="24"
                                stroke-linecap="round" :smooth="radius">
                                <template v-slot:label="item">
                                    ${{ item.value }}
                                </template>
                            </v-sparkline>
                        </v-sheet>
                    </v-card-text>
                    <v-card-text>
                        <div class="text-h4 font-weight-thin">
                            Sales Last 24h
                        </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="justify-center">
                        <v-btn block text>
                            Go to Report
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            active_sum: 0,
            not_active_sum: 0,
            interval: {},
            interval_not: {},
            value: 0,
            value_not: 0,
            value_green: [
                423,
                446,
                675,
                510,
                590,
                610,
                760,
            ],
            radius: 1,
        }
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    computed: {

    },
    mounted() {
        this.active();
    },    
    methods: {
        active() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).once("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            if (timedata.status == 'active') {
                                this.active_sum += 1;
                            }
                        }
                    }
                }
                setTimeout(() => {
                    this.not_active();
                }, 1000);                
            })
        },
        not_active() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).once("value", (snapshot) => {
                const childData = snapshot.val();
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            if (timedata.status == 'Not active') {
                                this.not_active_sum += 1;
                            }
                        }
                    }
                }
                setTimeout(() => {
                    this.sumset();
                }, 1000);                
            })
        },
        sumset() {
            let allactive = this.active_sum + this.not_active_sum;
            this.active_sum = parseInt((this.active_sum * 100 / allactive).toFixed(0));
            this.not_active_sum = parseInt((this.not_active_sum * 100 / allactive).toFixed(0));

            this.interval = setInterval(() => {
                if (this.value === this.active_sum) {
                    return; //(this.value = 0)
                }
                this.value += 1
            }, 50)
            this.interval_not = setInterval(() => {
                if (this.value_not === this.not_active_sum) {
                    return; //(this.value = 0)
                }
                this.value_not += 1
            }, 50)
        },
    },
}
</script>
    
<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>
<template>
    <div>
        <h1>table teacher</h1>
        <div class="container text-center">
            <v-card>
                <v-container fluid>
                    <v-row align="center">
                        <v-col cols="12">
                            <v-autocomplete v-model="value" :items="items" dense filled
                                label="Search teacher"></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <div>
                                <div class="subheading">
                                    <h3>ตารางผู้สอน</h3>
                                </div>
                                <v-date-picker v-model="date1" :events="arrayEvents" :allowed-dates="allowedDates"
                                    show-adjacent-months event-color="green lighten-1" @input="data()"
                                    full-width></v-date-picker>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({
        items: [],
        value: null,
        arrayEvents: null,
        date1: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }),
    mounted() {
        this.arrayEvents = [...Array(6)].map(() => {
            const day = Math.floor(Math.random() * 30)
            const d = new Date()
            d.setDate(day)
            console.log(d.toISOString().substr(0, 10));
            return d.toISOString().substr(0, 10)
        });
        this.search_teacher();

    },

    methods: {
        data() {
            console.log(this.value);
            console.log(this.date1);
            console.log();
        },
        allowedDates: val => {
            const currentDate = new Date();
            const selectedDate = new Date(val);
            return selectedDate >= currentDate;
        },
        search_teacher(){
            let item = [];
            const db = this.$fireModule.database();
            db.ref("user/").on("value", (snapshot) => {
                const childData = snapshot.val();
                for(const key in childData){
                    for(const status in childData[key]){
                        if(childData[key].status == 'teacher'){
                            console.log(childData[key].name);
                            item.push(childData[key].name);
                        }                        
                    }
                }
                this.items = item;
            })
            
        },

    },
}
</script>
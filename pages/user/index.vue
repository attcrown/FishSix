<template>
    <div>
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row>
            <v-col cols="12">
                <p class="text-h3 font-weight-bold">สวัสดี คุณ {{ firstName }} !</p>
            </v-col>
            <v-col cols="12">
                <v-card class="mt-2">
                    <v-card-title class="font-weight-bold header justify-center">ชั่วโมงเรียนที่เหลือ</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row>
                            <v-col class="text-h2 text-center" cols="4">
                                <span class=" font-weight-black text-black">0</span>
                                <span class="text-h6  font-semibold text-black">ชั่วโมง</span>
                                <div class="text-h6 font-semibold text-black">Flipclass online</div>
                            </v-col>
                            <v-col class="text-h2 text-center" cols="4">
                                <span class=" font-weight-black text-black">0</span>
                                <span class="text-h6  font-semibold text-black">ชั่วโมง</span>
                                <div class="text-h6 font-semibold text-black">Flipclass สาขา</div>
                            </v-col>
                            <v-col class="text-h2 text-center" cols="4">
                                <span class=" font-weight-black text-black">0</span>
                                <span class="text-h6  font-semibold text-black">ชั่วโมง</span>
                                <div class="text-h6 font-semibold text-black">Active class</div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12"><v-spacer></v-spacer></v-col>

            <v-col cols="12">
                <calendar></calendar>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import calendar from '@/pages/user/table/calendar.vue';
export default {
    layout: 'userNav',
    data() {
        return {
            firstName: '',
            keyuser: '',
            isLoading: true,
        }
    },
    computed: {

    },
    components: {
        calendar,
    },
    mounted() {
        this.fullName();
       
    },
    methods: {
        getout() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push("/login");
        },
        fullName() {
            if (localStorage.getItem('firstName') == null) {
                this.firstName = sessionStorage.getItem('firstName') || '';
                this.keyuser = sessionStorage.getItem('lastName') || '';
            } else {
                this.firstName = localStorage.getItem('firstName') || '';
                this.keyuser = localStorage.getItem('lastName') || '';
            }
           
        },
        save() {
            const db = this.$fireModule.database();
            db.ref(`user/${this.keyuser}`).update({
                // subject : this.save_detail.subject,
                // style_subject : this.save_detail.style,
                // start : this.picker_start,
                // stop : this.picker_stop,
            });
        },
    },
}
</script>
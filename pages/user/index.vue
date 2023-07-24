<template>
    <div>
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row  v-if="!isLoading">
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
                                <span class=" font-weight-black text-black">{{totalHour}}</span>
                                <span class="text-h6  font-semibold text-black">ชั่วโมง</span>
                                <div class="text-h6 font-semibold text-black">ชั่วโมงเรียนทั้งหมด</div>
                            </v-col>
                            <v-col class="text-h2 text-center" cols="4">
                                <span class=" font-weight-black text-black">{{studyHour}}</span>
                                <span class="text-h6  font-semibold text-black">ชั่วโมง</span>
                                <div class="text-h6 font-semibold text-black">ชั่วโมงที่เรียนไปแล้ว</div>
                            </v-col>
                            <v-col class="text-h2 text-center" cols="4">
                                <span class=" font-weight-black text-black">{{studyHour}}</span>
                                <span class="text-h6  font-semibold text-black">ชั่วโมง</span>
                                <div class="text-h6 font-semibold text-black">ชั่วโมงเรียนที่เหลือ</div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12"><v-spacer></v-spacer></v-col>

            <!-- <v-col cols="12">
                <calendar></calendar>
            </v-col> -->
        </v-row>
    </div>
</template>

<script>
import calendar from '@/pages/user/table/calendar.vue';
import pageLoader from '@/components/loader.vue';
export default {
    layout: 'userNav',
    data() {
        return {
            firstName: '',
            username: '',
            keyuser: '',
            totalHour: null,
            studyHour: null,
            hourLeft: null,
            isLoading: true,
        }
    },
    computed: {

    },
    components: {
        calendar,
        pageLoader
    },
    mounted() {
        this.fullName();
        this.readdata();
       
    },
    methods: {
        getout() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push("/login");
        },

        async readdata() {
            console.log('ทำงาน');
            const db = this.$fireModule.database();
            await db.ref(`user/${this.keyuser}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.profilePic = childData.profilePic || null;
                this.totalHour = childData.totalHour || 0;
                this.studyHour = childData.studyHour || 0;
                this.hourLeft = childData.hourLeft || 0;
                this.firstName = childData.firstName || null;
                this.lastName = childData.lastName || null;
                this.firstNameDisplay = childData.firstName || null;
                this.lastNameDisplay = childData.lastName || null;
                this.nicknameDisplay = childData.nickname || null;
                this.nickname = childData.nickname || null;
                this.school = childData.school || null;
                this.gender = childData.gender || null;
                this.birthDate = childData.birthDate || null;
                this.address = childData.address || null;
                this.education = childData.education || null;
                this.studentMobile = childData.studentMobile || null;
                this.parentMobile = childData.parentMobile || null;
                this.isLoading = false;

            })

        },
        fullName() {
            if (localStorage.getItem('firstName') == null) {
                this.username = sessionStorage.getItem('firstName') || '';
                this.keyuser = sessionStorage.getItem('lastName') || '';
            } else {
                this.username = localStorage.getItem('firstName') || '';
                this.keyuser = localStorage.getItem('lastName') || '';
            }
           
        },
    
    },
}
</script>
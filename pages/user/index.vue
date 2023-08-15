<template>
    <div>
        <pageLoader v-if="isLoading"></pageLoader>
        <v-row  v-if="!isLoading">
            <v-col cols="12">
                <p class="text-h3 font-weight-bold">สวัสดี  {{ firstName }} !</p>
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
        formattedTotalHour() {
            if (this.totalHour === null || this.totalHour === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.totalHour);
            const minutes = ((this.totalHour - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }


        },
        formattedStudyHour() {
            if (this.studyHour === null || this.studyHour === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.studyHour);
            const minutes = ((this.studyHour - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }
        },
        formattedHourLeft() {
            if (this.hourLeft === null || this.hourLeft === undefined) {
                return '0 ชั่วโมง';
            }

            const hours = Math.floor(this.hourLeft);
            const minutes = ((this.hourLeft - hours) * 60).toFixed(0);

            if (minutes === 0) {
                return `${hours} ชั่วโมง`;
            } else {
                return `${hours} ชั่วโมง ${minutes} นาที`;
            }
        },
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
                this.firstName = childData.firstName || null;
   
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
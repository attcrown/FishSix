<template>
    <v-row>
        <v-col>
            <h2>ข้อมูลนักเรียน</h2>
            <v-avatar :size=iconSize>
                <img :src=profilePics alt="John">
            </v-avatar>

            <strong>
                <div class="text-h5 mt-2">{{ firstName }} {{ keyuser }}</div>
            </strong>



        </v-col>
        <v-col></v-col>
    </v-row>
</template>


<script>
export default {
    layout: 'userNav',
    data() {
        return {
            profilePics: "https://cdn.vuetifyjs.com/images/john.jpg",
            iconSize: 100,
        }
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
    },
}
</script>
<template>
    <div class="container-fluid">
        <div class="col d-flex justify-content-center">
            <v-row align="center">
                <center>
                    <div style="max-width: 500px;">
                        <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                    </div>
                </center>
                <div class="text-center">
                    <v-col cols="12">
                        <div>
                            <v-avatar :size=iconSize>
                                <img :src=profilePics alt="John">
                            </v-avatar>
                        </div>
                    </v-col>
                </div>
                <div class="text-center">
                    <v-col cols="12">
                        <strong class="header">&nbsp;นาย อริน สลับสี{{ firstName }} {{ keyuser }}
                        </strong> <br>
                        <span class="userSpan">ผู้เรียน</span>
                    </v-col>
                </div>
                <v-col cols="12">
                    <v-card>
                        <v-card-title class="font-weight-bold header justify-center">ชั่วโมงเรียนเหลือ</v-card-title>
                        <v-card-text>
                            <v-row align="center">
                                <v-col class="text-h2 text-center" cols="4">
                                    23&deg;C
                                    <p>Fliped class</p>
                                </v-col>
                                <v-col class="text-h2 text-center" cols="4">
                                    23&deg;C
                                </v-col>
                                <v-col class="text-h2 text-center" cols="4">
                                    23&deg;C
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

        </div>
    </div>
</template>


<script>
export default {
    layout: 'userNav',
    data() {
        return {
            profilePics: "https://cdn.vuetifyjs.com/images/john.jpg",
            iconSize: 120,
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

<style>
.userSpan {
    background-color: rgb(243 244 246);
    color: #000000;
    border-radius: 12px;
    padding: 4px 10px 4px 10px;

}

.header {
    font-size: 25px;
}
</style>
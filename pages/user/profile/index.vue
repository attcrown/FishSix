<template>
    <div class="container-fluid">
        <div class="col d-flex justify-content-center">
            <v-row>
                <center>
                    <div style="max-width: 500px;">
                        <h1 class="font-weight-bold">ข้อมูลนักเรียน</h1>
                    </div>
                </center>

                <v-col cols="12">
                    <div class="text-center">
                        <div>
                            <v-avatar :size=iconSize>
                                <img :src=profilePics alt="John">
                            </v-avatar>
                        </div>
                    </div>
                </v-col>

                <v-col cols="12">
                    <div class="text-center">
                        <strong class="header">&nbsp;นาย {{ firstName }} {{ keyuser }}
                        </strong> <br>
                        <span class="userSpan">ผู้เรียน</span>
                    </div>
                </v-col>

                <v-col cols="6">
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
                <v-col cols="6">
                    <v-card class="mt-2">
                        <v-card-title class="font-weight-bold header justify-center">แก้ไขข้อมูลผู้ใช้</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field label="ชื่อ - นามสกุล" name="firstName"
                                        v-model="detail.firstName"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="ชื่อเล่น" name="nickname" v-model="detail.nickname"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="โรงเรียน" name="school" v-model="detail.school"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="เพศ" name="gender" v-model="detail.gender"></v-text-field>

                                </v-col>
                                <v-col cols="6">
                                    <v-text-field type="date" label="วันเกิด" name="birthDate"
                                        v-model="detail.birthDate"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-select label="ระดับชั้น" name="education" v-model="detail.education"
                                        :items="educationLevel" item-text="educationName"></v-select>
                                </v-col>

                                <v-col cols="12">
                                    <v-textarea name="address" label="ที่อยู่" v-model="detail.address"  rows="2"></v-textarea>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="เบอร์โทรศัพท์" name="studentMobile" v-model="detail.studentMobile"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field label="เบอร์โทรศัพท์ผู้ปกครอง" name="parentMobile" v-model="detail.parentMobile"></v-text-field>
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
            detail:
            {
                firstName: "อริน",
                lastname: "สลับสี",
                nickname: "ออโต้",
                gender: "ชาย",
                school: "Knoware",
                education: "ม.3",
                address: "สะพานลอย",
                studentMobile: "084311131",
                parentMobile: "122545455"

            },
            educationLevel:
                [
                    { id: 1, educationName: "ม.3" },
                    { id: 2, educationName: "ม.4" },
                    { id: 3, educationName: "ม.5" },
                    { id: 4, educationName: "ม.6" },
                ]
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
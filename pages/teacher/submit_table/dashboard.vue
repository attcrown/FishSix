<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-card-group class="d-flex pt-8 pb-8 fonts500">
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-8"
                            style="background: #2b8b0e;" height="159px" width="300px">
                            <v-row>
                                <v-col cols="auto" class="mr-auto">
                                    <img :src="require('~/assets/сolleagues discussing team project.png')"
                                        class="pt-5 ps-5">
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:white;">
                                    {{ dash_all }}
                                </v-col>
                                <v-col cols="auto" class="ml-auto me-7">
                                    <p style="font-size: 16px; margin-top: -50px; color:white">ผ่านการตรวจแล้ว
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-2"
                            style="background: #AD382F;" height="159px" width="300px">
                            <v-row>
                                <v-col cols="auto" class="mr-auto">
                                    <img :src="require('~/assets/сolleagues discussing team project.png')"
                                        class="pt-5 ps-5">
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:white;">
                                    {{ dash_noall }}
                                </v-col>
                                <v-col cols="auto" class="ml-auto me-7">
                                    <p style="font-size: 16px; margin-top: -50px; color:white">ไม่ผ่านการตรวจ
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-2"
                            style="background: #322E2B;" height="159px" width="300px">
                            <v-row>
                                <v-col cols="auto" class="mr-auto">
                                    <img :src="require('~/assets/young woman at work with laptop writing.png')"
                                        class="pt-5 ps-5">
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px;color:rgb(255, 6, 6);">
                                    {{ dash_active }}
                                </v-col>
                                <v-col cols="auto" class="ml-auto me-7">
                                    <p style="font-size: 16px; margin-top: -50px; color:white">
                                        ยังไม่ส่งพัฒนาการนักเรียน</p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                    <v-hover v-slot="{ hover }">
                        <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="rounded-5 ms-2"
                            style="background: #B6A7A2;" height="159px" width="300px">
                            <v-row>
                                <v-col cols="auto" class="mr-auto">
                                    <img :src="require('~/assets/сolleagues discussing team project.png')"
                                        class="pt-5 ps-5">
                                </v-col>
                                <v-col cols="auto" class="me-5" style="font-size:96px; color:rgb(155, 0, 0);">
                                    {{ dash_notactive }}
                                </v-col>
                                <v-col cols="auto" class="ml-auto me-7">
                                    <p style="font-size: 16px; margin-top: -50px; color:white">
                                        ยังไม่เช็คชื่อนักเรียน</p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-hover>
                </v-card-group>
            </v-col>
        </v-row>    

    </div>
</template>



<script>
export default {
    data: () => ({
        keyuser: null,
        dash_all: 0,
        dash_noall: 0,
        dash_active: 0,
        dash_notactive: 0,
    }),
    mounted() {
        this.fullName();
        this.search_date_teacher_All()
    },

    methods: {
        fullName() {
            if (localStorage.getItem('firstName') == null) {
                this.keyuser = sessionStorage.getItem('lastName') || '';
            } else {
                this.keyuser = localStorage.getItem('lastName') || '';
            }
            console.log(">>>>>", this.keyuser);
        },
        search_date_teacher_All() {
            console.log('ทำๆ');
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                let now = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        if (new Date(date).getTime().toString().substring(0, 5) <= now.getTime().toString().substring(0, 5)) {
                            const datedata = keydata[date];
                            for (const time in datedata) {
                                const timedata = datedata[time];
                                if (this.keyuser == timedata.teacher) {                                    
                                    const getSendplanPromise = db.ref(`send_plan/${timedata.teacher}/${timedata.Idsendplan}`).once("value");
                                    Promise.all([getSendplanPromise])
                                        .then((snapshots) => {                                            
                                            const sendplanSnapshot = snapshots[0];                                    
                                            const sendplanData = sendplanSnapshot.val();
                                            if (timedata.status === "พร้อมเรียน") { 
                                                if(sendplanData){
                                                    if(sendplanData.status_development == 'Approved'){
                                                        this.dash_all++;
                                                    }
                                                    if(sendplanData.status_development == 'Pending' || sendplanData.status_development == 'Rejected'){
                                                        this.dash_noall++;
                                                    }
                                                    if(sendplanData.homework != undefined){
                                                        this.dash_active++;
                                                    }
                                                }                                         
                                               if(!timedata.Idsendplan){
                                                    this.dash_notactive++;                                              
                                               }
                                               console.log(timedata,sendplanData);
                                            }                                            
                                        })
                                }
                            }
                        }
                    }
                }
            })
        },
    },
}
</script>


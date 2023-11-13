<template>
    <div>
        <v-autocomplete auto-select-first clearable v-model="selectitem" :items="Object.values(data_stu_copy)"
            :item-text="item => item.name + ' ' + item.firstName" :item-value="item => item"
            @input="check()"></v-autocomplete>
        <div>
            <p>{{ selectitem }}</p>
            <img v-if="selectitem" :src="selectitem.profilePic" alt="" srcset="" style="width: 300px;">
        </div>

        <v-form ref="form" v-model="valid" lazy-validation v-if="selectitem">
            <p>เดิม flip class {{ selectitem.hourLeft }}</p>
            <p>เดิม private class {{ selectitem.privateHourLeft }}</p>
            <div class="d-flex align-center">
                <v-text-field v-model="flipclass" :rules="nameRules" label="flipclass" type="number" required
                @input="summath()" class="me-5"></v-text-field>
                <v-icon class="text-h3">mdi-compare-horizontal</v-icon>
                <v-text-field v-model="privateclass" :rules="nameRules" label="privateclass" type="number"
                @input="summathprivate()" class="ms-5" required></v-text-field>
            </div>

            <!-- <div class="d-flex align-center">
                <v-text-field v-model="privateclass" :rules="nameRules" label="privateclass" class="me-5" type="number" required></v-text-field>
                <p> => </p>
                <v-text-field v-model="flipclass" label="flipclass" 
                 class="ms-5" readonly></v-text-field>
                
            </div> -->
            
            <p>ใหม่ flip class {{ newhourLeft }}</p>
            <p>ใหม่ private class {{ newprivateHourLeft }}</p>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                Validate
            </v-btn>
            <v-btn color="error" class="mr-4" @click="reset">
                Reset Form
            </v-btn>
        </v-form>

        <v-snackbar v-model="snackbar" :timeout="3000" tile :color="colorsnackbar">
            {{ textalret }}
            <template v-slot:action="{ attrs }">
                <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>

    </div>
</template>
<script>
export default {
    data() {
        return {
            data_setting: [],
            property: 'value',
            data_stu: [],
            data_stu_copy: [],
            selectitem: null,

            newhourLeft: 0,
            newprivateHourLeft: 0,

            valid: true,
            flipclass: 0,
            privateclass: 0,
            nameRules: [
                v => !!v || 'Null',
            ],

            textalret: 'Error',
            snackbar: false,
            colorsnackbar: " ",
        };
    },
    mounted() {
        this.search_stu();
        this.setting_rate();
    },
    methods: {
        async search_stu() {
            const db = this.$fireModule.database();
            const ref = db.ref("user");
            ref.orderByChild("status").equalTo("user").once("value")
                .then((snapshot) => {
                    let userData = snapshot.val();
                    for (const key in userData) {
                        let id = { idkey: key };
                        userData[key] = { ...userData[key], ...id };
                    }
                    this.data_stu = userData;
                    this.data_stu_copy = userData;
                    console.log(this.data_stu);
                })
                .catch((error) => {
                    console.error("เกิดข้อผิดพลาดในการค้นหาข้อมูล: ", error);
                });
        },
        setting_rate() {
            const db = this.$fireModule.database();
            db.ref(`setting_moveHour/-Nj5UsWpQDoZQxQAQrsU`).on("value", (snapshot) => {
                const childData = snapshot.val();
                let id = { idkey: "-Nj5UsWpQDoZQxQAQrsU" }
                this.data_setting = { ...childData, ...id };
            })
        },
        check() {
            console.log(this.selectitem);
            if (this.selectitem) {
                this.newhourLeft = parseInt(this.selectitem.hourLeft);
                this.newprivateHourLeft = parseInt(this.selectitem.privateHourLeft);
            } else {
                this.newhourLeft = 0;
                this.newprivateHourLeft = 0;
            }
        },
        validate() {
            if (this.$refs.form.validate()) {
                console.log('update', this.newhourLeft, this.newprivateHourLeft);
                if (this.newhourLeft < 0 || this.newprivateHourLeft < 0) {
                    this.snackbar = true;
                    this.textalret = 'ชั่วโมงไม่เพียงพอสำหรับการแลกชั่วโมง';
                    this.colorsnackbar = "red darken-4"
                    return;
                }else{
                    this.snackbar = true;
                    this.textalret = 'บันทึกสำเร็จ';
                    this.colorsnackbar = "light-green darken-2"
                }
            }
        },
        reset() {
            this.flipclass = 0;
            this.privateclass = 0;
        },
        summath() {
            this.newhourLeft = parseInt(this.selectitem.hourLeft) - parseInt(this.flipclass);

            this.privateclass = (parseInt(this.flipclass)) / parseInt(this.data_setting.flipclass) * parseInt(this.data_setting.privateclass);
            this.newprivateHourLeft = this.privateclass + parseInt(this.selectitem.privateHourLeft);
        },
        summathprivate() {
            this.newprivateHourLeft = parseInt(this.selectitem.privateHourLeft) - parseInt(this.privateclass);

            this.flipclass = parseInt(this.privateclass)/parseInt(this.data_setting.privateclass) * parseInt(this.data_setting.flipclass);
            this.newhourLeft = this.flipclass + parseInt(this.selectitem.hourLeft);
        },
    },
}
</script>
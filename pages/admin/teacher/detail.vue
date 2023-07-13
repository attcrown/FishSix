<template>
    <div class="container-fluid ">
        <pageLoader v-if="isLoading"></pageLoader>
        <div v-if="!isLoading" class="col mx-3 d-flex justify-content-center">
            <v-row>
                <div style="display: flex; justify-content: space-between;">
                    <h1 class="font-weight-bold">ข้อมูลครู</h1>
                    <v-btn to="/admin/teacher" router exact>กลับ</v-btn>
                </div>



                <v-col cols="12">
                    <v-card style="border-radius: 32px;background: #F5F5F5;" elevation="0" class="px-10">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="pl-2">ข้อมูลทั่วไป</div>
                            <div>
                                <button v-if="!isEditing" class="editButton elevation-0" @click="toEdit()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditing" class="editButton elevation-0" @click="toEdit()">
                                    <span style="color: #C3CAD9;font-size: 14px;">บันทึกข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                            </div>
                        </v-card-title>

                        <v-row class="mt-0" align="center">
                            <v-col cols="2" sm="2" class="pl-10">
                                <div>
                                    <v-avatar style="max-width: 116px; width: 100%; height: 100%;max-height: 116px;">
                                        <img :src="profilePic" alt="รูปโปรไฟล์">
                                    </v-avatar>
                                </div>
                            </v-col>
                            <v-col cols="10">
                                <v-row>
                                    <v-col cols="6" class="py-0">
                                        <v-text-field label="ชื่อ" name="firstName" v-model="firstName"
                                            :rules="firstNameRules" :readonly="!isEditing" required></v-text-field>
                                    </v-col>
                                    <v-col cols="6" class="py-0">
                                        <v-text-field label="ชื่อนามสกุล" name="lastName" v-model="lastName"
                                            :rules="lastnameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field label="ชื่อเล่น" name="nickname" v-model="nickname"
                                            :rules="nicknameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="5" class="py-0">

                                    </v-col>
                                    <v-col cols="4" class="py-0">
                                        <v-text-field label="เพศ" name="gender" v-model="gender"></v-text-field>
                                    </v-col>

                                </v-row>
                            </v-col>
                            <v-col cols="12">
                                <div class="text-center px-4 py-0">
                                    <hr class=" solid">
                                </div>

                            </v-col>
                            <v-row class="px-4">
                                <v-col cols="4" class="py-0">
                                    <v-text-field label="อาชีพปัจจุบัน" name="currJob" v-model="currJob"
                                        :readonly="!isEditing" required></v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field label="เบอร์" name="mobile" v-model="mobile" :rules="mobileRules"
                                        :readonly="!isEditing" required></v-text-field>
                                </v-col>
                                <v-col cols="4" class="py-0">
                                    <v-text-field label="อีเมลล์" name="email" v-model="email" :rules="emailRules"
                                        :readonly="!isEditing" required></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="เลขบัตรประชาชน" name="idCardNumber" v-model="idCardNumber"
                                        :rules="idCardRules" :counter="isEditing" :readonly="!isEditing"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <label>สำเนาบัตรประชาชน</label><br>
                                    <!-- <v-file-input label="อัพโหลดสำเนาบัตรประชาชน" v-model="idCardCopy" disabled
                                        accept=".pdf,image/*"></v-file-input> -->
                                    <a v-if="idCardCopy" href="" @click="downloadFile()"> View</a>
                                    <a v-if="!idCardCopy"> ไม่มี</a>
                                </v-col>

                            </v-row>

                        </v-row>

                    </v-card>
                    <v-card style="border-radius: 32px;background: #F5F5F5;" elevation="0" class="px-10 mt-7">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลที่อยู่</div>
                            <div>
                                <button v-if="!isEditing" class="editButton elevation-0" @click="toEdit()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditing" class="editButton elevation-0" @click="toEdit()">
                                    <span style="color: #C3CAD9;font-size: 14px;">บันทึกข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="addressForm">
                                <v-row>
                                    <p>&#x2022; ที่อยู่ตามบัตรประชาชน</p>
                                    <v-col cols="4">
                                        <v-text-field name="houseNo" label="บ้านเลขที่"
                                            v-model="address.houseNo"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="tambon" label="ตำบล/แขวง"
                                            v-model="address.tambon"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="amphoe" label="อำเภอ/เขต"
                                            v-model="address.amphoe"></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field name="province" label="จังหวัด" :rules="postalRules"
                                            v-model="address.province"></v-text-field>

                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field name="postal" label="รหัสไปรษณีย์" :rules="postalRules"
                                            v-model="address.postal"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <div class="text-center ">
                                            <hr class=" solid">
                                        </div>

                                    </v-col>
                                    <v-row class="px-4">
                                        <p class="py-0">&#x2022; ที่อยู่ปัจจุบัน <v-checkbox label="ที่อยู่ตามบัตรประชาชน "
                                                @click="updateCurrAddress()"></v-checkbox></p>

                                        <v-col cols="4">
                                            <v-text-field name="curr_houseNo" label="บ้านเลขที่"
                                                v-model="currAddress.houseNo"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field name="curr_tambon" label="ตำบล/แขวง"
                                                v-model="currAddress.tambon"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field name="curr_amphoe" label="อำเภอ/เขต"
                                                v-model="currAddress.amphoe"></v-text-field>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field name="curr_province" v-model="address.province"
                                                label="จังหวัด"></v-text-field>

                                        </v-col>
                                        <v-col cols="6">
                                            <v-text-field name="curr_postal" label="รหัสไปรษณีย์" :rules="postalRules"
                                                v-model="currAddress.postal"></v-text-field>
                                        </v-col>

                                    </v-row>
                                </v-row>


                            </v-form>
                        </v-card-text>

                    </v-card>

                    <v-card style="border-radius: 32px;background: #F5F5F5;" elevation="0" class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลสัญญาจ้าง</div>
                            <div>
                                <button v-if="!isEditing" class="editButton elevation-0" @click="toEdit()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditing" class="editButton elevation-0" @click="toEdit()">
                                    <span style="color: #C3CAD9;font-size: 14px;">บันทึกข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="contractFrom">
                                <v-row>

                                    <v-col cols="4">
                                        <v-text-field name="contract" label="สัญญาจ้าง" :readonly="!isEditing"
                                            v-model="contract"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="workType" label="ประเภทการทำงาน" :readonly="!isEditing"
                                            v-model="workType"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">

                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="startDate" label="วันที่เริ่มงาน" :readonly="!isEditing"
                                            v-model="startDate"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="rate" v-model="rate" :readonly="!isEditing"
                                            label="เรทค่าสอน/ชั่วโมง"></v-text-field>

                                    </v-col>


                                </v-row>


                            </v-form>
                        </v-card-text>

                    </v-card>
                    <v-card style="border-radius: 32px;background: #F5F5F5;" elevation="0" class="px-10 mt-5">
                        <v-card-title class="font-weight-bold header d-flex justify-space-between align-center ">
                            <div class="">ข้อมูลการศึกษา</div>
                            <div>
                                <button v-if="!isEditing" class="editButton elevation-0" @click="toEdit()">
                                    <span style="color: #C3CAD9;font-size: 14px;">แก้ไขข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                                <button v-if="isEditing" class="editButton elevation-0" @click="toEdit()">
                                    <span style="color: #C3CAD9;font-size: 14px;">บันทึกข้อมูล</span>
                                    <v-icon right color="#C3CAD9">mdi-pencil</v-icon>
                                </button>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-form ref="educationForm">
                                <v-row>

                                    <v-col cols="4">
                                        <v-text-field name="university" label="มหาวิทยาลัย" :readonly="!isEditing"
                                            v-model="university"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="faculty" label="คณะ" :readonly="!isEditing"
                                            v-model="faculty"></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field name="major" label="สาขา" :readonly="!isEditing"
                                            v-model="major"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <label>
                                            <span class="text-danger">*</span>
                                            <span>วิชาที่สอนได้</span>
                                        </label>
                                        <table class="table table-sm">
                                            <tbody>
                                                <tr v-for="subject in subjects" :key="subject.name">
                                                    <td>{{ subject.name }}</td>
                                                    <td v-for="(level, index) in subject.level" :key="index">
                                                        <input id="checkbox" type="checkbox"
                                                            :checked="isSelected(subject.name, level)" disabled />
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </v-col>



                                </v-row>


                            </v-form>
                        </v-card-text>

                    </v-card>
                </v-col>
            </v-row>

        </div>
        <!-- dialog -->

    </div>
</template>
  
<script>
import pageLoader from '@/components/loader.vue';

export default {

    data() {
        return {
            //status
            isLoading: true,
            teacherId: null,
            isEditing: false,

            //data
            profilePic: 'null',
            firstName: null,
            lastName: null,
            nickname: null,
            mobile: null,
            email: null,
            gender: null,
            currJob: null,
            address: {
                houseNo: null,
                tambon: null,
                amphoe: null,
                province: null,
                postal: null,
            },
            currAddress: {
                houseNo: null,
                tambon: null,
                amphoe: null,
                province: null,
                postal: null,
            },
            idCardNumber: null,
            idCardCopy: null,
            contract: null,
            workType: null,
            startDate: null,
            rate: null,
            university: null,
            faculty: null,
            major: null,
            subjects: [],
            selectedSubjects: {},
            //static
            genders: [
                'ชาย',
                'หญิง',
                'ไม่ระบุ',
                'ไม่มีเพศ',
                'อื่นๆ'
            ],

            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 10 characters',
            ],
            firstNameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 10 characters',
            ],
            lastnameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 10 characters',
            ],
            nicknameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 100) || 'Name must be less than 10 characters',
            ],
            postalRules: [
                value => !!value || 'กรุณากรอกรหัสไปรษณีย์',
                value => /^[\d]{5}$/.test(value) || 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง'
            ],
            idCardRules: [
                value => !!value || 'กรุณากรอก เบอร์โทรศัพท์',
                value => /^0\d{13}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            ],
            mobileRules: [
                value => !!value || 'กรุณากรอก เบอร์โทรศัพท์',
                value => /^0\d{9}$/.test(value) || 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            ],
            emailRules: [
                value => !!value || 'กรุณากรอก อีเมล',
                value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'รูปแบบอีเมลไม่ถูกต้อง'
            ],

        }

    },
    components: {
        pageLoader
    },
    mounted() {
        const value = this.$route.query.teacherId;
        this.teacherId = value;
        this.readdata();
        this.readSubject();

    },

    computed: {

    },


    methods: {

        toEdit() {

            if (this.isEditing == true) {
                this.isEditing = false;
            }
            else {
                this.isEditing = true;
            }
        },
        downloadFile() {
            window.open(this.idCardCopy, '_blank');
        },
        async readdata() {
            console.log('ทำงาน');
            const db = this.$fireModule.database();
            await db.ref(`user/${this.teacherId}`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.profilePic = childData.profilePic || 'https://cdn.vuetifyjs.com/images/john.jpg';
                this.firstName = childData.firstName || null;
                this.lastName = childData.lastName || null;
                this.nickname = childData.nickname || null;
                this.mobile = childData.mobile || null;
                this.email = childData.email || null;
                this.gender = childData.gender || null;
                this.currJob = childData.currJob || null;
                this.address.houseNo = childData.address.houseNo || null;
                this.address.tambon = childData.address.tambon || null;
                this.address.amphoe = childData.address.amphoe || null;
                this.address.province = childData.address.province || null;
                this.address.postal = childData.address.postal || null;
                this.currAddress.houseNo = childData.address.houseNo || null;
                this.currAddress.tambon = childData.address.tambon || null;
                this.currAddress.amphoe = childData.address.amphoe || null;
                this.currAddress.province = childData.address.province || null;
                this.currAddress.postal = childData.address.postal || null;
                this.idCardNumber = childData.idCardNumber || null;
                this.idCardCopy = childData.idCardCopy || null;
                this.contract = childData.contract || null;
                this.workType = childData.workType || null;
                this.startDate = childData.startDate || null;
                this.rate = childData.rate;
                this.university = childData.university || null;
                this.faculty = childData.faculty || null;
                this.major = childData.major || null;
                this.selectedSubjects = childData.subject_all || null,
                    console.log(childData.subject_all);

                this.isLoading = false;
            })

        },

        isSelected() {
            return (subjectName, leveled) => {
                return this.selectedSubjects.some(
                    
                    (subject) =>

                        subject.name === subjectName && subject.level.includes(leveled)
                );
            };
        },


        async readSubject() {
            const db = this.$fireModule.database();
            await db.ref(`subject_all/`).on("value", (snapshot) => {
                const childData = snapshot.val();
                this.subjects = [];
                let items = [];
                let subjectName = '';
                let levelData = '';


                for (const key in childData) {

                    db.ref(`subject_all/${key}`).on("value", (snapshot) => {
                        const childData = snapshot.val();
                        subjectName = childData.name;

                    })
                    db.ref(`subject_all/${key}/level`).on("value", (snapshot) => {
                        const childData = snapshot.val();
                        levelData = childData;
                        //console.log(levelData)
                    })
                    const item = {
                        key: key,
                        level: levelData,
                        name: subjectName
                    };

                    items.push(item);
                }
                this.subjects = items;
                this.isLoading = false;

            })

        },

    },

};
</script>
  
<style scoped>
.editButton {
    display: flex;
    padding: 0px 12px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    border-radius: 10px;
    border: 1px solid var(--brown-1, #322E2B);
    background: var(--brown-1, #322E2B);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

hr.solid {
    border-top: 3px solid black;
    border-width: 3px;
    opacity: 1;
}
</style> 
  
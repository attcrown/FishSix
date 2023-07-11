<template>
    <div class="container-fluid">
        <v-btn to="/admin/register-teacher/" router exact>กลับ</v-btn>

        <v-row>
            <div class="col-sm-12">
                <div class="d-flex justify-center align-center">
                    <v-card class="pa-1 text-center rounded-5 m-2" style="background: #F5F6F7 ;">
                        <v-card-title> เพิ่มรายละเอียดของผู้สอน</v-card-title>
                        <v-divider></v-divider>
                        <form ref="registerForm">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="name" :error-messages="nameErrors" counter label="Username"
                                        required @input="$v.name.$touch()" @blur="$v.name.$touch()">
                                        <template v-slot:append>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                                </template>
                                                <span>ควรตั้งชื่อเป็นชื่อจริงภาษาอังกฤษ1234
                                                    <br>โดยเป็นตัวพิมพ์ใหญ่ทั้งหมด</span>
                                            </v-tooltip>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="password" :error-messages="passErrors" :counter="20"
                                        label="รหัสผ่าน" required @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()">
                                        <template v-slot:append>
                                            <v-tooltip bottom>
                                                <template v-slot:activator="{ on }">
                                                    <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                                                </template>
                                                <span>ควรตั้งชื่อเป็นชื่อจริงภาษาอังกฤษ1234
                                                    <br>โดยเป็นตัวพิมพ์เล็กทั้งหมด</span>
                                            </v-tooltip>
                                        </template>
                                    </v-text-field>

                                </v-col>

                                <v-col cols="4">
                                    <v-text-field name="firstName" v-model="firstName" label="ชื่อ"
                                        :error-messages="firstNameErrors" required @input="$v.firstName.$touch()"
                                        @blur="$v.firstName.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="lastName" v-model="lastName" :error-messages="lastNameErrors"
                                        label="นามสกุล" required @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="4">
                                    <v-text-field name="nickname" v-model="nickname" label="ชื่อเล่น">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="email" :error-messages="emailErrors" label="Email" required
                                        @input="$v.email.$touch()" @blur="$v.email.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4"> <v-text-field v-model="mobile" :error-messages="mobileErrors"
                                        label="เบอร์โทรศัพท์" required @input="$v.mobile.$touch()" counter
                                        @blur="$v.mobile.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-select v-model="gender" :items="genders" label="เพศ"></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="currJob" label="อาชีพปัจจุบัน">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="idCardNumber" :error-messages="idCardNumberErrors" counter
                                        label="หมายเลขบัตรประชาชน" required @input="$v.idCardNumber.$touch()"
                                        @blur="$v.idCardNumber.$touch()">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-file-input label="อัพโหลดสำเนาบัตรประชาชน" v-model="idCardCopy"
                                        accept=".pdf,image/*"></v-file-input>
                                </v-col>

                                <v-col cols="12" class="text-left">
                                    <v-divider></v-divider>
                                    ที่อยู่ตามบัตรประชาชน

                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="houseNo" label="บ้านเลขที่"
                                        v-model="address.houseNo"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="tambon" label="ตำบล/แขวง" v-model="address.tambon"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field name="amphoe" label="อำเภอ/เขต" v-model="address.amphoe"></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-autocomplete name="province" v-model="address.province" :items="provinceOptions"
                                        autocomplete label="จังหวัด"></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field name="postal" label="รหัสไปรษณีย์" required :rules="postalRules"
                                        v-model="address.postal"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="text-left"><v-divider></v-divider>
                                    ที่อยู่ปัจจุบัน
                                    <v-checkbox label="ที่อยู่ตามบัตรประชาชน " @click="updateCurrAddress()"></v-checkbox>
                                </v-col>
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
                                    <v-autocomplete name="curr_province" v-model="currAddress.province"
                                        :items="provinceOptions" autocomplete label="จังหวัด"></v-autocomplete>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field name="curr_postal" label="รหัสไปรษณีย์" required :rules="postalRules"
                                        v-model="currAddress.postal"></v-text-field>
                                </v-col>

                                <v-col cols="12" class="text-left">
                                    <v-divider></v-divider>
                                    ข้อมูลการจ้างงาน
                                </v-col>
                                <v-col cols="4">
                                    <v-select v-model="contract" :items="contracts" label="สัญญาจ้าง"
                                        :error-messages="contractErrors" @change="$v.contract.$touch()"
                                        @blur="$v.contract.$touch()" required></v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-select v-model="workType" :items="workTypes" label="ประเภทการทำงาน"
                                        :error-messages="workTypeErrors" @change="$v.workType.$touch()"
                                        @blur="$v.workType.$touch()" required></v-select>
                                </v-col>
                                <v-col cols="4">

                                </v-col>
                                <v-col cols="4">
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                        transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="startDate" label="วันที่เริ่มงาน" name="startDate"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs" :rules="startDateRules"
                                                required v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="startDate" :active-picker.sync="activePicker"
                                            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                                            min="1950-01-01" @change="save"></v-date-picker>
                                    </v-menu>

                                </v-col>
                                <v-col cols="3">
                                    <v-text-field name="rate" type="number" label="เรทค่าสอน/ชั่วโมง" min="0" max="99999"
                                        maxlength="5" oninput="validity.valid||(value='');" :error-messages="rateErrors"
                                        @change="$v.rate.$touch()" @blur="$v.rate.$touch()" v-model="rate"></v-text-field>
                                </v-col>

                                <v-col cols="12" class="text-left">
                                    <v-divider></v-divider>
                                    ข้อมูลการศึกษา
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field name="university" label="มหาวิทยาลัย" v-model="university"></v-text-field>
                                </v-col>

                                <v-col cols="3">
                                    <v-text-field name="faculty" label="คณะ" v-model="faculty"></v-text-field>
                                </v-col>

                                <v-col cols="3">
                                    <v-text-field name="major" label="สาขา" v-model="major"></v-text-field>
                                </v-col>

                                <div class="col-md-12">
                                    <label>
                                        <span class="text-danger">*</span>
                                        <span>วิชาที่สอนได้</span>
                                    </label>
                                    <table class="table table-sm">
                                        <tbody>
                                            <tr v-for="subject in subjects">
                                                <td> {{ subject.name }}</td>
                                                <td v-for="(level, index) in subject.level" :key="index">
                                                    <v-checkbox class="m-0"
                                                        @click="updateSelectedSubjects(level, subject.name)"
                                                        :label="level"></v-checkbox>
                                                </td>

                                            </tr>

                                        </tbody>
                                    </table>


                                </div>

                            </v-row>
                            <!-- <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="Confirm " required
                                @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox> -->

                            <v-btn class="me-4" color="green darken-3" @click="submit">
                                <v-icon class="me-3">mdi-content-save-settings-outline</v-icon>
                                submit
                            </v-btn>
                            <!-- <v-btn color="deep-orange darken-4" @click="clear">
                                <v-icon class="me-3">mdi-backspace-reverse</v-icon> clear
                            </v-btn> -->
                        </form>

                    </v-card>
                </div>

            </div>
        </v-row>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email, numeric } from 'vuelidate/lib/validators'

export default {
    layout: 'default',
    data() {
        return {
            activePicker: null,
            date: null,
            menu: false,
            isLoading: true,
            //register field
            status: "teacher",
            name: null,
            password: null,
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
            selectedSubjects: [],
        
            //rules
            postalRules: [
                value => !!value || 'กรุณากรอกรหัสไปรษณีย์',
                value => /^[\d]{5}$/.test(value) || 'รูปแบบรหัสไปรษณีย์ไม่ถูกต้อง'
            ],
            startDateRules: [
                value => !!value || 'กรุณาเลือกวันที่เริ่มทำงาน',

            ],
            // static
            genders: [
                'ชาย',
                'หญิง',
                'ไม่ระบุ',
                'ไม่มีเพศ',
                'อื่นๆ'
            ],
            contracts: [
                'พนักงานประจำ',
                'ครูสาขา',
                'ครูออนไลน์',

            ],
            workTypes: [
                'Full Time',
                'Part Time',
            ],

            subjects: [],
            provinceOptions: [
                'กระบี่',
                'กรุงเทพมหานคร',
                'กาญจนบุรี',
                'กาฬสินธุ์',
                'กำแพงเพชร',
                'ขอนแก่น',
                'จันทบุรี',
                'ฉะเชิงเทรา',
                'ชลบุรี',
                'ชัยนาท',
                'ชัยภูมิ',
                'ชุมพร',
                'เชียงราย',
                'เชียงใหม่',
                'ตรัง',
                'ตราด',
                'ตาก',
                'นครนายก',
                'นครปฐม',
                'นครพนม',
                'นครราชสีมา',
                'นครศรีธรรมราช',
                'นครสวรรค์',
                'นนทบุรี',
                'นราธิวาส',
                'น่าน',
                'บึงกาฬ',
                'บุรีรัมย์',
                'ปทุมธานี',
                'ประจวบคีรีขันธ์',
                'ปราจีนบุรี',
                'ปัตตานี',
                'พระนครศรีอยุธยา',
                'พะเยา',
                'พังงา',
                'พัทลุง',
                'พิจิตร',
                'พิษณุโลก',
                'เพชรบุรี',
                'เพชรบูรณ์',
                'แพร่',
                'พะเยา',
                'ภูเก็ต',
                'มหาสารคาม',
                'มุกดาหาร',
                'แม่ฮ่องสอน',
                'ยะลา',
                'ยโสธร',
                'ร้อยเอ็ด',
                'ระนอง',
                'ระยอง',
                'ราชบุรี',
                'ลพบุรี',
                'ลำปาง',
                'ลำพูน',
                'เลย',
                'ศรีสะเกษ',
                'สกลนคร',
                'สงขลา',
                'สตูล',
                'สมุทรปราการ',
                'สมุทรสงคราม',
                'สมุทรสาคร',
                'สระแก้ว',
                'สระบุรี',
                'สิงห์บุรี',
                'สุโขทัย',
                'สุพรรณบุรี',
                'สุราษฎร์ธานี',
                'สุรินทร์',
                'หนองคาย',
                'หนองบัวลำภู',
                'อ่างทอง',
                'อำนาจเจริญ',
                'อุดรธานี',
                'อุตรดิตถ์',
                'อุทัยธานี',
                'อุบลราชธานี',
                'อ่างทอง'
            ],
        }
    },
    mixins: [validationMixin],
    validations: {
        name: { required, minLength: minLength(6) },
        password: { required, maxLength: maxLength(20), minLength: minLength(6) },
        firstName: { required },
        lastName: { required },
        email: { required, email },
        mobile: { required, minLength: minLength(9), numeric },
        idCardNumber: { required, minLength: minLength(13), maxLength: maxLength(13), numeric },
        postal: { required, numeric },
        contract: { required },
        workType: { required },
        startDate: { required },
        rate: { required },


        checkbox: {
            checked(val) {
                return val
            },
        },
    },
    computed: {
        nameErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.minLength &&
                errors.push('Username ต้องมีอย่างน้อย 6 ตัวอักษร')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },

        passErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            if (!this.$v.password.maxLength) {
                errors.push('Password ต้องไม่เกิน 20 ตัวอักษร')
            }
            if (!this.$v.password.minLength) {
                errors.push('Password ต้องมีอย่างน้อย 6 ตัวอักษร')
            }
            if (!this.$v.password.required) {
                errors.push('กรุณากรอกรหัสผ่าน')
            }
            return errors
        },

        firstNameErrors() {
            const errors = []
            if (!this.$v.firstName.$dirty) return errors
            !this.$v.firstName.required && errors.push('กรุณาระบุชื่อผู้สอน')
            return errors
        },

        lastNameErrors() {
            const errors = []
            if (!this.$v.lastName.$dirty) return errors
            !this.$v.lastName.required && errors.push('กรุณาระบุนามสกุล')
            return errors
        },

        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        mobileErrors() {
            const errors = []
            if (!this.$v.mobile.$dirty) return errors
            !this.$v.mobile.numeric && errors.push('กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข')
            !this.$v.mobile.minLength && errors.push('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง')
            !this.$v.mobile.required && errors.push('กรุณากรอกเบอร์โทรศัพท์')
            return errors
        },
        idCardNumberErrors() {
            const errors = []
            if (!this.$v.idCardNumber.$dirty) return errors
            !this.$v.idCardNumber.numeric && errors.push('กรุณากรอกหมายเลขบัตรประชาชนเป็นตัวเลข')
            !this.$v.idCardNumber.minLength && errors.push('กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง')
            !this.$v.idCardNumber.maxLength && errors.push('กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง')
            !this.$v.idCardNumber.required && errors.push('กรุณากรอกหมายเลขบัตรประชาชน')
            return errors
        },
        contractErrors() {
            const errors = []
            if (!this.$v.contract.$dirty) return errors
            !this.$v.contract.required && errors.push('กรุณาเลือกประเภทสัญญาจ้าง')
            return errors
        },
        workTypeErrors() {
            const errors = []
            if (!this.$v.workType.$dirty) return errors
            !this.$v.workType.required && errors.push('กรุณาเลือกประเภทการทำงาน')
            return errors
        },
        rateErrors() {
            const errors = []
            if (!this.$v.rate.$dirty) return errors
            !this.$v.rate.required && errors.push('กรุณากรอกเรทค่าจ้างต่อชั่วโมง')
            return errors
        },

    },
    mounted() {
        this.readdata();
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'Month'))
        },
    },
    methods: {
        updateCurrAddress() {
            if (this.address) {
                this.currAddress = { ...this.address };
            } else {
                this.currAddress = null;
            }
        },
        updateSelectedSubjects(level, name) {
            const index = this.selectedSubjects.findIndex(s => s.name === name);
    
            if (index === -1) {
                this.selectedSubjects.push({ name, level: [level] });
               
            } else {

                const subject = this.selectedSubjects[index];
                const levelIndex = subject.level.indexOf(level);

                if (levelIndex === -1) {

                    subject.level.push(level);
                } else {

                    subject.level.splice(levelIndex, 1);
                }

                if (subject.level.length === 0) {
                    this.selectedSubjects.splice(index, 1);
                }
            }
          
        },


        save(date) {
            this.$refs.menu.save(date)
        },

        submit() {
            this.$v.$touch()
       
          
            if (this.emailErrors.length == 0 && this.passErrors.length == 0
                && this.firstNameErrors == 0 && this.lastNameErrors == 0
                && this.nameErrors.length == 0 && this.mobileErrors.length == 0
                && this.idCardNumberErrors.length == 0 && this.contractErrors.length == 0
                && this.workTypeErrors.length == 0 && this.rateErrors.length == 0) {
                console.log("Save");
                this.registerTeacher();
            } else { console.log("errors save"); }
        },

        async registerTeacher() {
            const db = this.$fireModule.database();
            if (this.idCardCopy) {
                const storageRef = this.$fireModule.storage().ref();
                const userRef = storageRef.child(`user/${this.encode(this.name)}/idCardCopy.jpg`);
                try {
                    const snapshot = await userRef.put(this.idCardCopy);
                    const downloadURL = await snapshot.ref.getDownloadURL();

                    await db.ref(`user/${this.keyuser}`).update({
                        idCardCopy: downloadURL,
                    });
                } catch (error) {
                    this.openSnackbar("error", 'เกิดข้อผิดพลาดในการอัพโหลดรูป!');
                }
            }
            
            await db.ref(`user/${this.encode(this.name)}/`).set({
                status: this.status,
                name: this.name,
                password: this.password,
                firstName: this.firstName,
                lastName: this.lastName,
                nickname: this.nickname,
                mobile: this.mobile,
                email: this.email,
                gender: this.gender,
                currJob: this.currJob,
                address: this.address,
                currAddress: this.currAddress,
                idCardNumber: this.idCardNumber,
                idCardCopy: this.idCardCopy,
                contract: this.contract,
                workType: this.workType,
                startDate: this.startDate,
                rate: this.rate,
                university: this.university,
                faculty: this.faculty,
                major: this.major,
            })

            for (let subject of this.selectedSubjects) {
                let key_items =  Math.floor(Math.random() * 10000001);
                await db.ref(`user/${this.encode(this.name)}/subject_all/${key_items}`).set({
                    name: subject.name,
                level: subject.level,
                
            })
        }

        },

        encode(a) {
            const encodedData = btoa(encodeURIComponent(a))
            return encodedData;
        },

        async readdata() {
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
                        //console.log(subjectName)                     
                    })
                    db.ref(`subject_all/${key}/level`).on("value", (snapshot) => {
                        const childData = snapshot.val();
                        levelData = childData;
                        //console.log(levelData)
                    })
                    const item = {
                        level: levelData,
                        name: subjectName
                    };
                    //console.log(item)
                    items.push(item);
                }
                this.subjects = items;
                console.log(this.subjects)

            })

        },

    },
}
</script>
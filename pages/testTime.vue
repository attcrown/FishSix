<template>
    <div>
        <h1> Test Time DTAT</h1>
        <div style="background-color:white" class="container">
            Testtt
            <template>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="date" label="Picker in dialog" prepend-icon="mdi-calendar" readonly
                                    v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">
                                    Cancel
                                </v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                </v-row>
            </template>
            <template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="All_data.IDstu" :counter="10" :rules="nameRules" label="STU"
                        required></v-text-field>

                    <v-text-field v-model="All_data.Tea" :rules="nameRules" label="Teacher" required></v-text-field>

                    <v-col cols="12" sm="6">
                        <v-select :items="time_standart" v-model="picker_start" label="เริ่มเรียน"
                            @change="validateTime(), picker_stop = null" :rules="[v => !!v || 'กรุณาเลือก']"
                            required></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select :items="time_standart_stop" v-model="picker_stop" @change="validateTime()"
                            label="เลิกเรียน" :rules="[v => !!v || 'กรุณาเลือก']" required></v-select>
                    </v-col>

                    <v-select v-model="All_data.select" :items="LimitedClass_all" item-value="key" item-text="name"
                        :rules="[v => !!v || 'Item is required']" label="Item" required></v-select>

                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                        Validate
                    </v-btn>

                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate_del">
                        Validate_del
                    </v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">
                        Reset Form
                    </v-btn>

                    <v-btn color="warning" @click="resetValidation">
                        Reset Validation
                    </v-btn>
                </v-form>
            </template>
        </div>

    </div>
</template>
<script>
export default {
    layout: 'login',
    data: () => ({
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        modal: false,

        valid: true,
        name: '',
        All_data: [],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
            'Flip Class',
            'Private',
        ],
        LimitedClass_all: [],
        time_standart: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
            , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
            , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
            , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
            , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
            , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
            , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
        time_full: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00"
            , "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30"
            , "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00"
            , "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"
            , "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
            , "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
            , "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
        time_standart_stop: [],
        time_standart_sum: [],
        picker_start: null,
        picker_stop: null,
    }),
    mounted() {
        this.LimitedClass_search();
    },
    methods: {
        LimitedClass_search() {
            const db = this.$fireModule.database();
            db.ref(`LimitedClass_all/`).once("value", (snapshot) => {
                let item = [];
                const childData = snapshot.val();
                for (const key in childData) {
                    item.push({ key: key, name: childData[key].name, bath: childData[key].bath || '0' });
                }
                this.LimitedClass_all = item;
                console.log(this.LimitedClass_all);
            })
        },
        validateTime() {
            if (true) {
                this.time_standart_stop = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (this.picker_start == this.time_standart[key] || (sum != 0)) {
                        sum++;
                        if (sum > 1) {
                            this.time_standart_stop.push(this.time_standart[key]);
                        }
                    }
                }
            } if (this.picker_stop != null && this.picker_start != null) {
                this.time_standart_sum = [];
                let sum = 0;
                for (const key in this.time_standart) {
                    if (this.picker_stop == this.time_standart[key]) {
                        sum = 0;
                        // this.time_standart_sum.push(this.time_standart[key]);
                        break;
                    }
                    else if (this.picker_start == this.time_standart[key] || (sum != 0)) {
                        sum++;
                        this.time_standart_sum.push(this.time_standart[key]);
                    }
                }
            }
            console.log(this.time_standart_sum);
        },
        validate() {
            if (this.$refs.form.validate()) {
                console.log('บันทึกผ่าน', this.All_data);
                this.save_time();
            }
        },
        validate_del() {
            if (this.$refs.form.validate()) {
                console.log('บันทึกผ่าน', this.All_data);
                this.deleteAndReorder();
            }
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },

        async save_time() {
            const db = this.$fireModule.database();
            this.All_data.time = this.time_standart_sum;
            const selectedObject = this.LimitedClass_all.find(item => item.key === this.All_data.select);
            console.log('Selected item:', selectedObject);
            const data = this.All_data;
            let text = '';
            let textadd = '';
            let isSave = 0;
            let maxKeyOut = 0;

            for (const key in data.time) {
                await db.ref(`test_time/${data.Tea}/${this.date}/${data.time[key]}/`).orderByValue().equalTo(data.IDstu).once("value")
                    .then(snapshot => {
                        if (snapshot.exists()) {
                            textadd = textadd.concat(' ', data.time[key])
                            isSave++;
                        }
                        else {
                            return db.ref(`test_time/${data.Tea}/${this.date}/${data.time[key]}/`).once("value");
                        }

                        if (data.time.length == parseInt(key) + 1 && textadd.length != 0) {
                            alert('จองไปแล้ว ซ้ำ' + textadd);
                        }
                    })
                    .then(snapshot => {
                        if (snapshot) {
                            let maxKey = 0;
                            snapshot.forEach(childSnapshot => {
                                const childKey = parseInt(childSnapshot.key);
                                if (childKey >= maxKey) {
                                    maxKey = childKey + 1;
                                    maxKeyOut = maxKey;
                                }
                            });
                            if (maxKey >= selectedObject.bath) {
                                text = text.concat(" ", data.time[key]);
                                isSave++;
                            }
                            if (data.time.length == parseInt(key) + 1 && text.length != 0) {
                                alert('เต็มแล้ว' + text);
                            }
                            if (maxKey < selectedObject.bath && data.time.length == parseInt(key) + 1) {
                                console.log('send save');
                            }
                            console.log('WorkData', maxKey, selectedObject.bath, data.time.length, parseInt(key) + 1, isSave);
                            console.log('>>>>>>', textadd.length);
                        }
                    });
            }
            if (isSave == 0) {
                console.log('save success');
                for (const key in data.time) {
                    const snapshot = await db.ref(`test_time/${data.Tea}/${this.date}/${data.time[key]}/`).once("value");
                    if (selectedObject.key == '-NcQsHB9vgG53lJKPA-i') {
                        for (let x = 0; x < this.LimitedClass_all[0].bath; x++) {
                            await db.ref(`test_time/${data.Tea}/${this.date}/${data.time[key]}/`).update({
                                [x]: data.IDstu
                            });
                        }
                    } else if (selectedObject.key == '-NcQsFxCcoNS-uwmKUqE') {
                        if (snapshot) {
                            let maxKey = 0;
                            snapshot.forEach(childSnapshot => {
                                const childKey = parseInt(childSnapshot.key);
                                if (childKey >= maxKey) {
                                    maxKey = childKey + 1;
                                }
                            });
                            await db.ref(`test_time/${data.Tea}/${this.date}/${data.time[key]}/`).update({
                                [maxKey]: data.IDstu
                            });
                        } else {
                            await db.ref(`test_time/${data.Tea}/${this.date}/${data.time[key]}/`).update({
                                [maxKeyOut]: data.IDstu
                            });
                        }
                    }
                }
            }
        },


        deleteAndReorder() {
            const db = this.$fireModule.database();
            this.All_data.time = this.time_standart_sum;
            const data = this.All_data;
            // ลบข้อมูลออกจากพาท
            for (const key in data.time) {
                db.ref(`test_time/${data.Tea}/${this.date}/${data.time[key]}/`).orderByValue().equalTo(data.IDstu).once("value")
                    .then(snapshot => {
                        snapshot.forEach(childSnapshot => {
                            childSnapshot.ref.remove()
                                .then(() => {
                                    console.log("Data removed successfully");
                                    this.renewDate(data, data.time[key]);
                                })
                                .catch(error => {
                                    console.error("Error removing data:", error);
                                    return;
                                });
                        });
                    });
            }

        },

        renewDate(item, time) {
            const data = item;
            // ดึงข้อมูลทั้งหมดที่เหลือในพาท
            const db = this.$fireModule.database();
            db.ref(`test_time/${data.Tea}/${this.date}/${time}/`).once("value")
                .then(snapshot => {
                    const remainingData = [];
                    snapshot.forEach(childSnapshot => {
                        const value = childSnapshot.val();
                        if (value !== data.IDstu) {
                            remainingData.push(value);
                        }
                    });

                    // ลบข้อมูลเดิมทั้งหมดออกจากพาท
                    db.ref(`test_time/${data.Tea}/${this.date}/${time}/`).remove()
                        .then(() => {
                            // เพิ่มข้อมูลใหม่เพื่อเรียงลำดับคีย์ใหม่
                            remainingData.forEach((value, index) => {
                                db.ref(`test_time/${data.Tea}/${this.date}/${time}/`).update({
                                    [index]: value
                                });
                            });
                            console.log("Data reordered successfully");
                        })
                        .catch(error => {
                            console.error("Error reordering data:", error);
                        });
                });
        },
    },
}
</script>
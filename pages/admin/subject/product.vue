<template>
    <div>
        <v-card class="elevation-16 rounded-t-xl px-5 pt-3" style="background-color:#EBE4DE">
            <v-container fluid>
                <h5><b>เพิ่มสินค้า</b></h5>
                <v-row align="center">
                    <v-col cols="12" sm="3">
                        <v-text-field label="ชื่อวิชา" placeholder="ระบุวิชา" :rules="rules.name" v-model="name_sub"
                            @input="check()" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-select v-model="level_sub" :items="level" item-text="value" item-value="value" attach chips
                            label="ระดับการศึกษา" placeholder="กรุณาเลือกเรียงลงมา !!ไม่ติกข้ามไปมา!!" multiple
                            @input="check()" :rules="rules.select" required></v-select>
                    </v-col>
                    <v-col cols="12" sm="4"></v-col>
                    <v-col cols="12" sm="2">
                        <v-btn elevation="10" small color="#322E2B" style="color:white" :disabled="loading"
                            @click="save_submit()">เพิ่มรายวิชา
                            <span class="mdi mdi-plus"></span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rules: {
                // age: [(val) => val < 10 || `I don't believe you!`],
                select: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล"],
                name: [(val) => (val || "").length > 0 || "กรุณาระบุข้อมูล"],
            },
            loading: false,
            loading_level: false,
            name_sub: '',
            name_level: '',
            level_sub: [],
            level: [
                { key: 1, value: 'ป.1' },
                { key: 2, value: 'ป.2' },
                { key: 3, value: 'ป.3' },
                { key: 4, value: 'ป.4' },
                { key: 5, value: 'ป.5' },
                { key: 6, value: 'ป.6' },
                { key: 7, value: 'ม.1' },
                { key: 8, value: 'ม.2' },
                { key: 9, value: 'ม.3' },
                { key: 10, value: 'ม.4' },
                { key: 11, value: 'ม.5' },
                { key: 12, value: 'ม.6' },
            ],
        };
    },
    mounted(){

    },
    created() {
        this.check();
        this.check_level();
    },
    methods:{
        check() {
            if (this.level_sub.length == 0 || this.name_sub == '') {
                this.loading = true;
            } else { this.loading = false; }
        },
        check_level() {
            if (this.name_level == '') {
                this.loading_level = true;
            } else { this.loading_level = false; }
        },
        save_submit() {
            let key_items = new Date().getTime()
            const db = this.$fireModule.database();
            db.ref(`subject_all/${key_items}`).set({
                name: this.name_sub,
                level: this.level_sub,
            });
        },
        // save_submit_level(){
        //     const db = this.$fireModule.database();
        //     db.ref(`subject_level/`).update({
        //         0 : this.name_level,
        //     });
        // },
    },
}
</script>
<template>
    <div>
        <v-card>
            <v-container fluid>
                <h3>เพิ่มวิชาเรียน</h3>
                <v-row align="center">
                    <v-col cols="12" sm="3">
                        <v-text-field label="ชื่อวิชา" placeholder="ระบุวิชา" v-model="name_sub" @input="check()"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-select v-model="level_sub" :items="level" item-text="value" item-value="value" attach chips label="ระดับการศึกษา" placeholder="กรุณาเลือกเรียงลงมา !!ไม่ติกข้ามไปมา!!"
                            multiple @input="check()"></v-select>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-btn elevation="10" outline-success large :loading="loading" @click="submit_click(),save_submit()">SAVE</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

    </div>
</template>
<script>
import { computed } from 'vue';
export default {
    data() {
        return {
            loading: false,
            name_sub: '',
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
        }
    },
    created(){
        this.check();
    },
    methods:{
        submit_click(){
            console.log(this.level_sub,this.name_sub);
        },
        check(){
            if(this.level_sub.length == 0 || this.name_sub == ''){
                this.loading =  true;
            }else{this.loading =  false;}
        },
        save_submit(){
            let key_items = new Date().getTime()
            const db = this.$fireModule.database();
            db.ref(`subject_all/${key_items}`).set({
                name: this.name_sub,
                level: this.level_sub,
            });
        },
    },
    
}
</script>
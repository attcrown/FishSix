<template>
    <div>

    </div>
</template>
<script>
import Vue from 'vue';
export const CheckedEventBus = new Vue();

export default {
    data: () => ({

    }),
    created() {
        CheckedEventBus.$on('save_send_user', (item, callback) => {
            this.check_sendMethod(item, callback);
        });
    },
    methods: {
        check_sendMethod(item, callback) {
            console.log('ทำๆ', item, item.send_line);
            const db = this.$fireModule.database();
            db.ref(`send_plan/${item.keyTeacher}/${item.Idsendplan}`).update({
                send_line:item.send_line || false,
            }).then(() => {
                const result = item.send_line;
                callback(result);
            })
             // เรียก callback function แล้วส่งค่าที่คุณต้องการส่งกลับ
        },
    },

};
</script>

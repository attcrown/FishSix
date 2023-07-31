<template>
    <div class="mx-10">
        <h3 style="font-size:32px"><b>เช็คชื่อ/ส่งพัฒนการ</b></h3>
        <card></card>
    </div>
</template>
    
<script>

// import table_now from './table_now.vue';
import card from './card.vue';
export default {
    data() {
        return {

        }
    },

    components: {
        card
    },
    created() {

    },
    mounted() {
        this.fullName();
    },
    methods: {
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
    
<style scoped>
.v-progress-circular {
    margin: 1rem;
}
</style>
<template>
    <div>
        FINANCE
    </div>
</template>
<script>
export default {
    layout:'financeNav',
    data() {
        return {
           
        };
    },
    mounted(){
        this.gopage();
    },
    methods: {
        gopage(){
            this.$router.push("/finance/dashboard");
        }
    },
}
</script>
<template>
    <div>
        
    </div>
</template>
<script>
// base64
// btoa encode
// atob decode
export default {
    layout:'session',
    data() {
        return {
            
        }
    },
    mounted(){
        this.encode();
        this.decode();
    },
    methods:{
        encode(){
            const encodedData = btoa('Hello, World!');
            console.log(encodedData);
        },
        decode(){
            const decodedData = atob('SGVsbG8sIFdvcmxkIQ==');
            console.log(decodedData);
        }   
    }
}
</script>
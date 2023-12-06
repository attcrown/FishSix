<template>
    <div>

    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    mounted() {
        this.test4();
        // this.search();
        // this.search_all();
        // this.test3();
    },
    methods: {
        test4() {
            // const targetTimeRange = "2023-12-06";
            let targetTimeRange = ["2023-12-06","2023-12-05","2023-12-04"];
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                snapshot.forEach((timeSnapshot) => {
                    // console.log(`Data for time ${timeSnapshot.key}:`, timeSnapshot.val());
                    timeSnapshot.forEach((timeSnapshot2) => {
                        if(targetTimeRange.includes(timeSnapshot2.key)){
                            timeSnapshot2.forEach((timeSnapshot3) => {
                                console.log(`Data for time ${timeSnapshot3.key}:${timeSnapshot2.key}:${timeSnapshot.key}`, timeSnapshot3.val());
                                // let detail = timeSnapshot3.val();
                                // if(detail.status === 'พร้อมเรียน'){
                                //     console.log(`Data for time ${timeSnapshot3.key}:${timeSnapshot2.key}:${timeSnapshot.key}`, timeSnapshot3.val());
                                // }                                
                            })
                            
                        }
                    });
                });
            })

        },
        search_all() {
            const db = this.$fireModule.database();
            db.ref(`date_match/`).on("value", (snapshot) => {
                let index = 1;
                const childData = snapshot.val();
                console.log(childData);
                for (const idstu in childData) {
                    let ref2 = db.ref(`date_match/${idstu}`);
                    const targetTimeRange = "2023-12-06";
                    const timeRangeRef = ref2.child(targetTimeRange);
                    timeRangeRef.once('value')
                        .then((snapshot) => {
                            const data = snapshot.val();
                            if (data) {
                                console.log(`Data for ${targetTimeRange} :`, data);
                                // ใช้ forEach สำหรับการวนลูปทุกๆ โหนดที่อยู่ใน targetTimeRange
                                snapshot.forEach((timeSnapshot) => {
                                    console.log(`Data for time ${timeSnapshot.key}:`, timeSnapshot.val());
                                });
                            } else {
                                console.log(`No data found for ${targetTimeRange} `);
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching data:', error);
                        });
                    // timeRangeRef.once('value')
                    //     .then((snapshot) => {
                    //         const data = snapshot.val();
                    //         if (data) {
                    //             console.log(`Data for ${targetTimeRange} :`, data ,index++);
                    //         } else {
                    //             // console.log(`No data found for ${targetTimeRange} `);
                    //         }
                    //     })
                    //     .catch((error) => {
                    //         console.error('Error fetching data:', error);
                    //     });
                }

            })
        },
        search() {
            const db = this.$fireModule.database();
            const ref = db.ref('date_match');

            const targetDate = 'RlNTMjMxMDA0MDA=';
            const targetTimeRange = '2023-12-06';

            // ใช้ child() เพื่อเข้าถึงโหนดที่ต้องการ
            const dateRef = ref.child(targetDate);

            // ใช้ child() เพื่อเข้าถึงโหนดที่มีช่วงเวลาที่ต้องการ
            const timeRangeRef = dateRef.child(targetTimeRange);

            // อ่านข้อมูล
            timeRangeRef.once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        console.log(`Data for ${targetTimeRange} :`, data);
                    } else {
                        console.log(`No data found for ${targetTimeRange} `);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        },
    },
}
</script>
<template>
    <div>
        <div class="mb-3 d-flex justify-center">
            <v-row class="fill-height">
                <v-col>
                    <v-sheet height="64">
                        <v-toolbar flat style="background-color:#AD382F;" class="rounded-t-xl elevation-16">
                            <v-btn outlined class="mr-4" color="grey lighten-5" @click="setToday">
                                Today
                            </v-btn>
                            <v-btn fab text small color="grey lighten-5" @click="prev">
                                <v-icon small>
                                    mdi-chevron-left
                                </v-icon>
                            </v-btn>
                            <v-btn fab text small color="grey lighten-5" @click="next">
                                <v-icon small>
                                    mdi-chevron-right
                                </v-icon>
                            </v-btn>

                            <v-toolbar-title v-if="$refs.calendar" style="color:#FAFAFA">
                                {{ $refs.calendar.title }}
                            </v-toolbar-title>

                            <v-spacer></v-spacer>
                            <v-menu bottom right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn outlined color="grey lighten-5" v-bind="attrs" v-on="on">
                                        <span>{{ typeToLabel[type] }}</span>
                                        <v-icon right>
                                            mdi-menu-down
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item @click="type = 'day'">
                                        <v-list-item-title>Day</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'week'">
                                        <v-list-item-title>Week</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item @click="type = 'month'">
                                        <v-list-item-title>Month</v-list-item-title>
                                    </v-list-item>
                                    <!-- <v-list-item @click="type = '4day'">
                                <v-list-item-title>4 days</v-list-item-title>
                            </v-list-item> -->
                                </v-list>
                            </v-menu>
                        </v-toolbar>
                    </v-sheet>
                    <v-sheet height="600">
                        <v-calendar ref="calendar" v-model="focus" color="primary" :events="events"
                            :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay"
                            @click:date="viewDay"></v-calendar>
                        <!-- <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement"
                            offset-x>
                            <v-card color="grey lighten-4" min-width="350px" flat>
                                <v-toolbar :color="selectedEvent.color" dark>
                                    <v-btn icon>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn> -->
                        <!--eslint-disable-next-line vue/no-v-text-v-html-on-component-->
                        <!-- <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <v-card-text>
                                    <span v-html="selectedEvent.details"></span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn text color="secondary" @click="selectedOpen = false">
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu> -->
                    </v-sheet>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Vue from 'vue';
export const CalendarEventBus = new Vue();
export default {
    data: () => ({
        focus: '',
        type: 'week',
        typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day', '4day': '4 Days',
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted() {
        
        this.search_date_teacher();
        this.$refs.calendar.checkChange();
    },
    computed: {
        ...mapState(['firstName', 'status']),
        // ...
    },
    created() {

        CalendarEventBus.$on('call-calendar-method', () => {
            //this.search_date_teacher();
        });
    },
    methods: {
        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor(event) {
            return event.color
        },
        setToday() {
            this.focus = ''
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        getRandomColor() {
            const randomIndex = Math.floor(Math.random() * this.colors.length)
            const randomColor = this.colors[randomIndex]
            // Remove the color from the array so it won't be used again
            return randomColor
        },
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                // console.log(this.selectedEvent);
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = false))
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },
        search_date_teacher() {
            console.log('calendar search');
            const db = this.$fireModule.database();
            db.ref(`date_teacher/`).once("value", (snapshot) => {
                const childData = snapshot.val();
               
                this.selectedEvent = {};
                this.selectedElement = null;
                this.selectedOpen = false;
                this.events = [];
                const now = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
                for (const key in childData) {
                    const keydata = childData[key];
                    for (const date in keydata) {
                        const datedata = keydata[date];
                        for (const time in datedata) {
                            const timedata = datedata[time];
                            if (this.status == 'admin' || this.status == 'opFS' || this.status == 'opsupFS') {
                                const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                const getTeacherPromise = db.ref(`user/${key}`).once("value");
                                Promise.all([getSubjectPromise, getTeacherPromise])
                                    .then(([subjectSnapshot, teacherSnapshot]) => {
                                        const sub = subjectSnapshot.val();
                                        const tea = teacherSnapshot.val();
                                        this.events.push(
                                            {
                                                name: sub.name,
                                                start: new Date(date.substring(0, 4), date.substring(5, 7) - 1,
                                                    date.substring(8, 10), timedata.start.substring(0, 2),
                                                    timedata.start.substring(3, 5)),
                                                end: new Date(date.substring(0, 4), date.substring(5, 7) - 1,
                                                    date.substring(8, 10), timedata.stop.substring(0, 2),
                                                    timedata.stop.substring(3, 5)),
                                                color: this.getRandomColor(),
                                                timed: true,
                                                details: "ครู" + tea.nickname + " " + tea.teacherId,
                                            },
                                        );
                                    })
                            } else if (this.status == 'teacher' && this.firstName == key) {
                                const getSubjectPromise = db.ref(`subject_all/${timedata.subject}`).once("value");
                                const getTeacherPromise = db.ref(`user/${key}`).once("value");
                                Promise.all([getSubjectPromise, getTeacherPromise])
                                    .then(([subjectSnapshot, teacherSnapshot]) => {
                                        const sub = subjectSnapshot.val();
                                        const tea = teacherSnapshot.val();
                                        this.events.push(
                                            {
                                                name: sub.name,
                                                start: new Date(date.substring(0, 4), date.substring(5, 7) - 1,
                                                    date.substring(8, 10), timedata.start.substring(0, 2),
                                                    timedata.start.substring(3, 5)),
                                                end: new Date(date.substring(0, 4), date.substring(5, 7) - 1,
                                                    date.substring(8, 10), timedata.stop.substring(0, 2),
                                                    timedata.stop.substring(3, 5)),
                                                color: this.getRandomColor(),
                                                timed: true,
                                                details: "ครู" + tea.nickname + " " + tea.teacherId,
                                            },
                                        );
                                    })
                            }

                        }

                    }
                }
            });
        },
       
    }
}
</script>
<style>
.v-data-table-header th {
    background-color: #D4C1B2;
    /* เปลี่ยนเป็นสีที่คุณต้องการ */
}
</style>
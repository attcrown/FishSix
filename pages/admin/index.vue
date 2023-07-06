<template>
  <div>
    <template>
      <div class="text-center">
        <v-progress-circular xl :rotate="360" :size="250" :width="15" :value="value" color="teal">
          {{ value }}
        </v-progress-circular>

        <v-progress-circular :rotate="-90" :size="100" :width="15" :value="value" color="primary">
          {{ value }}
        </v-progress-circular>

        <v-progress-circular :rotate="90" :size="100" :width="15" :value="value" color="red">
          {{ value }}
        </v-progress-circular>

        <v-progress-circular :rotate="180" :size="100" :width="15" :value="value" color="pink">
          {{ value }}
        </v-progress-circular>
      </div>
    </template>
    <template>
      <v-card class="mx-auto text-center" color="green" dark max-width="600">
        <v-card-text>
          <v-sheet color="rgba(0, 0, 0, .12)">
            <v-sparkline :value="value_green" color="rgba(255, 255, 255, .7)" height="100" padding="24"
              stroke-linecap="round" 
              :smooth="radius">
              <template v-slot:label="item">
                ${{ item.value }}
              </template>
            </v-sparkline>
          </v-sheet>
        </v-card-text>

        <v-card-text>
          <div class="text-h4 font-weight-thin">
            Sales Last 24h
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-center">
          <v-btn block text>
            Go to Report
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      firstName: 'ไม่มี',
      keyuser: 'ไม่มี',
      interval: {},
      value: 0,
      value_green: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
      ],
      radius: 1,
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  computed: {

  },
  mounted() {
    this.fullName();
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
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
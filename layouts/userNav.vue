<template>
  <v-app class="fonts500">
    <v-navigation-drawer v-model="drawer" :width="drawerWidth" :max-width="drawerMaxWidth" :mini-variant="miniVariant"
      :clipped-left="clipped" fixed app color="#B6A7A2">
      <div class="text-center"><img :src="require('@/assets/fishsixLogo.png')" style="width: 75%;"></div>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon class="text-dark">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-dark">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item to="/" router exact @click="getout()">
          <v-list-item-action>
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ออกจากระบบ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped="clipped" fixed app color="white" elevation="0">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="dark" />

      <v-spacer />
      <p class=" dark" style="">
        {{ email }}
      </p>

      
      <v-avatar  class="ms-1">
        <img v-if="profilePic"  :src="profilePic" alt="รูปโปรไฟล์">
        <v-icon   v-if="!profilePic"  color="black">
        mdi-account-circle 
      </v-icon>
      </v-avatar>

    </v-app-bar>




    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
        <v-list>
          <v-list-item @click.native="right = !right">
            <v-list-item-action>
              <v-icon light> mdi-repeat </v-icon>
            </v-list-item-action>
            <v-list-item-title>Switch drawer (click me)</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer> -->



  </v-app>
</template>
  
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawerWidth: 200, // Change this value as desired for the default width
      drawerMaxWidth: 350,



      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'หน้าหลัก',
          to: '/user',
        },
        {
          icon: 'mdi-account-circle ',
          title: 'ข้อมูลนักเรียน',
          to: '/user/profile',
        },
        {
          icon: 'mdi-folder ',
          title: 'คลังเนื้อหา',
          to: '/user/content',
        },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "",
      status: "",
      keyuser: null,
      profilePic: null,
      email: null,
    }
  },
  mounted() {
    this.check();
    this.readdata();
  },
  methods: {
    check() {
      if (localStorage.getItem('firstName') == null && sessionStorage.getItem('firstName') == null) {
        this.getout();
      }
      else if (sessionStorage.getItem('status') != 'user' && localStorage.getItem('status') != 'user') {
        this.getout();
      } else {
        if (localStorage.getItem('firstName') == null) {
          this.title = sessionStorage.getItem('firstName');
          this.status = sessionStorage.getItem('status');
          this.keyuser = sessionStorage.getItem('lastName');
        } else {
          this.title = localStorage.getItem('firstName');
          this.status = localStorage.getItem('status');
          this.keyuser = localStorage.getItem('lastName') || '';
        }
      }
    },

    async readdata() {
      const db = this.$fireModule.database();
      await db.ref(`user/${this.keyuser}`).on("value", (snapshot) => {
        const childData = snapshot.val();
        this.profilePic = childData.profilePic || null;
        this.email = childData.email || null;
      })
    },

    getout() {
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
}
</script>
  
<style>
.input-container {
  display: flex;
  align-items: center;
}

.input-container .mdi {
  margin-right: 8px;
}

.large-icon {
  font-size: 24px;
}

.sheet-container {
  position: relative;
  top: 50%;
  transform: translateY(0%);
}

@media (max-width: 600px) {
  .drawer-responsive {
    --mini-variant-width: 56px;
    --mini-variant-max-width: 56px;
  }
}

.fonts500 {
  font-family: 'Prompt', sans-serif;
  /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
  font-weight: 500;
}
</style>
  
  
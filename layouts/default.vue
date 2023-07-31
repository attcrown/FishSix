<template>
  <v-app class="fonts500">
    <v-navigation-drawer v-model="drawer" :width="drawerWidth" :max-width="drawerMaxWidth" :mini-variant="miniVariant"
      :clipped-left="clipped" fixed app color="#B6A7A2">
      <div class="text-center"><img :src="require('@/assets/fishsixLogo.png')" style="width: 100%;"></div>

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
      <p class="m-0">
       Operation
      </p>
      <v-avatar class="ms-2">
        <v-icon style=" font-size: 40px;" color="grey">
          mdi-account-circle
        </v-icon>
      </v-avatar>
      <!-- <v-btn icon to="/admin/" router exact @click="getout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn> -->
    </v-app-bar>


    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawerWidth: 200,
      drawerMaxWidth: 350,
      clipped: true,
      drawer: false,
      fixed: false,


      email: null,

      items: [
        {
          icon: 'mdi-monitor-dashboard',
          title: 'DashBoard',
          to: '/admin',
        },
        {
          icon: 'mdi-book-open-variant',
          title: 'จองเวลาเรียน',
          to: '/admin/matching',
        },
        {
          icon: 'mdi-table-large',
          title: 'เช็คชื่อ/ส่งพัฒนาการ',
          to: '/admin/submit_table',
        },
        {
          icon: 'mdi-folder-file-outline',
          title: 'เพิ่มรายละเอียด',
          to: '/admin/subject',
        },
        {
          icon: 'mdi-folder',
          title: 'คลังเนื้อหา',
          to: '/admin/content',
        },
        {
          icon: 'mdi-account-school',
          title: 'ครู',
          to: '',
        },
        {
          icon: 'mdi-circle-outline',
          title: 'ตารางครู',
          to: '/admin/table_teacher',
        },
        {
          icon: 'mdi-circle-outline',
          title: 'ข้อมูลครู',
          to: '/admin/teacher',
        },
        {
          icon: 'mdi-account',
          title: 'นักเรียน',
          to: '',
        },
        {
          icon: 'mdi-circle-outline',
          title: 'ตารางนักเรียน',
          to: '/admin/table_user',
        },
        {
          icon: 'mdi-circle-outline',
          title: 'ข้อมูลนักเรียน',
          to: '/admin/student',
        },
        // {
        //   icon: 'mdi-store',
        //   title: 'Shop',
        //   to: '/admin/shop',
        // },
        // {
        //   icon: 'mdi-store-settings',
        //   title: 'Edit-Shop',
        //   to: '/admin/edit_shop',
        // },        
        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "",
      status: "",
    }
  },
  mounted() {
    this.check();
  },
  methods: {
    check() {
      if (localStorage.getItem('firstName') == null && sessionStorage.getItem('firstName') == null) {
        this.getout();
      }
      else if (sessionStorage.getItem('status') != 'admin' && localStorage.getItem('status') != 'admin') {
        this.getout();
      } else {
        if (localStorage.getItem('firstName') == null) {
          this.title = sessionStorage.getItem('firstName');
          this.status = sessionStorage.getItem('status');
        } else {
          this.title = localStorage.getItem('firstName');
          this.status = localStorage.getItem('status');
        }
      }
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

.fonts500 {
  font-family: 'Prompt', sans-serif;
  /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
  font-weight: 500;
}

.fonts300 {
  font-family: 'Prompt', sans-serif;
  /* ใช้ Roboto หรือ Font ที่ต้องการอื่นๆ ที่คุณได้ตั้งค่าใน nuxt.config.js */
  font-weight: 300;
}
</style>


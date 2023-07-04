<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact color="white">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list-item to="/" router exact @click="getout()">
          <v-list-item-action>
            <v-icon class="white--text">mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-avatar class="ms-10">
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>
      <v-toolbar-title class="ms-3 white--text">
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon to="/admin/basket" router exact>
        <v-icon class="white--text">mdi-basket-fill</v-icon>
      </v-btn>
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

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-monitor-dashboard',
          title: 'DashBoard',
          to: '/admin',
        },
        {
          icon: 'mdi-store',
          title: 'Shop',
          to: '/admin/shop',
        },
        {
          icon: 'mdi-store-settings',
          title: 'Edit-Shop',
          to: '/admin/edit_shop',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Candidate',
          to: '/admin/candidate',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "",
      status:"",
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
      if(sessionStorage.getItem('status') != 'admin'){
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
</style>


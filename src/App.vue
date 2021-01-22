<template>
<v-app>
    <v-app-bar app :color="this.$store.state.color" dark>

        <v-spacer></v-spacer>
        <v-app-bar-title>{{this.$store.state.title}}</v-app-bar-title>
        <v-spacer></v-spacer>
    </v-app-bar>
    <v-main app class="overflow-y-auto" max-height="100vh">

        <router-view></router-view>

    </v-main>
    <v-footer app>
        <v-bottom-navigation  id="bottom-menu" app v-model="this.$store.state.currentMenu" :background-color="this.$store.state.color" dark shift>
            <v-btn :disabled="this.$store.state.menuDisabled" v-on:click="changeRoute('tests')">
                <span>Тесты</span>

                <v-icon>mdi-help-circle-outline</v-icon>
            </v-btn>

            <v-btn :disabled="this.$store.state.menuDisabled" v-on:click="changeRoute('profile')">
                <span>Профиль</span>

                <v-icon>mdi-clipboard-account-outline </v-icon>
            </v-btn>

            <v-btn :disabled="this.$store.state.menuDisabled" v-on:click="changeRoute('top')">
                <span>Рейтинг</span>

                <v-icon>mdi-playlist-star</v-icon>
            </v-btn>

        </v-bottom-navigation>
    </v-footer>

</v-app>
</template>

<script>
export default {
    name: 'App',

    data: () => ({ value: 1 }),

    methods: {
        changeRoute(dest) {
            this.$router.push({ path: '/' + dest });
        }
    },
    mounted() {
        if (this.$cookie.get('token')) {
            this.$store.commit('changeJwt', (this.$cookie.get('token')));
        }
    }
};
</script>

<style>
#bottom-menu .theme--dark.v-btn.v-btn--has-bg {
    background: transparent !important;
}

#bottom-menu .v-item-group.v-bottom-navigation {
    align-items: center !important;
}

#bottom-menu .v-btn:not(.v-btn--round).v-size--default {
    height: 56px !important;
}

.v-footer {
    padding: 0 !important;
}
</style>

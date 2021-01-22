<template>
<v-container>
    <v-tabs>
        <v-tab @click="registred= true">Войти</v-tab>
        <v-tab @click="registred= false">Регистрация</v-tab>

    </v-tabs>
    <v-form v-if="registred" ref="form" v-model="valid">
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" name="input-10-1" label="Пароль" @click:append="show = !show"></v-text-field>

        <v-btn :disabled="!valid" color="primary" class="mr-4" @click="login">
            Войти
        </v-btn>

    </v-form>
    <v-form v-if="!registred" ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :counter="30" :rules="nameRules" label="Имя" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show ? 'text' : 'password'" name="input-10-1" label="Пароль" hint="Минимум 8 символов" counter @click:append="show = !show"></v-text-field>

        <v-checkbox v-model="checkbox" :rules="[v => !!v || 'Вы должны согласиться с правилами!']" label="Согласен с правилами" required></v-checkbox>

        <v-btn :disabled="!valid" color="primary" class="mr-4" @click="register">
            Регистрация
        </v-btn>

    </v-form>
    <v-snackbar :timeout="1000" :value="emailTaken" color="blue-grey" content-class="snack-center" rounded="pill" bottom>
        Такой e-mail уже используется
    </v-snackbar>
    <v-snackbar :timeout="1000" :value="invalidPass" color="blue-grey" content-class="snack-center" rounded="pill" bottom>
        Неправильное имя пользователя или пароль
    </v-snackbar>
</v-container>
</template>

<script>
import axios from 'axios';
import api from '../constants'
export default {

    name: 'Home',
    data: () => ({
        emailTaken: false,
        invalidPass: false,
        registred: true,
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Имя обязательно',

        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail обязателен',
            v => /.+@.+\..+/.test(v) || 'Неверный формат',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Пароль обязателен',
            v => v.length >= 8 || 'Минимум 8 символов',
        ],
        show: false,

        checkbox: false,
    }),
    mounted() {
        this.$store.commit('changeTitle', 'Добро пожаловать!');
        if (this.$cookie.get('token')) {
            this.$store.commit('changeJwt', (this.$cookie.get('token')));
            axios.post(api.me, null, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }
            }).then(respone => { console.log(respone.data);
                this.goToMe() }).catch(error => {
                console.log(error);
            })
        }

    },
    methods: {
        validate() {
            this.$refs.form.validate()
        },
        goToMe() {
            this.$router.push({ path: '/profile' })
        },
        login() {
            this.validate;
            if (this.valid) {
                axios
                    .post(api.auth, {
                        identifier: this.email,
                        password: this.password,
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.$cookie.set('token', response.data.jwt, { expires: '6M' })
                            this.$store.commit('changeJwt', response.data.jwt);
                        }
                        this.goToMe();
                    })
                    .catch(error => {
                        // Handle error.
                        console.log('An error occurred:', error.response);
                        this.invalidPass = true;
                        setTimeout(() => (this.invalidPass = false), 1500)
                    });
            }
        },
        register() {
            this.validate;
            if (this.valid) {
                axios
                    .post(api.register, {
                        username: this.name,
                        email: this.email,
                        password: this.password,
                    })
                    .then(response => {
                        this.$cookie.set('token', response.data.jwt, { expires: '1M' })
                        this.$store.commit('changeJwt', response.data.jwt);
                        this.goToMe();

                    })
                    .catch(error => {
                        // Handle error.
                        console.log('An error occurred:', error.response);
                        this.emailTaken = true;
                        setTimeout(() => { this.emailTaken = false }, 1500)
                    });

            }
        },
    }
}
</script>

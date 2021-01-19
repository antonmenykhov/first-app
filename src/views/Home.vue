<template>
<v-container>
    <v-tabs>
        <v-tab @click="registred= true">Войти</v-tab>
        <v-tab @click="registred= false">Регистрация</v-tab>

    </v-tabs>
    <v-form v-if="registred" ref="form" v-model="valid" >
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
</v-container>
</template>

<script>
import axios from 'axios';
import api from '../constants'
export default {

    name: 'Home',
    data: () => ({
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
                        localStorage.setItem('token', response.data.jwt);
                        this.goToMe();
                    })
                    .catch(error => {
                        // Handle error.
                        console.log('An error occurred:', error.response);
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
                        localStorage.setItem('token', response.data.jwt)
                        this.goToMe();

                    })
                    .catch(error => {
                        // Handle error.
                        console.log('An error occurred:', error.response);
                    });

            }
        },
    }
}
</script>

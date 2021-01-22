<template>
<v-container>
    <div v-if="!loaded">
        <v-skeleton-loader v-bind="attrs" type="list-item-avatar-two-line,   list-item@4, paragraph@3"></v-skeleton-loader>
    </div>
    <div v-if="loaded">
        <div class="profile-wrapper">
            <div class="avatar-name">
                <v-avatar>

                    <img :src="avatar">

                   
                    <v-file-input id="avatar-input" @change="uploadImage" v-show="isEditing" accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera" class="input-avatar"></v-file-input>
                </v-avatar>

                <v-text-field style="padding: 0 16px " :disabled="!isEditing" label="Имя" v-model="username"></v-text-field>
                <v-btn color="teal " fab small @click="edit">
                    <v-icon v-if="isEditing">
                        mdi-close
                    </v-icon>
                    <v-icon v-else>
                        mdi-pencil
                    </v-icon>
                </v-btn>
            </div>
            <v-text-field :disabled="!isEditing" label="Электронная почта" v-model="mail"></v-text-field>
            <v-text-field :disabled="!isEditing" label="Телефон" v-model="phone"></v-text-field>
            <v-text-field :disabled="!isEditing" label="Город" v-model="city"></v-text-field>
            <v-dialog ref="dialog" v-model="modal" :return-value.sync="birthday" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="birthday" label="День рождения" :disabled="!isEditing" v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="birthday" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                        Отмена
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(birthday)">
                        OK
                    </v-btn>
                </v-date-picker>
            </v-dialog>
            <v-text-field disabled label="Рейтинг" v-model="raiting"></v-text-field>
            <v-textarea name="input-7-1" :disabled="!isEditing" label="О себе" auto-grow v-model="about"></v-textarea>
            <v-snackbar :timeout="1000" :value="snackbar" color="blue-grey" content-class="snack-center" rounded="pill" bottom>
                Информация обновлена
            </v-snackbar>
        </div>
    </div>
</v-container>
</template>

<script>
import api from '../constants'
import axios from 'axios'
export default {

    data() {
        return {
            http: api.http,
            userdata: null,
            token: localStorage.getItem('token'),
            snackbar: false,
            isEditing: false,
            username: 'Вася',
            city: 'Tyumen',
            birthday: null,
            mail: 'vasya@mail.ru',
            phone: '88005553535',
            about: 'I am vasya!',
            raiting: 100,
            loaded: false,
            tests: 5,
            avatar: '',
            attrs: {
                class: 'mb-6',

                elevation: 2,
            },
        }
    },
    methods: {
        edit() {
            if (this.isEditing) { this.saveInfo() }
            this.isEditing = !this.isEditing

        },
        saveInfo() {
            axios.post(api.updateuserinfo, {
                username: this.username,
                email: this.mail,
                city: this.city,
                birthday: this.birthday,
                phone: this.phone,
                about: this.about,
                avatarlink: this.avatar
            }, {
                headers: {
                    Authorization: `Bearer ${this.$store.state.jwt}`
                }
            })
            this.snackbar = true,
                setTimeout(() => { this.snackbar = false }, 1000)
        },
        uploadImage() {
            let img = document.getElementById('avatar-input').files[0]
            let fd = new FormData()

            fd.append('files',img)

            axios.post(api.upload, fd, {
            headers: {
                Authorization: `Bearer ${this.$store.state.jwt}`
            }})
                .then(response => {
                    this.avatar = api.http+response.data[0].formats.small.url
                })
        }
    },
    created() {
        const readyHandler = () => {
            if (document.readyState == 'complete') {
                this.loaded = true;
                document.removeEventListener('readystatechange', readyHandler);
            }
        };

        document.addEventListener('readystatechange', readyHandler);

        readyHandler(); // in case the component has been instantiated lately after loading
    },
    mounted() {
        this.$store.commit('changeMenuDisabled', false);
        this.$store.commit('changeCurrentMenu', 1)
        this.$store.commit('changeTitle', 'Профиль');
        this.$store.commit('changeColor', 'teal');
        axios.post(api.me, null, {
            headers: {
                Authorization: `Bearer ${this.$store.state.jwt}`
            }
        }).then(respone => {
            this.userdata = respone.data;
            this.username = this.userdata.username;
            this.city = this.userdata.city;
            this.birthday = this.userdata.birthday;
            this.mail = this.userdata.email;
            this.phone = this.userdata.phone;
            this.about = this.userdata.about;
            this.raiting = this.userdata.raiting;
            this.avatar = this.userdata.avatarlink;
            
        }).catch(error => {
            console.log(error);
            this.$router.push({ path: '/' })
        })
    }

}
</script>

<style>
.v-skeleton-loader__paragraph,
.v-skeleton-loader__sentences {
    padding: 16px
}

.v-avatar {
    position: relative;
}

.profile-wrapper {
    padding: 16px;
    border-radius: 4px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    margin-bottom: 24px !important;
}

.avatar-name {
    display: flex;
    align-items: flex-start;
}

.input-avatar .v-input__control {
    display: none;
}

.input-avatar {
    width: 100% !important;
    max-width: 100% !important;
    height: 100% !important;
    max-height: 100% !important;
    justify-content: center !important;
    align-items: center;
    padding-top: 10px !important;
    margin-top: 0px !important;
    position: absolute;
    padding-left: 10px;
    background: rgba(255, 255, 255, 0.712);
}

.username {
    font-size: 22px;
    padding-left: 16px;
}

.theme--light.v-label--is-disabled,
.theme--light.v-input--is-disabled input,
.theme--light.v-input--is-disabled textarea {
    color: rgb(0 0 0 / 85%) !important;
}

.snack-center {
    text-align: center !important;
}
</style>

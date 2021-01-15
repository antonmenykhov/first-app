<template>
<v-container>
    <div v-if="!loaded">
        <v-skeleton-loader v-bind="attrs" type="list-item-avatar-two-line,   list-item@4, paragraph@3"></v-skeleton-loader>
    </div>
    <div v-if="loaded">
        <div class="profile-wrapper">
            <div class="avatar-name">
                <v-avatar>
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
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
export default {

    data() {
        return {
            snackbar: false,
            isEditing: false,
            username: 'Вася Пупкин',
            city: 'Tyumen',
            birthday: new Date().toISOString().substr(0, 10),
            mail: 'vasya@mail.ru',
            phone: '88005553535',
            about: 'I am vasya!',
            raiting: 100,
            loaded: false,
            tests: 5,
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
            this.snackbar = true,
                setTimeout(() => { this.snackbar = false }, 1000)
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

}
</script>

<style>
.v-skeleton-loader__paragraph,
.v-skeleton-loader__sentences {
    padding: 16px
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

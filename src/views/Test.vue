<template>
<v-container>

    <div>
        <v-row>
            <v-col>
                <div class="test-wrapper" @click="openTest(test.id)">
                    <div class="test-image" :style="{background: 'url(\''+link+test.TestMedia[0].formats.small.url+'\') no-repeat center center /  cover'}"></div>

                    <div class="test-text-wrapper">
                        <div class="test-header">
                            <h3>Добро пожаловать в тест {{test.TestName}}</h3>
                        </div>
                        <div class="test-decription">
                            {{test.TestDescription}}
                        </div>
                        <div class="buttons-holder">
                            <v-btn @click="goBack">Назад</v-btn>
                            <v-btn color="primary" @click="startTest">
                                Начать тест
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>

</v-container>
</template>

<script>
import api from '../constants'
export default {
    props: { tests: Object, id: String },
    data() {
        return {
            test: null,
            link: api.http

        }
    },
    methods: {
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        },
        startTest() {
            this.$router.push({ name: 'Questions', params: { testQuestions: this.test.Questions, id: this.test.id } })
        }
    },
    mounted() {
        this.test = this.tests.find(test => test.id === this.id)
    },
}
</script>

<style>
    .buttons-holder{
        display: flex;
        justify-content: space-around;
        padding: 16px;
    }
</style>

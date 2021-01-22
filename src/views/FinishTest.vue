<template>
<div>
    <v-container>
        <div class="test-wrapper flex">
            <div class="finish-img"></div>
            <p class="finish-text"> Ваш результат: {{result}} вопросов из {{qNumber}}</p>
            <div>
                <v-btn v-on:click="backToTests">Вернуться к тестам</v-btn>
            </div>
        </div>
    </v-container>
</div>
</template>

<script>
import api from '../constants'
import axios from 'axios'
export default {
    data() {
        return {
            result: null,
            token: localStorage.getItem('token')
        }
    },
    props: { answers: Array, qNumber: null, testId: null },
    methods: {
        backToTests() {
            this.$router.push({ path: '/tests' })
        }
    },
    mounted() {
        this.$store.commit('changeTitle', 'Готово!');
        axios.post(api.checkanswers, 
        { testid: this.testId, answers: this.answers }, 
        {headers:{
            Authorization: `Bearer ${this.$store.state.jwt}`
        }})
            .then(response => { this.result = response.data })
            .catch(console.error())

    },
}
</script>

<style>
    .finish-img{
        height: 90vw;
        width:  90vw;
        background: url('../assets/ok.svg') no-repeat  center center /cover;
    }
    .flex{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80vh;
        padding: 16px;
        justify-content: space-between;
    }
    .finish-text{
        font-size: 20px;
        font-weight: bold;
    }
</style>

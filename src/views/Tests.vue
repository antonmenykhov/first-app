<template>
<v-container>
    <div v-if="!loaded">
        <v-row v-for="n in 5" :key="n">
            <v-col>
                <v-skeleton-loader v-bind="attrs" type="image, article"></v-skeleton-loader>
            </v-col>
        </v-row>
    </div>
    <div v-if="loaded">
        <v-row v-for="test in testsArray" :key="test.id">
            <v-col>
                <div class="test-wrapper" @click="openTest(test.id)">
                    <div v-if="test.solved" class="test-overlay">
                        <div class="solved-img"></div>
                        <div class="solved">Решено! {{test.result}} из {{test.Questions.length}}</div>
                    </div>
                    <div class="test-image" :style="{background: 'url(\''+http+test.TestMedia[0].formats.small.url+'\') no-repeat center center /  cover'}" ></div>
                    <div class="test-text-wrapper">
                        <div class="test-header">
                            {{test.TestName}}
                        </div>
                        <div class="test-decription">
                            {{test.TestDescription}}
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
    <v-snackbar :timeout="1000" :value="snackbar" color="blue-grey" content-class="snack-center" rounded="pill" bottom>
                Вы уже решили этот тест! ;-)
            </v-snackbar>
</v-container>
</template>

<script>
import api from '../constants';
import axios from 'axios'
export default {
    data() {
        return {
            snackbar: false,
            token: localStorage.getItem('token'),
            loaded: false,
            testsArray: [],
            attrs: {
                class: 'mb-6',

                elevation: 2,
            },
            http: api.http
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
    mounted(){
        axios.post(api.gettests, '', {headers:{
            Authorization: `Bearer ${this.token}`
        }})
            .then(response => {this.testsArray = response.data}).catch(error => { console.log(error);
            this.$router.push({ path: '/' }) });
            
            
    },
    methods:{
        openTest(id){
            let testForCheck = this.testsArray.find(test => test.id === id);
            if (testForCheck.solved === true){
                this.snackbar = true,
                setTimeout(() => { this.snackbar = false }, 1000)
            } else{
            this.$router.push({
                name: 'Test',
                params: {
                    tests: this.testsArray,
                    id: id
                }
            })
        }}
    }
}
</script>

<style>
.test-wrapper {
    border-radius: 4px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    margin-bottom: 24px !important;
    position: relative;
}

.test-image {
    height: 200px;
    

}

.test-header {
    padding: 16px 16px 0 16px;
    font-size: 18px;
    font-weight: bold;
    text-rendering: optimizeLegibility;

}

.test-decription {
    padding: 16px;
    font-size: 16px;
    text-rendering: optimizeLegibility;
}
.test-overlay{
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.582);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 15%;
}
.solved-img{
    background: url('../assets/ok.svg') no-repeat center center /cover;
    height: 70px;
    width: 70px;
}
.solved{
    font-size: 20px;
}
</style>

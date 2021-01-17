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
</v-container>
</template>

<script>
import api from '../constants';
import axios from 'axios'
export default {
    data() {
        return {
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
        axios.get(api.tests)
            .then(response => {this.testsArray = response.data});
            
            
    },
    methods:{
        openTest(id){
            this.$router.push({
                name: 'Test',
                params: {
                    tests: this.testsArray,
                    id: id
                }
            })
        }
    }
}
</script>

<style>
.test-wrapper {
    border-radius: 4px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    margin-bottom: 24px !important;
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
</style>

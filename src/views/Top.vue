<template>
<v-container>
    <div v-if="!loaded">
    
        <v-skeleton-loader type=list-item-avatar@11></v-skeleton-loader>
    </div>
    <div v-if="loaded">
        <v-list>
            <v-list-item v-for="(user, index) in usertop" :key="user.id">
                <v-list-item-icon class="top-position">
          <v-icon
            class="top-position-text"
            
          >
            {{index+1}}
          </v-icon>
        </v-list-item-icon>
                <v-list-item-avatar class="top-avatar">
                    <v-img  :alt="`${user.username} avatar`" :src="user.avatarlink" ></v-img>
                    
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="user.username"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
          <v-icon class="top-raiting"
            
            color="brown"
          >
            {{user.raiting}}
          </v-icon>
        </v-list-item-icon>
            </v-list-item>
        </v-list>
    </div>
</v-container>
</template>

<script>
import axios from 'axios';
import api from '../constants'
export default {
    data() {
        return {
            http: api.http,
            loaded: false,
            usertop: null,
            token: localStorage.getItem('token'),
           
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
        this.$store.commit('changeCurrentMenu', 2)
        this.$store.commit('changeTitle', 'Таблица лидеров');
        this.$store.commit('changeColor', 'brown');
        axios.post(api.gettop, null, {headers:{
            Authorization: `Bearer ${this.$store.state.jwt}`
        }}).then(response=> this.usertop=response.data).catch(error => {console.log(error); this.$router.push({path:'/'})})
       
    },
}
</script>

<style>
    .top-raiting{
        font-size: 24px!important;
    
        font-style: normal!important;
    }
    .top-avatar{
        margin-right: 10px!important;
    }
    .top-position{
        margin-right: 16px!important;
    }
    .top-position-text{
        font-style: normal!important;
        background: #795548 !important;
        color: rgb(255, 255, 255)!important;
        height: 24px;
        width: 24px;
        border-radius: 50%;
    }
</style>

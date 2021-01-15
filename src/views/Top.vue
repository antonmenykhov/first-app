<template>
<v-container>
    <div v-if="!loaded">
    
        <v-skeleton-loader type=list-item-avatar@11></v-skeleton-loader>
    </div>
    <div v-if="loaded">
        <v-list>
            <v-list-item v-for="chat in recent" :key="chat.title">
                <v-list-item-icon class="top-position">
          <v-icon
            class="top-position-text"
            
          >
            1
          </v-icon>
        </v-list-item-icon>
                <v-list-item-avatar class="top-avatar">
                    <v-img :alt="`${chat.title} avatar`" :src="chat.avatar" ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title v-text="chat.title"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
          <v-icon class="top-raiting"
            
            color="brown"
          >
            500
          </v-icon>
        </v-list-item-icon>
            </v-list-item>
        </v-list>
    </div>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            loaded: false,
            recent: [{
                    active: true,
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Jason Oner',
                },
                {
                    active: true,
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Mike Carlson',
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Cindy Baker',
                },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Ali Connors',
                },
            ],
            previous: [{
                title: 'Travis Howard',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            }],
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

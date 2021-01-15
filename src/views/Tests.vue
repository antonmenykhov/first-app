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
        <v-row v-for="n in tests" :key="n">
            <v-col>
                <div class="test-wrapper">
                    <div class="test-image"></div>
                    <div class="test-text-wrapper">
                        <div class="test-header">
                            Это первый тест
                        </div>
                        <div class="test-decription">
                            Это описание первого теста. Это описание первого теста. Это описание первого теста
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            loaded: false,
            tests: 5,
            attrs: {
                class: 'mb-6',

                elevation: 2,
            },
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
.test-wrapper {
    border-radius: 4px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
    margin-bottom: 24px !important;
}

.test-image {
    height: 200px;
    background: url('https://million-wallpapers.ru/wallpapers/0/55/452112202626022.jpg') no-repeat center center /cover;

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

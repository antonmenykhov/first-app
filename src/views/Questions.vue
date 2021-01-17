<template>
<div>
    <v-container>
        <v-row>
            <v-col class="question-wrapper">
                <div v-for="(question, index) in questions" :key="question.id">
                    <div v-show="currentNumber===index">
                        <p class="question-text">{{question.Vopros}}</p>
                        <div class="answers">
                            <div class="buttons-holder first-line">
                                <v-btn class="ma-2"  color="grey">
                                    {{question.var1}}
                                </v-btn>
                                <v-btn class="ma-2"  color="grey">
                                    {{question.var2}}
                                </v-btn>
                            </div>
                            <div class="buttons-holder second-line">
                                <v-btn class="ma-2"  color="grey">
                                    {{question.var3}}
                                </v-btn>
                                <v-btn class="ma-2"  color="grey">
                                    {{question.var4}}
                                </v-btn>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="buttons-holder tests-buttons">
                    <v-btn v-show="0!=currentNumber" v-on:click="prevQ">Назад</v-btn>
                    <v-btn color="primary" v-show="(currentNumber+1)!=qNumber" v-on:click="nextQ">Следующий вопрос</v-btn>
                    <v-btn color="primary" v-show="qNumber===(currentNumber+1)" v-on:click="finishTest">Закончить</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    props: { testQuestions: Array, id: String },
    data() {
        return {
            questions: this.testQuestions,
            qNumber: this.testQuestions.length,
            currentNumber: 0,
            answers: [],
            

        }
    },
    methods: {
        nextQ() {
            this.currentNumber++
        },
        prevQ() {
            this.currentNumber--
        },
        setAnswer(qId, aId) {
            this.answers[qId] = aId
        },
        finishTest() {
            this.$router.push({ name: 'FinishTest', params: { answers: this.answers, qNumber: this.qNumber, testId: this.testData.id } })
        }

    },
}
</script>

<style>
.tests-buttons {
    position: absolute;
    bottom: 0px;
    width: 95vw;
}

.question-wrapper {
    height: 100%;
}

.question-text {
    font-size: 20px;
    text-align: center;
}
.answers{
    position: absolute;
    bottom: 50px;
    width: 95vw;
}
.answers button{
    min-width: 40vw!important;
}
.first-line{
    padding-bottom: 0px!important;
}
.second-line{
    padding-top: 0px!important
}
</style>

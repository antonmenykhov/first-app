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
                                <v-btn class="ma-2" color="grey" @click="setAnswer(index, 'var1')">
                                    {{question.var1}}
                                </v-btn>
                                <v-btn class="ma-2" color="grey" @click="setAnswer(index, 'var2')">
                                    {{question.var2}}
                                </v-btn>
                            </div>
                            <div class="buttons-holder second-line">
                                <v-btn class="ma-2" color="grey" @click="setAnswer(index, 'var3')">
                                    {{question.var3}}
                                </v-btn>
                                <v-btn class="ma-2" color="grey" @click="setAnswer(index, 'var4')">
                                    {{question.var4}}
                                </v-btn>
                            </div>

                        </div>
                    </div>
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

        setAnswer(qId, aId) {
            this.answers[qId] = aId;
            if (this.currentNumber+1 != this.qNumber) {
                this.currentNumber++
            } else {
                this.$router.push({ name: 'FinishTest', params: { answers: this.answers, qNumber: this.qNumber, testId: this.id }})

            }
        },

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

.answers {
    position: absolute;
    bottom: 50px;
    width: 95vw;
}

.answers button {
    min-width: 40vw !important;
}

.first-line {
    padding-bottom: 0px !important;
}

.second-line {
    padding-top: 0px !important
}
</style>

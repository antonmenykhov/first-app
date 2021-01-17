let currentData = new Date().getFullYear() + '-' + new Date().getMonth() +1+ '-' + new Date().getDate();
const http = 'http://192.168.1.200:1337';
const tests = http+'/tests?_where[StartDate_lte]=' +currentData + '&_where[EndDate_gte]=' +currentData;
const test = http+'/test/';
const auth  = http+'/auth/local';
const register = http+'/auth/local/register';
const checkAnswers = http+'/check/';
export default{
    http, tests, test, auth, register, checkAnswers
}
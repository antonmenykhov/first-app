let currentData = new Date().getFullYear() + '-' + new Date().getMonth() +1+ '-' + new Date().getDate();
const http = 'https://api.menukhov.ru:1337';
const tests = http+'/tests?_where[StartDate_lte]=' +currentData + '&_where[EndDate_gte]=' +currentData;
const test = http+'/test/';
const auth  = http+'/auth/local';
const register = http+'/auth/local/register';
const checkanswers = http+'/check/';
const me = http+'/me/'
const updateuserinfo = http+'/updateuserinfo/'
const gettop = http+'/gettop/'
const gettests = http+'/gettests/'
const upload = http+'/upload/'
export default{
    http, tests, test, auth, register, checkanswers, me,updateuserinfo, gettop, gettests, upload
}
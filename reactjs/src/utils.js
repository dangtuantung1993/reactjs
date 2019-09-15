import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export async function login(email, password) {
    var data = ''
    var token = cookies.get('token')
    var message =''
    try {
       await axios.post(`http://localhost:3000/users/login`,{email,password})
        .then(res => {
        data = res.data
        console.log(data)
        })
        if (data.tokenKey) {         
            token = data.tokenKey
            var date = new Date();
            date.setTime(date.getTime() + (30 * 1000));
            cookies.set('token',data.tokenKey, {
                path: '/',
                expires: date,
            });
        } else {
            message = data.message
        }
    } catch (e) {
        console.log('Post error', e.message);
    }
}

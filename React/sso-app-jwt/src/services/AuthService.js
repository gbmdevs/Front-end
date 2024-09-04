import axios from 'axios';

const API_URL = 'http://localhost:5000';

class AuthService {


    login(email,password){
        return axios.post(`${API_URL}/auth/login`,
            {email,password}, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
        .then(response => {
          localStorage.setItem('token', response.data.token);
        })  
    }

}

const apiServiceInstance = new AuthService();

export default apiServiceInstance;
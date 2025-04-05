const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const ROUTES = {
    USERS: {
        LOGIN: `${BASE_URL}/auth/login`
    },
    EXPENSES:{

    },
    BALANCE:{
          MY: `${BASE_URL}/balance/my`,
          INSERT: `${BASE_URL}/balance`,
          LIST: `${BASE_URL}/balance`
    },
    TYPES:{
        TYPEBALANCE: `${BASE_URL}/types/balance`
    }

}
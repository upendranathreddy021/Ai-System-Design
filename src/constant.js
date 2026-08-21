export const API_BASE_URL="http://localhost:8081/api/system_design_ai"
export const LOCAL_BASE_URL="http://localhost:8081/api/system_design_ai"

export const APIS={

    SIGNUP:{
        VERIFY_OTP:`${LOCAL_BASE_URL}/auth/verifyCode`, //post
        SEND_OTP:`${LOCAL_BASE_URL}/auth/sendCode`,  //post
        CREATE_ACCOUNT:`${LOCAL_BASE_URL}/auth/complete-registration`,  //post
        LOGIN:`${LOCAL_BASE_URL}/auth/login`

    }
}
export const BASIC_URL ='https://backend-kripto.yoelsusanto.com/api/';

export const EMAIL_URL = BASIC_URL +'email';
// https://backend-kripto.yoelsusanto.com/api/email?type=inbox
export const SIGN_IN = BASIC_URL +'gauth/authorization_url'

export const GET_INBOX = EMAIL_URL +'?type=inbox';
export const GET_SENT_EMAILS = EMAIL_URL +'?type=sent';

export const SENT_EMAIL = EMAIL_URL +'?encrypt=false&signature=true';
export const DECRYPT_EMAIL = EMAIL_URL +'/verification?decrypt=false&verify_signature=true'


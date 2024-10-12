import { getText } from "./language";

export const _ERROR = (error) => {
    switch (error) {

        case 'User is not found!':
            return getText('ERROR_USER_NOT_FOUND')

        case 'Incorrect password!':
            return getText('ERROR_USER_INC_PASS')

        case 'Incorrect email or password':
            return getText('ERROR_USER_REG_INC_EM_PS')

        case 'Password mismatch!':
            return getText('ERROR_USER_REG_INC_PS')

        case 'A user with this email already exists':
            return getText('ERROR_USER_REG_EX_EM')

        case 'A user with this login already exists':
            return getText('ERROR_USER_REG_EX_LG')



        default:
            return
    }
}
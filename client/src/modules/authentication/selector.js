import { createSelector } from "@reduxjs/toolkit"
import { CONFIRM_CODE, FORGOT_PASSWORD, LOGIN, SIGN_UP, UPDATE_PASSWORD } from "./actions"

export const userSelector = ({ authentication }) => authentication.user
export const tokenSelector = ({ authentication }) => authentication.token

export const isLoggedSelector = createSelector(
    tokenSelector,
    userSelector,
    (token, user) => !!token && !!user
)

export const loadingLoginSelector = ({ loading }) => !!loading.get(LOGIN.ACTION)
export const errorLoginSelector = ({ error }) => error.get(LOGIN.ACTION)

export const loadingSignUpSelector = ({ loading }) => !!loading.get(SIGN_UP.ACTION)
export const errorSignUpSelector = ({ error }) => error.get(SIGN_UP.ACTION)

export const loadingForgotPasswordSelector = ({ loading }) => !!loading.get(FORGOT_PASSWORD.ACTION)
export const errorForgotPasswordSelector = ({ error }) => error.get(FORGOT_PASSWORD.ACTION)

export const loadingConfirmCodeSelector = ({ loading }) => !!loading.get(CONFIRM_CODE.ACTION)
export const errorConfirmCodeSelector = ({ error }) => error.get(CONFIRM_CODE.ACTION)

export const loadingUpdatePasswordSelector = ({ loading }) => !!loading.get(UPDATE_PASSWORD.ACTION)
export const errorUpdatePasswordSelector = ({ error }) => error.get(UPDATE_PASSWORD.ACTION)
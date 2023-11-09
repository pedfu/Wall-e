import { createSelector } from "@reduxjs/toolkit"
import { LOGIN, SIGN_UP } from "./actions"

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
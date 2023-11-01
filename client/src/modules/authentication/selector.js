import { createSelector } from "@reduxjs/toolkit"
import { LOGIN } from "./actions"

export const userSelector = ({ authentication }) => authentication.user
export const keySelector = ({ authentication }) => authentication.key

export const isLoggedSelector = createSelector(
    keySelector,
    userSelector,
    (key, user) => !!key && !!user
)

export const loadingLoginSelector = ({ loading }) => !!loading.get(LOGIN.ACTION)
export const errorLoginSelector = ({ error }) => error.get(LOGIN.ACTION)
import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
})

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
})

export const signInFailed = (error) => ({
  type: UserActionTypes.SIGN_IN_FAIL,
  payload: error
})  

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword 
}) 

export const signUpStart = userDetails => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userDetails
}) 



export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
})
export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
})
export const signOutFailed = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAIL,
  payload: error
})

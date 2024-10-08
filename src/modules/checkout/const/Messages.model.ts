export enum Messages {
    USER_ALREADY_EXIST = "The user is already exist, cannot register with the same user",
    USER_NOT_FOUND_USER_MESSAGE = "We didn't found your requested user",
    USER_NOT_FOUND = "User was not found",
    GET_USER_ALREADY_SIGNIN_SUCCESS = "You are already logged in; please continue using the same token you received" 
    + " (If you are willing to log in again, please remove the Bearer token from the header, and we will regenerate a new token for you)",
    GET_USER_SIGNIN_SUCCESS = "You logged in successfully; you can now access the services using the created token",
    GET_USER_FAILED = "Oops... something went wrong... , we could not get the requested user, please try again later...",
    GET_USER_REGISTER_ERROR = "Could not register the requested user",
    GET_USER_FAILED_REGISTER = "Oops... something went wrong... , we could not register the requested user, please try again later...",
    USER_LOGIN_SUCCESS = "Now that you are logged in, please use the generated token",
    GET_USER_LOGOUT_SUCCESS = "You are now logged out",
    GET_USER_SIGNUP_SUCCESS = "You are now registered, please login in order to use the service",
    GET_USER_SIGNUP_EXIST_SUCCESS = "The requested user is already exist, you cannot register with the same user, please try to register with another user (email)",
    GET_USER_LOGOUT_FAILED = "Oops... something went wrong... , we we could not logged out your user, please try again later...",
    GET_USER_LOGOUT_ERROR = "Could not logged out the requested user",
    GET_USER_LOGIN_ERROR = "Could not logged in the requested user",
    GET_USER_LOGIN_FAILED = "Oops... something went wrong... , we we could not logged in your user, please try again later..."
}
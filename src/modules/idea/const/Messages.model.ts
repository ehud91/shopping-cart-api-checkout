export enum Messages {
    INSERT_NEW_IDEA_SUCCESS = "The new requested idea added, successfully !",
    INSERT_NEW_IDEA_FAILED = "Oops... something went wrong... , we could not add your requested idea, please try again later...",
    GET_ALL_IDEAS_FAILED = "Oops... something went wrong... , we could not get all ideas, please try again later...",
    GET_ALL_IDEAS_SUCCESS = "Get all ideas",
    GET_ALL_IDEA_SUCCESS = "Got your requested idea",
    GET_ALL_IDEA_FAILED = "Oops... something went wrong... , we could not get the requested idea, please try again later...",
    GET_IDEA_NOT_FOUND = "Your requested idea not found, please try another idea by another ideaId",
    GET_IDEA_UPDATE_NOT_FOUND = "Your requested ideaId not found, we cannot update your requested idea, please try again with another ideaId",
    IDEA_UPDATED_SUCCESS = "Your requested idea updated successfully",
    IDEA_UPDATED_FAILED = "Oops... something went wrong... , we could not get the requested idea, please try to update idea again later...",
    GET_IDEA_FOR_DELETE_NOT_FOUND = "Your requested ideaId not found, we cannot delete your requested idea, please try again with another ideaId",
    IDEA_DELETED_SUCCESS = "Your requested idea deleted successfully"
}
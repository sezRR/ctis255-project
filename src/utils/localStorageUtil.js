import globalState from "../stores/globalState.js";

/**
 * This function is used to update the user in the local storage.
 */
function setNewUsers() {
    const users = JSON.parse(localStorage.getItem("users"));
    const userIndex = users.findIndex(u => u.id === globalState.currentUser.id);
    users[userIndex] = globalState.currentUser;
    localStorage.setItem("users", JSON.stringify(users));
}

export { setNewUsers };
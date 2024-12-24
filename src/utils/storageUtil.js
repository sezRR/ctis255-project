/**
 * Adds item to local storage
 * @param {string} key - key to store the item
 * @param {any} value - value to store
 */
function addItemToLocalStorage(key, value) {
    const items = JSON.parse(localStorage.getItem(key)) || [];
    items.push(value);
    localStorage.setItem(key, JSON.stringify(items));
}


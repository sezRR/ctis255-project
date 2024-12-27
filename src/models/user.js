import Asset from "./asset.js";

class User {
    /**
     * Create a user with a name and a balance, also create an asset with the default balance
     * @param {string} id - The id of the user
     * @param {string} name - The name of the user
     * @param {number} balance - The balance of the user
     * @param {Asset[]} assets - The assets of the user
     * @param {number} day - The day of the user
     * @param {string} lastSelectedAssetId - The id of the last selected asset
     */
    constructor(name, balance = 1000) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.balance = balance;
        this.assets = [new Asset("dollar", balance, 1)];
        this.day = 2;
        this.lastSelectedAssetId = "btc";
    }
}

export default User;
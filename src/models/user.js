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

    /**
    * Add a new asset to the user's portfolio
    * @param {string} id - The id of the asset
    * @param {number} amount - The amount of the asset
    * @param {number} price - The price of the asset
    */
    addAsset(id, amount, price) {
        const existingAsset = this.assets.find(asset => asset.id === id);
        if (existingAsset) {
            existingAsset.amount += amount;
            existingAsset.calculateSubtotal(price);
        } else {
            this.assets.push(new Asset(id, amount, price));
        }
    }

    /**
     * Remove an asset or reduce its amount
     * @param {string} id - The id of the asset
     * @param {number} amount - The amount to remove
     * @param {number} price - The current price of the asset
     * @returns {boolean} - Returns true if the removal is successful
     */
    removeAsset(id, amount, price) {
        const asset = this.assets.find(asset => asset.id === id);
        if (!asset) return false;

        if (asset.amount < amount) {
            throw new Error("Insufficient asset amount to remove.");
        }

        asset.amount -= amount;
        asset.calculateSubtotal(price);

        if (asset.amount === 0) {
            this.assets = this.assets.filter(asset => asset.id !== id);
        }

        return true;
    }
}

export default User;
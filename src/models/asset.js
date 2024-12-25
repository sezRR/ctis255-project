class Asset {
    /**
     * Create an asset
     * @param {string} id - The id of the asset
     * @param {number} amount - The amount of the asset
     * @param {number} lastPrice - The last price of the asset
     */
    constructor(id, amount, lastPrice) {
        this.id = id;
        this.amount = amount;
        this.calculateSubtotal(lastPrice)
    }

    /**
     * Calculate the subtotal of the asset and update the subtotal property
     * @param {number} lastPrice - The last price of the asset
     * @returns {number} The subtotal of the asset
     */
    calculateSubtotal(lastPrice) {
        this.subtotal = this.amount * lastPrice;
        return this.subtotal;
    }
}

export default Asset;

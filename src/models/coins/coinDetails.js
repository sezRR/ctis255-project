class CoinDetails {
    /**
     * Constructor for CoinDetails
     * @param {number} open - The opening price of the coin
     * @param {number} close - The closing price of the coin
     * @param {number} high - The highest price of the coin
     * @param {number} low - The lowest price of the coin
     */
    constructor({ open, close, high, low }) {
        this.open = open;
        this.close = close;
        this.high = high;
        this.low = low;
    }
}

export default CoinDetails;
import CoinDetails from "./coinDetails.js";

class Coin {
    /**
     * Constructor for the Coin class
     * @param {number} id - The id of the coin
     * @param {string} name - The name of the coin
     * @param {string} symbol - The symbol of the coin
     * @param {string} image - The image of the coin
     * @param {CoinDetails} coinDetails - The details of the coin
     */
    constructor({ id, name, symbol, image, coinDetails }) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.image = image;
        this.coinDetails = coinDetails;
    }
}

export default Coin;
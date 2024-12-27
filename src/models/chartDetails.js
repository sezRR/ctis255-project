class ChartDetails {
    /**
     * Constructor for ChartDetails
     * 
     * @param {number} scale
     * @param {number} lowerLimit
     * @param {number} upperLimit
     * @param {number} lastClose
     */
    constructor(scale, lowerLimit, upperLimit, lastClose) {
        this.scale = scale;
        this.lowerLimit = lowerLimit;
        this.upperLimit = upperLimit;
        this.lastClose = lastClose;
    }
}

export default ChartDetails
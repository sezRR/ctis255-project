class Asset {
    /**
     *
     */
    constructor(id,amount,lastprice) {
        this.id=id;
        this.amount=amount
        this.calculateSubtotal(lastprice);
    }
    calculateSubtotal(lastprice)
    {
        this.subtotal=this.amount*lastprice;
        return this.subtotal;
    }
}

export default Asset;

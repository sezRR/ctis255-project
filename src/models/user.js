import Asset from "./asset.js";    
class User{
    /**
     *
     */
    constructor(name,balance=100) {
        this.id = crypto.randomUUID();
        this.name=name;
        this.balance=balance;
        this.assets = [ new Asset("dollar",balance,1)];
        this.updatedAt = new Date().getTime();
    }
  
}

export default User;
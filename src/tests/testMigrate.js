const User = require('../models/User');
const sequelize = require('../utils/connection');

require('../models/User')
require('../models/Category')
require('../models/Product')
require('../models/ProductImg')
require('../models/Cart')
require('../models/Purchase')
require('../models')

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({
            firstName: "Felipe",
            lastName: "Super",
            email: "felipe@gmail.com",
            password: "12345678",
            phone: "1234567890"
          })
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();
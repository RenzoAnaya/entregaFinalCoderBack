import Products from '../models/productModel.js';
import User from '../models/userModel.js';

class productsDao {
    async getAll(query = {}){
        try{
            return await Products.find(query)
        }catch(error){
            console.log(`Error al buscar lo productos de la db.  ${error}`)
        }
    }

    async getByCategory(category){
        try{
            return await Products.find({category})
        }catch(error){
            console.log(`Error al buscar los productos por categoria en la db. ${error}`)
        }
    }

    async get(id){
        try{
            return await Products.findById(id)
        }catch(error){
            console.log(`No se pudo encontrar el producto en la db. ${error}`)
        }
    }

    async create(product){
        try{
            return await Products.create(product)
        }catch(error){
            console.log(`Error al crear el producto en la db. ${error}`)
        }
    }

    async update(id, updateProduct){
        try{
            return await Products.findByIdAndUpdate(id, updateProduct)
        }catch(error){
            console.log(`No se pudo actualizar el producto. ${error}`)
        }
    }

    async delete(id){
        try{
            return await Products.findByIdAndDelete(id)
        }catch(error){
            console.log(`No se pudo eliminar el producto de la db. ${error}`)
        }
    }

    async addProductToCart(productId, quantity, userId){
        const user = await User.findOne({ _id: userId });
         console.log(user);
         const productToAdd = {
         product: productId,
         quantity,
         };
         user.cart.push(productToAdd);
         user.save();
    }
}

export default new productsDao();
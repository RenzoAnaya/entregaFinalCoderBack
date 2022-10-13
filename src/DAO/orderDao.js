import Orders from '../models/orderModel.js'

class ordersDao{
    async getAll(query = {}) {
        try {
          return await Orders.find(query);
        } catch (error) {
          console.log(`Error al buscar las órdenes en la db . ${error}`);
        }
      }
    
      async get(user) {
        try {
          return await Orders.findOne({ userEmail: user.email });
        } catch (error) {
          console.log(`Error al buscar producto en la db . ${error}`);
        }
      }
    
      async create(orderData) {
        try {
          return await Orders.create(orderData);
        } catch (error) {
          console.log(`Error al crear producto en la db. ${error}`);
        }
      }
    
      async update(id, updatedProduct) {
        try {
          return await Orders.findByIdAndUpdate(id, updatedProduct);
        } catch (error) {
          console.log(`Error al actualizar producto en la db. ${error}`);
        }
      }
    
      async delete(id) {
        try {
          return await Orders.findByIdAndDelete(id);
        } catch (error) {
          console.log(`Error al borrar producto en la db . ${error}`);
        }
      }
}

export default new ordersDao();
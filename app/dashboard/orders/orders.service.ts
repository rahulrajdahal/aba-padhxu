import { OrderRepository } from "./orders.dal";
import { CreateOrderDTO, PatchOrderDTO, PutOrderDTO } from "./orders.dto";

export const OrderService = {
  createOrder: async (data: CreateOrderDTO) => {
    return await OrderRepository.create(data);
  },

  findAllOrders: async (query: string, limit = 10, page = 1) => {
    return await OrderRepository.findAll(query, limit, page);
  },

  findOrderById: async (id: string) => {
    return await OrderRepository.findById(id);
  },

  putOrderById: async (id: string, data: PutOrderDTO) => {
    return await OrderRepository.updateById(id, data);
  },

  patchOrderById: async (id: string, data: PatchOrderDTO) => {
    return await OrderRepository.updateById(id, data);
  },

  deleteOrderById: async (id: string) => {
    return await OrderRepository.removeById(id);
  },
};

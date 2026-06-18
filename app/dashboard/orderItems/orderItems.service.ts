import {
  CreateOrderItemDTO,
  PatchOrderItemDTO,
  PutOrderItemDTO,
} from "./orderItems.dto";
import { OrderItemRepository } from "./ordersItems.dal";

export const OrderItemService = {
  createOrderItem: async (data: CreateOrderItemDTO) => {
    return await OrderItemRepository.create(data);
  },

  findAllOrders: async (query: string, limit = 10, page = 1) => {
    return await OrderItemRepository.findAll(query, limit, page);
  },

  findOrderById: async (id: string) => {
    return await OrderItemRepository.findById(id);
  },

  putOrderById: async (id: string, data: PutOrderItemDTO) => {
    return await OrderItemRepository.updateById(id, data);
  },

  patchOrderById: async (id: string, data: PatchOrderItemDTO) => {
    return await OrderItemRepository.updateById(id, data);
  },

  deleteOrderById: async (id: string) => {
    return await OrderItemRepository.removeById(id);
  },
};

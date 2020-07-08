import { Request, Response } from 'express'
import knex from '../database/connection';

class ItemController {
  async index (request: Request, responde:Response) {
    const items = await knex('item').select('*');
    // SELECT * FROM items
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        //image_url: `http://localhost:3333/uploads/${item.image}`,
        image_url: `http://192.168.1.128:3333/uploads/${item.image}`,
      };
    });

    return responde.json(serializedItems);
    }
}

export default ItemController;

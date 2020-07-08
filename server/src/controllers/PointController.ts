import { Request, Response } from 'express'
import knex from '../database/connection';

class PointController {
  async index (request: Request, response: Response) {
    const { city, uf, items } = request.query;
    const parsedItem = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    const points = await knex('point')
      .select('point.*')
      .join('point_item', 'point.id', '=', 'point_item.point_id')
      .whereIn('point_item.item_id', parsedItem)   
      .where('city', city !== undefined
                     ? '='
                     : '<>',
                     String(city))
      .where('uf', uf !== undefined
                   ? '='
                   : '<>',
                   String(uf))
      .distinct();

      const serializedPoints = points.map(point => {
        return {
          ...point,
          image_url: `http://192.168.1.128:3333/uploads/${point.image}`,
        };
      });
    
    return response.json(points);
  }; 

  async show (request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex('point').where('id', id).first();

    if (!point) response.status(400).json({ message: 'Ponto não encontrado. '});

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.1.128:3333/uploads/${point.image}`,
    };

    const items = await knex('item')
      .select('item.title')  
      .join('point_item', 'item.id', '=', 'point_item.item_id')
      .where('point_item.point_id', id);

    response.json({ point: serializedPoint, items });

  };

  async create (request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;
  
    const trx = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    }
  
    const insertedIds = await trx('point').insert(point);
  
    const point_id = insertedIds[0];

    console.log('items', items);
    const listPointItem = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => { 
      return {
        item_id,
        point_id,
      }
    });
    
    await trx('point_item').insert(listPointItem);
  
    await trx.commit();
   
    response.json({
      id: point_id,
      ...point,
      items: listPointItem,
    });
  }
}

export default PointController;
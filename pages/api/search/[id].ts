import type { NextApiRequest, NextApiResponse } from 'next';

import { searchPostsQuery, searchUsersQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { id }: any = req.query;
      const videosQuery = searchPostsQuery(id);
      const usersQuery = searchUsersQuery(id);
      
      const videos = await client.fetch(videosQuery);
      const accounts = await client.fetch(usersQuery);

      res.status(200).json({ videos, accounts });
      
    } catch (error) {
      console.log(error)
      res.status(404).json({videos:{},accounts:{}})
    }
  }
}

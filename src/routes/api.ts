import express, { Request, Response } from  'express';
import { getStructuredJson } from '../services/llmServices';
import { fetchRestaurant } from '../services/fourSquareServices';
import { emitWarning } from 'process';
import { error } from 'console';

const router = express.Router();

router.get('/execute', async (req: Request, res: Response) => {
    const { message, code } = req.query;

    if (code !== 'pioneerdevai') {
        return res.status(401).json({ error: 'Unauthorized'});
    }
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid message parameter.'});
    }

    try{
        const structured = await getStructuredJson(message);
        console.log(structured);
        const restaurants = await fetchRestaurant(structured.parameters)
        console.log(restaurants);
        res.json(restaurants)
    }catch (err){
        console.log(err)
        res.status(500).json({ error: 'Internal Server error.'})
    }
});

export default router;
import express from 'express'
import respond from './utils/respond'

const app = express()
const port = 3333


app.get('/', (req, res) => {
    res.send('Phaste');
});


app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
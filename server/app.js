import express from 'express'
import bodyParser from "body-parser";
import cors from "cors";
import { VertexAI } from '@google-cloud/vertexai';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  "extended": true
}));
app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const vertexAI = new VertexAI({ project: process.env.GCLOUD_PROJECT_ID, location: 'us-central1' });

    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-flash-001',
    });

    const prompt = req.body.prompt

    const resp = await generativeModel.generateContent(prompt);
    const contentResponse = await resp.response;
    const text = contentResponse["candidates"][0]["content"]["parts"][0]["text"]
    res.send({ "text": text })
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
import express from "express";
import type { Request, Response } from 'express';

const router = express.Router();


/**
 * @swagger
 * /:
 *   get:
 *     summary: API health check / landing page
 *     description: Returns a simple HTML page to verify backend is running
 *     tags: [General]
 *     responses:
 *       200:
 *         description: HTML page loaded successfully
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */

router.get("/", (req: Request, res: Response) => {
    res.send(`
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-color: #f0f2f5;
                    color: #333;
                    margin: 0;
                    padding: 50px;
                }
                h1 {
                    color: #2c3e50;
                    margin-bottom: 20px;
                }
                h2 {
                    color: #16a085;
                    margin-top: 0;
                }
                hr {
                    margin: 30px auto;
                    width: 50%;
                    border: 1px solid #ccc;
                }
            </style>
        </head>
        <body>
            <h1>Simple Deployment of Backend</h1>
            <hr>
            <h2>Backend on Render</h2>
        </body>
        </html>
    `);
});

export default router;

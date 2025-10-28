// import express from 'express';
// import path from 'path';

// import {dirName} from '../../utilities/file.js';
const express = require("express");
const path = require("path");

// const {dirName} = require("../../utilities/file.js");

// const __dirname = dirName(import.meta.url);
// const HTML_DIR = path.join(process.cwd(), 'static', 'html');
// const HTML_DIR = path.join(__dirname, 'static', 'html');
// const HTML_DIR = path.join('static', 'html');
const HTML_DIR = path.join(__dirname, '..', '..', 'static', 'html');

const htmlRoute = express.Router();

// htmlRoute.get('/', (req, res) => {
//   res.sendFile(path.join(HTML_DIR, 'index.html'));
// });

htmlRoute.get('/test-led', (req, res) => {
  res.sendFile(path.join(HTML_DIR, 'test-led-2.html'));
});

htmlRoute.get('/test-camera', (req, res) => {
  res.sendFile(path.join(HTML_DIR, 'test-led-camera.html'));
});

module.exports = htmlRoute;

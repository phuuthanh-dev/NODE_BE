const express = require('express');

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const serviceRoutes = require('./serviceRoutes');
const koiFishBreedRoutes = require('./koiFishBreedRoutes');
const zodiacRoutes = require('./zodiacRoutes');
const pondFeatureRoutes = require('./pondFeatureRoutes')
const destinyRoutes = require("./destinyRoutes")
const directionRoutes = require("./directionRoutes")
const advertisementRouter = require('./advertisementRoutes');
const balanceRoutes = require('./balanceRoutes');
const paymentRoutes = require('./paymentRoutes');
const transactionRoutes = require('./transactionRoutes');
const fengShuiRoutes = require('./fengShuiRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const consultationRotes = require('./consultationRoutes');

let initWebRoutes = (app) => {
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", serviceRoutes);
  app.use("/api/v1", koiFishBreedRoutes);
  app.use("/api/v1", zodiacRoutes);
  app.use("/api/v1", pondFeatureRoutes)
  app.use("/api/v1", destinyRoutes)
  app.use("/api/v1", directionRoutes)
  app.use("/api/v1", advertisementRouter);
  app.use("/api/v1", balanceRoutes);
  app.use("/api/v1", paymentRoutes);
  app.use("/api/v1", transactionRoutes);
  app.use("/api/v1", fengShuiRoutes);
  app.use("/api/v1", dashboardRoutes);
  app.use("/api/v1", consultationRotes);

};

module.exports = initWebRoutes;

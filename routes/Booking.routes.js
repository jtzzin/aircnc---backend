const express = require('express');
const BookingController = require('../controllers/Booking.controller');
const routes = express.Router();

// Endpoint para criar reserva:
// Recebe o id do spot na URL, e usa o método POST
routes.post('/spots/:spot_id/bookings', BookingController.store);

// Endpoint para listar reservas do usuário logado
routes.get('/bookings', BookingController.index);

// Endpoint para atualizar o status da reserva (aprovar ou recusar)
// Recebe o id da reserva na URL e usa PUT para atualizar
routes.put('/bookings/:booking_id', BookingController.update);

module.exports = routes;
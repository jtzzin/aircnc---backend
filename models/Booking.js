const mongoose = require('mongoose');

// Definindo o esquema da reserva
const BookingSchema = new mongoose.Schema({
  // Data da reserva (string, obrigatória)
  date: { type: String, required: true },

  // Status da reserva (se foi aprovada ou não), padrão é false (não aprovada)
  approved: { type: Boolean, default: false },

  // Usuário que está fazendo a reserva (referência para o model User)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Spot que está sendo reservado (referência para o model Spots)
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spots',
    required: true
  }
}, {
  // timestamps para criar createdAt e updatedAt automaticamente
  timestamps: true
});

// Exporta o modelo para usar nas outras partes da aplicação
module.exports = mongoose.model('Booking', BookingSchema);
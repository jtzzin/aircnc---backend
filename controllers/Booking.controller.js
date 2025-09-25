const Booking = require('../models/Booking');

module.exports = {
    // Criar uma nova reserva
    async store(req, res) {
        // Pega o id do spot da rota e a data do corpo
        const { spot_id } = req.params;
        const { date } = req.body;
        // Pega o user_id do header (que vem do usuário logado)
        const user_id = req.headers.user_id;

       
        if (!user_id) {
            console.warn('Tentativa de criar reserva sem user_id no header.');
            return res.status(401).json({ error: 'É necessário um ID de usuário logado (user_id no header) para fazer uma reserva.' });
        }
        
        //  LOG de debug melhorado para ver os valores
        console.log(`Tentativa de reserva: Spot ID: ${spot_id}, User ID: ${user_id}, Data: ${date}`);

        try {
            // Cria uma nova reserva no banco com os dados passados
            const booking = await Booking.create({
                date,
                user: user_id,
                spot: spot_id
            });

            // Retorna o objeto da reserva criada, status 201 = criado com sucesso
            return res.status(201).json(booking);
        } catch (error) {
            // Se for um erro de validação do Mongoose (como user_id/spot_id inválido ou campo faltando)
            if (error.name === 'ValidationError') {
                console.error('Erro de validação ao criar reserva:', error.message);
                return res.status(400).json({ error: 'Falha na validação dos dados enviados.', details: error.message });
            }
            
            // Outros erros internos (ex: conexão com o DB, etc.)
            console.error('Erro interno ao criar reserva:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao criar reserva' });
        }
    },

    // Listar todas as reservas do usuário logado
    async index(req, res) {
        try {
            // Pega o id do usuário do header
            const user_id = req.headers.user_id;

            if (!user_id) {
                return res.status(401).json({ error: 'É necessário um ID de usuário para listar as reservas.' });
            }

            // Busca todas as reservas desse usuário, e popula o campo "spot"
            const bookings = await Booking.find({ user: user_id })
                .populate('spot')
                .sort({ createdAt: -1 });

            // Retorna as reservas encontradas em formato JSON
            return res.json(bookings);
        } catch (error) {
            // Se der erro, retorna mensagem e status 500
            console.error('Erro ao listar reservas:', error);
            return res.status(500).json({ error: 'Erro ao listar reservas' });
        }
    },

    // Atualizar o status da reserva (exemplo: aprovar ou recusar)
    async update(req, res) {
        try {
            // Pega o id da reserva da rota
            const { booking_id } = req.params;
            // Pega se foi aprovada ou não do corpo da requisição
            const { approved } = req.body;

            // Procura a reserva pelo id
            const booking = await Booking.findById(booking_id);
            if (!booking) {
                // Se não encontrar a reserva, retorna erro 404
                return res.status(404).json({ error: 'Reserva não encontrada' });
            }

            // Atualiza o campo "approved"
            booking.approved = approved;
            // Salva a alteração no banco
            await booking.save();

            // Retorna a reserva atualizada
            return res.json(booking);
        } catch (error) {
            // Se der erro, retorna erro 500 com mensagem
            console.error('Erro ao atualizar reserva:', error);
            return res.status(500).json({ error: 'Erro ao atualizar reserva' });
        }
    }
};
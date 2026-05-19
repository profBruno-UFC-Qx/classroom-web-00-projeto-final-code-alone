import { errors } from '@strapi/utils';
const { ApplicationError } = errors;

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    const userId = data.usuario;
    const exemplarId = data.exemplar;

    if (!userId || !exemplarId) return;

    const novoExemplar = await strapi.entityService.findOne('api::exemplar.exemplar', exemplarId, {
      populate: { livro: true },
    }) as any;

    if (!novoExemplar || !novoExemplar.livro) {
      throw new ApplicationError('Exemplar ou Livro não encontrado.');
    }

    const categoriaNovoLivro = novoExemplar.livro.categoria; 

    const emprestimosAtivos = await strapi.entityService.findMany('api::emprestimo.emprestimo', {
      filters: {
        users_permissions_user: userId,
        data_devolucao_real: { $null: true }, 
      },
      populate: {
        exemplar: {
          populate: { livro: true }
        }
      }
    } as any);

    const totalNaCategoria = (emprestimosAtivos || []).filter(
      (emp: any) => emp.exemplar?.livro?.categoria === categoriaNovoLivro
    ).length;

    if (totalNaCategoria >= 2) {
      throw new ApplicationError(
        `Limite excedido! Você já possui ${totalNaCategoria} livros da categoria "${categoriaNovoLivro}" pendentes de devolução.`
      );
    }
  },

  async beforeUpdate(event) {
    const { where, data } = event.params;

    if (!data.data_devolucao_prevista) return;

    const { id } = where;
    const emprestimoAtual = await (strapi.entityService.findOne('api::emprestimo.emprestimo', id, {
      populate: {
        exemplar: {
          populate: { livro: true }
        }
      }
    } as any)) as any;

    if (!emprestimoAtual || !emprestimoAtual.exemplar?.livro) return;

    const livroId = emprestimoAtual.exemplar.livro.id;

    const reservasAtivas = await strapi.entityService.findMany('api::reserva.reserva' as any, {
      filters: {
        livro: livroId,
        status: 'Pendente' 
      }
    } as any);

    if (reservasAtivas && reservasAtivas.length > 0) {
      throw new ApplicationError(
        'Renovação indisponível: este livro já foi reservado por outro leitor.'
      );
    }
  }
};
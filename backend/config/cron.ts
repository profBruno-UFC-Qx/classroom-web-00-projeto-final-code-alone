export default {
  // Executa todos os dias à meia-noite (00:00)
  '* * * * *': async ({ strapi }: { strapi: any }) => {
    console.log('====== [CRON] Iniciando cálculo diário de multas do BibliQX ======');

    try {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const emprestimosAtrasados = await strapi.entityService.findMany('api::emprestimo.emprestimo', {
        filters: {
          data_devolucao_real: { $null: true },
          Data_devolucao_prevista: { $lt: hoje.toISOString().split('T')[0] }
        }
      } as any);

      console.log(`[CRON] Encontrados ${emprestimosAtrasados.length} empréstimos em atraso.`);

      for (const emprestimo of emprestimosAtrasados) {
        const dataPrevista = new Date(emprestimo.Data_devolucao_prevista);
        dataPrevista.setHours(0, 0, 0, 0);

        const diferencaTempo = hoje.getTime() - dataPrevista.getTime();
        const diasAtraso = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

        if (diasAtraso > 0) {
          const novaMulta = diasAtraso * 0.50;

          await strapi.entityService.update('api::emprestimo.emprestimo', emprestimo.id, {
            data: {
              Multa_acumulada: novaMulta
            }
          } as any);

          console.log(`[CRON] Empréstimo ID ${emprestimo.id}: ${diasAtraso} dias de atraso. Multa atualizada para R$ ${novaMulta.toFixed(2)}`);
        }
      }

      console.log('====== [CRON] Processamento de multas concluído com sucesso! ======');
    } catch (error) {
      console.error('[CRON ERROR] Falha ao rodar a rotina de multas:', error);
    }
  },
};
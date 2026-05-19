export default {
  register() {},

  async bootstrap({ strapi }) {
    console.log('====== [TESTE] Iniciando Seeding de Dados no BibliQX ======');

    try {
      // 1. Verifica se o registro de teste já existe para evitar duplicações no SQLite
      const testesExistentes = await strapi.entityService.findMany('api::emprestimo.emprestimo', {
        filters: { documentId: 'cenario-teste-multa-01' }
      } as any);

      if (testesExistentes && testesExistentes.length > 0) {
        console.log('[TESTE] Cenário de teste já está presente no SQLite.');
      } else {
        // 2. Cria uma data de devolução prevista retroativa (4 dias atrás) para simular o atraso
        const dataPrevista = new Date();
        dataPrevista.setDate(dataPrevista.getDate() - 4);

        // 3. Insere o registro de empréstimo vencido e não devolvido para disparar a multa
        const novoEmprestimo = await strapi.entityService.create('api::emprestimo.emprestimo', {
          data: {
            documentId: 'cenario-teste-multa-01',
            Data_emprestimo: new Date().toISOString().split('T')[0],
            Data_devolucao_prevista: dataPrevista.toISOString().split('T')[0],
            data_devolucao_real: null, // Mantido NULO para caracterizar que não foi devolvido
            Multa_acumulada: 0.0,      // Começa zerado para que o Cron Job faça o cálculo
            publishedAt: new Date().toISOString(),
          }
        } as any);

        console.log(`[TESTE] Sucesso! Empréstimo criado com ID: ${novoEmprestimo.id}. Vencimento: ${dataPrevista.toISOString().split('T')[0]}`);
      }

      // ====================================================================
      // 4. CORREÇÃO DE CAMINHO: Forçar execução da Cron apontando para a pasta certa
      // ====================================================================
      console.log('[TESTE] Forçando execução imediata da rotina de multas...');
      
      // Ajustamos o caminho relativo saindo de dist/src/ para chegar em dist/config/
      const rotinaCron = require('../config/cron').default;
      const funcaoDeCobranca = rotinaCron['* * * * *']; 

      if (funcaoDeCobranca) {
        await funcaoDeCobranca({ strapi });
      } else {
        console.warn('[TESTE] Não foi possível carregar a função do cron. Verifique o gatilho.');
      }

    } catch (err) {
      console.error('[TESTE ERROR] Falha crítica ao executar o ambiente de testes:', err);
    }
  },
};
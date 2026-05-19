import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // ADICIONE ESTE BLOCO ABAIXO para ativar as tarefas agendadas (Cron)
  cron: {
    enabled: true,
  },
});

export default config;
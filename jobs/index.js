const Agenda = require('agenda');
const agenda = new Agenda({
  db: {
    address: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`,
    collection: 'agendaJob',
    options: {
    },
},
useUnifiedTopology: true,
});

require('./exam')(agenda);

agenda.start();

// For shutdown
async function gracefulShutdown() {
  console.log('Agenda shut down');
  await agenda.stop();
  process.exit(0);
}
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = agenda;

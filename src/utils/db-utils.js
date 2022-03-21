const { readTalkers, writeTalkers } = require('./fs-utils');

const getAllTalkers = () => readTalkers();

const getTalkerById = async (id) => {
  const talkers = await getAllTalkers();
  const wantedTalker = talkers.find((talker) => talker.id === id);

  return wantedTalker;
};

const getAvailableId = async () => {
  const talkers = await readTalkers();
  const lastId = talkers.reduce((maxId, { id }) => (
    id > maxId ? id : maxId
  ), 0);

  return lastId + 1;
};

const addTalker = async (talker) => {
  const talkers = await readTalkers();
  talkers.push(talker);
  await writeTalkers(talkers);
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  getAvailableId,
  addTalker,
};

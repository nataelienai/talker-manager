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

const editTalker = async (editedTalker) => {
  const talkers = await readTalkers();
  const index = talkers.findIndex((talker) => talker.id === editedTalker.id);

  talkers[index] = { ...editedTalker, talk: { ...editedTalker.talk } };
  await writeTalkers(talkers);
};

const removeTalker = async (id) => {
  const talkers = await readTalkers();
  const updatedTalkers = talkers.filter((talker) => talker.id !== id);

  await writeTalkers(updatedTalkers);
};

const getTalkersByName = async (name) => {
  const talkers = await readTalkers();

  return talkers.filter((talker) => talker.name.includes(name));
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  getAvailableId,
  addTalker,
  editTalker,
  removeTalker,
  getTalkersByName,
};

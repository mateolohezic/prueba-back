const Log = require('../model/log');

const getLogs = async (req, res) => {
    try {
        const log = await Log.find({})
        res.status(200).send(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createLog = async (description) => {
    try {
      const currentDate = new Date();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');
      const formattedDate = `${hours}:${minutes}:${seconds} ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  
      const newLog = new Log({
        date: formattedDate,
        description,
      });
  
      await newLog.save();
      console.log('log creado');
    } catch (error) {
      console.log({ error: error.message });
    }
  };

module.exports = { getLogs, createLog};
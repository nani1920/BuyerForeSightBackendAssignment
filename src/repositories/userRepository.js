/** @format */
const { getDb } = require("../../lib/db/dbConnect");
const createProspect = async (data) => {
  try {
    const db = getDb();
    const { name, email, phone, company } = data;
    const query = `insert into prospects (name,email,phone,company) 
    values ('${name}','${email}','${phone}','${company}')`;
    return await db.run(query);
  } catch (e) {
    console.log(e);
  }
};

const getAllProspects = async () => {
  try {
    const db = getDb();
    const query = `select * from prospects`;
    return await db.all(query);
  } catch (e) {
    console.log(e);
  }
};

const getProspectById = async (id) => {
  try {
    const db = getDb();
    const query = `select * from prospects where id=${id}`;
    return await db.get(query);
  } catch (e) {
    console.log(e);
  }
};
const getProspectByMail = async (mail) => {
  try {
    const db = getDb();
    const query = `select * from prospects where email='${mail}'`;
    return await db.get(query);
  } catch (e) {
    console.log(e);
  }
};

const updateProspectById = async (id, data) => {
  try {
    const { name, email, phone, company } = data;
    const db = getDb();
    const query = `update prospects 
    set name='${name}', email='${email}', phone='${phone}', company='${company}' 
    where id=${id}`;
    return await db.run(query);
  } catch (e) {
    console.log(e);
  }
};

const deleteProspectById = async (id) => {
  try {
    const db = getDb();
    const query = `delete from prospects where id=${id}`;
    return await db.run(query);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createProspect,
  getAllProspects,
  getProspectById,
  getProspectByMail,
  updateProspectById,
  deleteProspectById,
};

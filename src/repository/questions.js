const db = require("../database/mysql")


async function listQuestions() {
    const sql = "SELECT * FROM frequent_questions"
    return await db.execute(sql)
}


async function createQuestion({question, answer}) {
    const sql = "INSERT INTO frequent_questions (question, answer) VALUES (?, ?)"
    const resp = await db.execute(sql, [question, answer])
    return retrieveQuestion(resp.insertId)
}


async function retrieveQuestion(id) {
    const sql = "SELECT * FROM frequent_questions WHERE id = ?"
    const questions = await db.execute(sql, [id])
    return questions.length > 0 ? questions[0] : undefined
}


async function updateQuestion(id, {question, answer}) {
    const sql = "UPDATE frequent_questions SET question = ?, answer = ? WHERE id = ?"
    await db.execute(sql, [question, answer, id])
    return retrieveQuestion(id)
}


async function deleteQuestion(id) {
    const sql = "DELETE FROM frequent_questions WHERE id = ?"
    await db.execute(sql, [id])
}


module.exports = {
    listQuestions, createQuestion, retrieveQuestion,
    updateQuestion, deleteQuestion
}
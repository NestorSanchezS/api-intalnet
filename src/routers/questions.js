const { Router } = require("express")
const { levelStaff, levelSuperUser } = require("../middlewares/permissions")
const { listQuestions, createQuestion, updateQuestion, deleteQuestion, retrieveQuestion } = require("../repository/questions")


const router = Router()


router.get("", async (req, res) => {
    const questions = await listQuestions()
    res.json(questions)
})


router.post("", [levelStaff], async (req, res) => {
    const question = await createQuestion(req.body)
    res.json(question)
})


router.put("/:id", [levelStaff], async (req, res) => {
    let question = await retrieveQuestion(req.params.id)
    if (!question) return res.status(404).json({error: "Not found"})

    question = await updateQuestion(req.params.id, req.body)
    res.json(question)
})


router.delete("/:id", [levelSuperUser], async (req, res) => {
    const question = await retrieveQuestion(req.params.id)
    if (!question) return res.status(404).send()

    await deleteQuestion(req.params.id)
    res.status(204).send()
})


module.exports = router

// const users = require("../../../models/users");
// //USERS
// const getUsers = ((req, res) => {
//     // res.json(users.find())
//     res.render("admin/users/users", {layout: 'admin/dashboard'});
// })
//
// const getUser = ((req, res) => {
//     const id = Number(req.params.userId);
//     const user = users.find(user => user.id === id)
//
//     if (!user) {
//         return res.status(404).send('user not found')
//     }
//     res.json(user)
// })
// const updateUser = ((req, res) => {
//     const id = Number(req.params.UserID)
//     const index = users.findIndex(user => user.id === id)
//     const updatedUser = {
//         id: users[index].id,
//         name: req.body.name,
//     }
//
//     users[index] = updatedUser
//     res.status(200).json('user updated')
// })
//
// const deleteUser= ((req, res) => {
//     const id = Number(req.params.UserID)
//     const index = users.findIndex(user => user.id === id)
//     users.splice(index,1)
//     res.status(200).json('user deleted')
// })
// module.exports = {
//     getUsers,
//     getUser,
//     updateUser,
//     deleteUser,
// }
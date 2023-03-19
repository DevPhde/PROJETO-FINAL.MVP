import { Router } from "express";
import { AuthMiddleware } from "../Middleware/authMiddleware.js";
import { RegisterController } from "../modules/user/userRegister/controller/registerController.js";
import { AuthorizationController } from "../modules/user/userAuthorization/controller/authorizationController.js";
import { RecoveryPasswordController } from "../modules/user/recoveryPassword/controller/recoveryPasswordController.js";
import { EditProfileController } from "../modules/user/editProfile/controller/editProfileController.js";
import { DeleteUserController } from "../modules/user/deleteAccount/controller/deleteUserAccountController.js";
import { TypeExpensesController } from "../modules/expenses/typeExpense/controller/typeExpensesController.js";
import { ListExpensesController } from "../modules/expenses/listExpenses/controller/listExpensesController.js";
import { NewExpensesController } from "../modules/expenses/createExpense/controller/newExpensesController.js";
import { EditExpensesController } from "../modules/expenses/editExpense/controller/editExpensesController.js";
import { DeleteExpensesController } from "../modules/expenses/deleteExpense/controller/deleteExpensesController.js";


export const router = Router();

router
    .get('/', (req,res) => { res.status(200).send('CONNECTION OK')})
    .post('/validate/user', AuthMiddleware.authentication, (req, res) => {res.status(200).send('TOKEN OK')})
    .post('/validationfield', RegisterController.validateField)
    .post('/new/user', RegisterController.userRegistration)
    .post('/user/authorization', AuthorizationController.verifyUserAuthenticity)
    .post('/user/recoverypassword', RecoveryPasswordController.recoveryPassword)
    .put('/user/editprofile', AuthMiddleware.authentication, EditProfileController.editProfile)
    .delete('/user/deleteaccount', AuthMiddleware.authentication, DeleteUserController.deleteUser)
    .get('/expenses/types',  TypeExpensesController.listTypeExpenses)
    .post('/expenses/types/new', TypeExpensesController.createNewTypeExpense)
    .delete('/expenses/types/delete/:id', TypeExpensesController.deleteTypeExpense)
    .get('/expenses', AuthMiddleware.authentication, ListExpensesController.listExpenses)
    .post('/new/expenses', AuthMiddleware.authentication, NewExpensesController.createExpense)
    .put('/expenses/edit/:id', AuthMiddleware.authentication, EditExpensesController.editExpense)
    .delete('/expenses/delete/:id', AuthMiddleware.authentication, DeleteExpensesController.deleteExpense)
    .get('/revenues', AuthMiddleware.authentication)
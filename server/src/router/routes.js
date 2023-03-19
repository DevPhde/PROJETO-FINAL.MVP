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
import { ListRevenuesController } from "../modules/revenues/listRevenues/controller/listRevenuesController.js";
import { CreateRevenueController } from "../modules/revenues/createRevenue/controller/createRevenueController.js";
import { EditRevenuesController } from "../modules/revenues/editRevenue/controller/editRevenuesController.js";
import { DeleteRevenuesController } from "../modules/revenues/deleteRevenue/controller/deleteRevenuesController.js";
import { UserInformationsController } from "../modules/user/dashboard/controller/userInformationsController.js";
import { UserIRController } from "../modules/impostoDeRenda/controller/userIRController.js";

export const router = Router();

router
    .get('/', (req,res) => { res.status(200).send('CONNECTION OK')})
    .get('/validate/user', AuthMiddleware.authentication, (req, res) => {res.status(200).send('TOKEN OK')})
    .get('/user/informations', AuthMiddleware.authentication, UserInformationsController.userInformations)
    .get('/user/informations/total/values', AuthMiddleware.authentication, UserInformationsController.totalValues)
    .get('/user/informations/total/types', AuthMiddleware.authentication, UserInformationsController.graphStatus)
    .post('/validatefield', RegisterController.validateField)
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
    .get('/revenues', AuthMiddleware.authentication, ListRevenuesController.listRevenues)
    .post('/new/revenue', AuthMiddleware.authentication, CreateRevenueController.createRevenue)
    .put('/revenues/edit/:id', AuthMiddleware.authentication, EditRevenuesController.editRevenue)
    .delete('/revenues/delete/:id', AuthMiddleware.authentication, DeleteRevenuesController.deleteRevenue)
    .post('/user/IR', AuthMiddleware.authentication, UserIRController.calculateRevenue)
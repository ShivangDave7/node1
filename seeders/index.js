/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password':'tXUfHQVzgYqYo_s',
      'isDeleted':false,
      'username':'Freida_Wiza29',
      'email':'Lessie56@yahoo.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username':'Freida_Wiza29' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password':'zhIjrPqgNF61Q9A',
      'isDeleted':false,
      'username':'Rylee59',
      'email':'Retha.Bradtke15@yahoo.com',
      'isActive':true,
      'userType':authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username':'Rylee59' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'User', 'Admin', 'System_User' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'User',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/departments/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/departments/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/departments/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/departments/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/enterprise/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/enterprise/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/enterprise/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/enterprise/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/encounter/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/encounter/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/encounter/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/encounter/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/encounter/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/encounter/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/encounter/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/encounter/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/encounter/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/encounter/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/encounter/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/encounter/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/note/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/note/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/note/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/note/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/note/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/note/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/note/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/note/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/note/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/note/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/note/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/note/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/medication/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/medication/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/medication/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/medication/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/orderitem/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/orderitem/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/orderitem/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/orderitem/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/orderitem/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/order/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/order/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/order/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/order/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/order/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patient/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/patient/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/patient/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/patient/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/patient/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/patient/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patient/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patient/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patient/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patient/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/patient/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/patient/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/customer/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/customer/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/customer/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/customer/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/customer/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/plan/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/plan/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/plan/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/plan/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/plan/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/plan/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/plan/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plan/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/plan/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plan/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/plan/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/plan/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/task/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/task/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/task/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/task/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/task/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/task/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/task/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/task/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/task/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/task/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/task/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/task/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/comment/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/todo/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/todo/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/todo/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/todo/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/todo/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/todo/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/todo/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/todo/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/todo/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/todo/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/todo/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/todo/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_schedule/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_schedule/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_schedule/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_schedule/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/appointment_schedule/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_schedule/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_schedule/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_schedule/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_schedule/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_schedule/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_schedule/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/appointment_schedule/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/event/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/event/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/event/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/event/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/event/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_slot/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_slot/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_slot/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_slot/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/appointment_slot/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/appointment_slot/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_slot/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_slot/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_slot/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_slot/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/appointment_slot/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/appointment_slot/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/master/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/master/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/master/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/master/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/master/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/master/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/master/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/master/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blog/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/blog/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'User',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'User',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'User', 'Admin', 'System_User' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Freida_Wiza29',
      'password':'tXUfHQVzgYqYo_s'
    },{
      'username':'Rylee59',
      'password':'zhIjrPqgNF61Q9A'
    }];
    const defaultRole = await dbService.findOne(Role, { code: 'SYSTEM_USER' });
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        userRolesArr.push({
          userId: user.id,
          roleId: defaultRole.id
        });
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();

};
module.exports = seedData;
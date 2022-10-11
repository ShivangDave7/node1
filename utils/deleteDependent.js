/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Departments = require('../model/departments');
let Enterprise = require('../model/enterprise');
let Encounter = require('../model/encounter');
let Note = require('../model/note');
let Medication = require('../model/medication');
let OrderItem = require('../model/orderItem');
let Order = require('../model/order');
let Patient = require('../model/patient');
let Customer = require('../model/Customer');
let Plan = require('../model/Plan');
let Task = require('../model/Task');
let Chat_message = require('../model/Chat_message');
let Comment = require('../model/Comment');
let Chat_group = require('../model/Chat_group');
let ToDo = require('../model/ToDo');
let Appointment_schedule = require('../model/Appointment_schedule');
let Event = require('../model/Event');
let Appointment_slot = require('../model/Appointment_slot');
let Master = require('../model/Master');
let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteDepartments = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Departments,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEnterprise = async (filter) =>{
  try {
    let enterprise = await dbService.findMany(Enterprise,filter);
    if (enterprise && enterprise.length){
      enterprise = enterprise.map((obj) => obj.id);

      const departmentsFilter = { $or: [{ enterprises : { $in : enterprise } }] };
      const departmentsCnt = await dbService.deleteMany(Departments,departmentsFilter);

      let deleted  = await dbService.deleteMany(Enterprise,filter);
      let response = { departments :departmentsCnt, };
      return response; 
    } else {
      return {  enterprise : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEncounter = async (filter) =>{
  try {
    let encounter = await dbService.findMany(Encounter,filter);
    if (encounter && encounter.length){
      encounter = encounter.map((obj) => obj.id);

      const noteFilter = { $or: [{ encounterId : { $in : encounter } }] };
      const noteCnt = await dbService.deleteMany(Note,noteFilter);

      let deleted  = await dbService.deleteMany(Encounter,filter);
      let response = { note :noteCnt, };
      return response; 
    } else {
      return {  encounter : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteNote = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Note,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMedication = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Medication,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrderItem = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(OrderItem,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrder = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Order,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePatient = async (filter) =>{
  try {
    let patient = await dbService.findMany(Patient,filter);
    if (patient && patient.length){
      patient = patient.map((obj) => obj.id);

      const orderFilter = { $or: [{ patientId : { $in : patient } }] };
      const orderCnt = await dbService.deleteMany(Order,orderFilter);

      let deleted  = await dbService.deleteMany(Patient,filter);
      let response = { order :orderCnt, };
      return response; 
    } else {
      return {  patient : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteCustomer = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Customer,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deletePlan = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Plan,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTask = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Task,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_message = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chat_message,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteComment = async (filter) =>{
  try {
    let comment = await dbService.findMany(Comment,filter);
    if (comment && comment.length){
      comment = comment.map((obj) => obj.id);

      const CommentFilter = { $or: [{ parentItem : { $in : comment } }] };
      const CommentCnt = await dbService.deleteMany(Comment,CommentFilter);

      let deleted  = await dbService.deleteMany(Comment,filter);
      let response = { Comment :CommentCnt, };
      return response; 
    } else {
      return {  comment : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = { Chat_message :Chat_messageCnt, };
      return response; 
    } else {
      return {  chat_group : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteToDo = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ToDo,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAppointment_schedule = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Appointment_schedule,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteEvent = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Event,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteAppointment_slot = async (filter) =>{
  try {
    let appointment_slot = await dbService.findMany(Appointment_slot,filter);
    if (appointment_slot && appointment_slot.length){
      appointment_slot = appointment_slot.map((obj) => obj.id);

      const Appointment_scheduleFilter = { $or: [{ slot : { $in : appointment_slot } }] };
      const Appointment_scheduleCnt = await dbService.deleteMany(Appointment_schedule,Appointment_scheduleFilter);

      let deleted  = await dbService.deleteMany(Appointment_slot,filter);
      let response = { Appointment_schedule :Appointment_scheduleCnt, };
      return response; 
    } else {
      return {  appointment_slot : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMaster = async (filter) =>{
  try {
    let master = await dbService.findMany(Master,filter);
    if (master && master.length){
      master = master.map((obj) => obj.id);

      const MasterFilter = { $or: [{ parentId : { $in : master } }] };
      const MasterCnt = await dbService.deleteMany(Master,MasterFilter);

      let deleted  = await dbService.deleteMany(Master,filter);
      let response = { Master :MasterCnt, };
      return response; 
    } else {
      return {  master : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Blog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const departmentsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const departmentsCnt = await dbService.deleteMany(Departments,departmentsFilter);

      const enterpriseFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const enterpriseCnt = await dbService.deleteMany(Enterprise,enterpriseFilter);

      const encounterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const encounterCnt = await dbService.deleteMany(Encounter,encounterFilter);

      const noteFilter = { $or: [{ provider : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const noteCnt = await dbService.deleteMany(Note,noteFilter);

      const medicationFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const medicationCnt = await dbService.deleteMany(Medication,medicationFilter);

      const orderItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const orderItemCnt = await dbService.deleteMany(OrderItem,orderItemFilter);

      const orderFilter = { $or: [{ orderBy : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const orderCnt = await dbService.deleteMany(Order,orderFilter);

      const patientFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const patientCnt = await dbService.deleteMany(Patient,patientFilter);

      const CustomerFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const CustomerCnt = await dbService.deleteMany(Customer,CustomerFilter);

      const PlanFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const PlanCnt = await dbService.deleteMany(Plan,PlanFilter);

      const TaskFilter = { $or: [{ completedBy : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const TaskCnt = await dbService.deleteMany(Task,TaskFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt = await dbService.deleteMany(Comment,CommentFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt = await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const ToDoFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ToDoCnt = await dbService.deleteMany(ToDo,ToDoFilter);

      const Appointment_scheduleFilter = { $or: [{ host : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Appointment_scheduleCnt = await dbService.deleteMany(Appointment_schedule,Appointment_scheduleFilter);

      const EventFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const EventCnt = await dbService.deleteMany(Event,EventFilter);

      const Appointment_slotFilter = { $or: [{ userId : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Appointment_slotCnt = await dbService.deleteMany(Appointment_slot,Appointment_slotFilter);

      const MasterFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const MasterCnt = await dbService.deleteMany(Master,MasterFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt = await dbService.deleteMany(Blog,BlogFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        departments :departmentsCnt,
        enterprise :enterpriseCnt,
        encounter :encounterCnt,
        note :noteCnt,
        medication :medicationCnt,
        orderItem :orderItemCnt,
        order :orderCnt,
        patient :patientCnt,
        Customer :CustomerCnt,
        Plan :PlanCnt,
        Task :TaskCnt,
        Chat_message :Chat_messageCnt,
        Comment :CommentCnt,
        Chat_group :Chat_groupCnt,
        ToDo :ToDoCnt,
        Appointment_schedule :Appointment_scheduleCnt,
        Event :EventCnt,
        Appointment_slot :Appointment_slotCnt,
        Master :MasterCnt,
        Blog :BlogCnt,
        user :userCnt + deleted,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countDepartments = async (filter) =>{
  try {
    const departmentsCnt =  await dbService.count(Departments,filter);
    return { departments : departmentsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEnterprise = async (filter) =>{
  try {
    let enterprise = await dbService.findMany(Enterprise,filter);
    if (enterprise && enterprise.length){
      enterprise = enterprise.map((obj) => obj.id);

      const departmentsFilter = { $or: [{ enterprises : { $in : enterprise } }] };
      const departmentsCnt =  await dbService.count(Departments,departmentsFilter);

      let response = { departments : departmentsCnt, };
      return response; 
    } else {
      return {  enterprise : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countEncounter = async (filter) =>{
  try {
    let encounter = await dbService.findMany(Encounter,filter);
    if (encounter && encounter.length){
      encounter = encounter.map((obj) => obj.id);

      const noteFilter = { $or: [{ encounterId : { $in : encounter } }] };
      const noteCnt =  await dbService.count(Note,noteFilter);

      let response = { note : noteCnt, };
      return response; 
    } else {
      return {  encounter : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countNote = async (filter) =>{
  try {
    const noteCnt =  await dbService.count(Note,filter);
    return { note : noteCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMedication = async (filter) =>{
  try {
    const medicationCnt =  await dbService.count(Medication,filter);
    return { medication : medicationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrderItem = async (filter) =>{
  try {
    const orderItemCnt =  await dbService.count(OrderItem,filter);
    return { orderItem : orderItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrder = async (filter) =>{
  try {
    const orderCnt =  await dbService.count(Order,filter);
    return { order : orderCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPatient = async (filter) =>{
  try {
    let patient = await dbService.findMany(Patient,filter);
    if (patient && patient.length){
      patient = patient.map((obj) => obj.id);

      const orderFilter = { $or: [{ patientId : { $in : patient } }] };
      const orderCnt =  await dbService.count(Order,orderFilter);

      let response = { order : orderCnt, };
      return response; 
    } else {
      return {  patient : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countCustomer = async (filter) =>{
  try {
    const CustomerCnt =  await dbService.count(Customer,filter);
    return { Customer : CustomerCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countPlan = async (filter) =>{
  try {
    const PlanCnt =  await dbService.count(Plan,filter);
    return { Plan : PlanCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTask = async (filter) =>{
  try {
    const TaskCnt =  await dbService.count(Task,filter);
    return { Task : TaskCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_message = async (filter) =>{
  try {
    const Chat_messageCnt =  await dbService.count(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countComment = async (filter) =>{
  try {
    let comment = await dbService.findMany(Comment,filter);
    if (comment && comment.length){
      comment = comment.map((obj) => obj.id);

      const CommentFilter = { $or: [{ parentItem : { $in : comment } }] };
      const CommentCnt =  await dbService.count(Comment,CommentFilter);

      let response = { Comment : CommentCnt, };
      return response; 
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = { Chat_message : Chat_messageCnt, };
      return response; 
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countToDo = async (filter) =>{
  try {
    const ToDoCnt =  await dbService.count(ToDo,filter);
    return { ToDo : ToDoCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAppointment_schedule = async (filter) =>{
  try {
    const Appointment_scheduleCnt =  await dbService.count(Appointment_schedule,filter);
    return { Appointment_schedule : Appointment_scheduleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countEvent = async (filter) =>{
  try {
    const EventCnt =  await dbService.count(Event,filter);
    return { Event : EventCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countAppointment_slot = async (filter) =>{
  try {
    let appointment_slot = await dbService.findMany(Appointment_slot,filter);
    if (appointment_slot && appointment_slot.length){
      appointment_slot = appointment_slot.map((obj) => obj.id);

      const Appointment_scheduleFilter = { $or: [{ slot : { $in : appointment_slot } }] };
      const Appointment_scheduleCnt =  await dbService.count(Appointment_schedule,Appointment_scheduleFilter);

      let response = { Appointment_schedule : Appointment_scheduleCnt, };
      return response; 
    } else {
      return {  appointment_slot : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countMaster = async (filter) =>{
  try {
    let master = await dbService.findMany(Master,filter);
    if (master && master.length){
      master = master.map((obj) => obj.id);

      const MasterFilter = { $or: [{ parentId : { $in : master } }] };
      const MasterCnt =  await dbService.count(Master,MasterFilter);

      let response = { Master : MasterCnt, };
      return response; 
    } else {
      return {  master : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
    const BlogCnt =  await dbService.count(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const departmentsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const departmentsCnt =  await dbService.count(Departments,departmentsFilter);

      const enterpriseFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const enterpriseCnt =  await dbService.count(Enterprise,enterpriseFilter);

      const encounterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const encounterCnt =  await dbService.count(Encounter,encounterFilter);

      const noteFilter = { $or: [{ provider : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const noteCnt =  await dbService.count(Note,noteFilter);

      const medicationFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const medicationCnt =  await dbService.count(Medication,medicationFilter);

      const orderItemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const orderItemCnt =  await dbService.count(OrderItem,orderItemFilter);

      const orderFilter = { $or: [{ orderBy : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const orderCnt =  await dbService.count(Order,orderFilter);

      const patientFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const patientCnt =  await dbService.count(Patient,patientFilter);

      const CustomerFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const CustomerCnt =  await dbService.count(Customer,CustomerFilter);

      const PlanFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const PlanCnt =  await dbService.count(Plan,PlanFilter);

      const TaskFilter = { $or: [{ completedBy : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const TaskCnt =  await dbService.count(Task,TaskFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt =  await dbService.count(Comment,CommentFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

      const ToDoFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ToDoCnt =  await dbService.count(ToDo,ToDoFilter);

      const Appointment_scheduleFilter = { $or: [{ host : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Appointment_scheduleCnt =  await dbService.count(Appointment_schedule,Appointment_scheduleFilter);

      const EventFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const EventCnt =  await dbService.count(Event,EventFilter);

      const Appointment_slotFilter = { $or: [{ userId : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Appointment_slotCnt =  await dbService.count(Appointment_slot,Appointment_slotFilter);

      const MasterFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const MasterCnt =  await dbService.count(Master,MasterFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt =  await dbService.count(Blog,BlogFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        departments : departmentsCnt,
        enterprise : enterpriseCnt,
        encounter : encounterCnt,
        note : noteCnt,
        medication : medicationCnt,
        orderItem : orderItemCnt,
        order : orderCnt,
        patient : patientCnt,
        Customer : CustomerCnt,
        Plan : PlanCnt,
        Task : TaskCnt,
        Chat_message : Chat_messageCnt,
        Comment : CommentCnt,
        Chat_group : Chat_groupCnt,
        ToDo : ToDoCnt,
        Appointment_schedule : Appointment_scheduleCnt,
        Event : EventCnt,
        Appointment_slot : Appointment_slotCnt,
        Master : MasterCnt,
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteDepartments = async (filter,updateBody) =>{  
  try {
    const departmentsCnt =  await dbService.updateMany(Departments,filter);
    return { departments : departmentsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEnterprise = async (filter,updateBody) =>{  
  try {
    let enterprise = await dbService.findMany(Enterprise,filter, { id:1 });
    if (enterprise.length){
      enterprise = enterprise.map((obj) => obj.id);

      const departmentsFilter = { '$or': [{ enterprises : { '$in' : enterprise } }] };
      const departmentsCnt = await dbService.updateMany(Departments,departmentsFilter,updateBody);
      let updated = await dbService.updateMany(Enterprise,filter,updateBody);

      let response = { departments :departmentsCnt, };
      return response;
    } else {
      return {  enterprise : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEncounter = async (filter,updateBody) =>{  
  try {
    let encounter = await dbService.findMany(Encounter,filter, { id:1 });
    if (encounter.length){
      encounter = encounter.map((obj) => obj.id);

      const noteFilter = { '$or': [{ encounterId : { '$in' : encounter } }] };
      const noteCnt = await dbService.updateMany(Note,noteFilter,updateBody);
      let updated = await dbService.updateMany(Encounter,filter,updateBody);

      let response = { note :noteCnt, };
      return response;
    } else {
      return {  encounter : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteNote = async (filter,updateBody) =>{  
  try {
    const noteCnt =  await dbService.updateMany(Note,filter);
    return { note : noteCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMedication = async (filter,updateBody) =>{  
  try {
    const medicationCnt =  await dbService.updateMany(Medication,filter);
    return { medication : medicationCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrderItem = async (filter,updateBody) =>{  
  try {
    const orderItemCnt =  await dbService.updateMany(OrderItem,filter);
    return { orderItem : orderItemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrder = async (filter,updateBody) =>{  
  try {
    const orderCnt =  await dbService.updateMany(Order,filter);
    return { order : orderCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePatient = async (filter,updateBody) =>{  
  try {
    let patient = await dbService.findMany(Patient,filter, { id:1 });
    if (patient.length){
      patient = patient.map((obj) => obj.id);

      const orderFilter = { '$or': [{ patientId : { '$in' : patient } }] };
      const orderCnt = await dbService.updateMany(Order,orderFilter,updateBody);
      let updated = await dbService.updateMany(Patient,filter,updateBody);

      let response = { order :orderCnt, };
      return response;
    } else {
      return {  patient : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteCustomer = async (filter,updateBody) =>{  
  try {
    const CustomerCnt =  await dbService.updateMany(Customer,filter);
    return { Customer : CustomerCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeletePlan = async (filter,updateBody) =>{  
  try {
    const PlanCnt =  await dbService.updateMany(Plan,filter);
    return { Plan : PlanCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTask = async (filter,updateBody) =>{  
  try {
    const TaskCnt =  await dbService.updateMany(Task,filter);
    return { Task : TaskCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_message = async (filter,updateBody) =>{  
  try {
    const Chat_messageCnt =  await dbService.updateMany(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteComment = async (filter,updateBody) =>{  
  try {
    let comment = await dbService.findMany(Comment,filter, { id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj.id);

      const CommentFilter = { '$or': [{ parentItem : { '$in' : comment } }] };
      const CommentCnt = await dbService.updateMany(Comment,CommentFilter,updateBody);
      let updated = await dbService.updateMany(Comment,filter,updateBody);

      let response = { Comment :CommentCnt, };
      return response;
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_group = async (filter,updateBody) =>{  
  try {
    let chat_group = await dbService.findMany(Chat_group,filter, { id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = { Chat_message :Chat_messageCnt, };
      return response;
    } else {
      return {  chat_group : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteToDo = async (filter,updateBody) =>{  
  try {
    const ToDoCnt =  await dbService.updateMany(ToDo,filter);
    return { ToDo : ToDoCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAppointment_schedule = async (filter,updateBody) =>{  
  try {
    const Appointment_scheduleCnt =  await dbService.updateMany(Appointment_schedule,filter);
    return { Appointment_schedule : Appointment_scheduleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteEvent = async (filter,updateBody) =>{  
  try {
    const EventCnt =  await dbService.updateMany(Event,filter);
    return { Event : EventCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteAppointment_slot = async (filter,updateBody) =>{  
  try {
    let appointment_slot = await dbService.findMany(Appointment_slot,filter, { id:1 });
    if (appointment_slot.length){
      appointment_slot = appointment_slot.map((obj) => obj.id);

      const Appointment_scheduleFilter = { '$or': [{ slot : { '$in' : appointment_slot } }] };
      const Appointment_scheduleCnt = await dbService.updateMany(Appointment_schedule,Appointment_scheduleFilter,updateBody);
      let updated = await dbService.updateMany(Appointment_slot,filter,updateBody);

      let response = { Appointment_schedule :Appointment_scheduleCnt, };
      return response;
    } else {
      return {  appointment_slot : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMaster = async (filter,updateBody) =>{  
  try {
    let master = await dbService.findMany(Master,filter, { id:1 });
    if (master.length){
      master = master.map((obj) => obj.id);

      const MasterFilter = { '$or': [{ parentId : { '$in' : master } }] };
      const MasterCnt = await dbService.updateMany(Master,MasterFilter,updateBody);
      let updated = await dbService.updateMany(Master,filter,updateBody);

      let response = { Master :MasterCnt, };
      return response;
    } else {
      return {  master : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody) =>{  
  try {
    const BlogCnt =  await dbService.updateMany(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const departmentsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const departmentsCnt = await dbService.updateMany(Departments,departmentsFilter,updateBody);

      const enterpriseFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const enterpriseCnt = await dbService.updateMany(Enterprise,enterpriseFilter,updateBody);

      const encounterFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const encounterCnt = await dbService.updateMany(Encounter,encounterFilter,updateBody);

      const noteFilter = { '$or': [{ provider : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const noteCnt = await dbService.updateMany(Note,noteFilter,updateBody);

      const medicationFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const medicationCnt = await dbService.updateMany(Medication,medicationFilter,updateBody);

      const orderItemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const orderItemCnt = await dbService.updateMany(OrderItem,orderItemFilter,updateBody);

      const orderFilter = { '$or': [{ orderBy : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const orderCnt = await dbService.updateMany(Order,orderFilter,updateBody);

      const patientFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const patientCnt = await dbService.updateMany(Patient,patientFilter,updateBody);

      const CustomerFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const CustomerCnt = await dbService.updateMany(Customer,CustomerFilter,updateBody);

      const PlanFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const PlanCnt = await dbService.updateMany(Plan,PlanFilter,updateBody);

      const TaskFilter = { '$or': [{ completedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const TaskCnt = await dbService.updateMany(Task,TaskFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const CommentFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const CommentCnt = await dbService.updateMany(Comment,CommentFilter,updateBody);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_groupCnt = await dbService.updateMany(Chat_group,Chat_groupFilter,updateBody);

      const ToDoFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ToDoCnt = await dbService.updateMany(ToDo,ToDoFilter,updateBody);

      const Appointment_scheduleFilter = { '$or': [{ host : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Appointment_scheduleCnt = await dbService.updateMany(Appointment_schedule,Appointment_scheduleFilter,updateBody);

      const EventFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const EventCnt = await dbService.updateMany(Event,EventFilter,updateBody);

      const Appointment_slotFilter = { '$or': [{ userId : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Appointment_slotCnt = await dbService.updateMany(Appointment_slot,Appointment_slotFilter,updateBody);

      const MasterFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const MasterCnt = await dbService.updateMany(Master,MasterFilter,updateBody);

      const BlogFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const BlogCnt = await dbService.updateMany(Blog,BlogFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        departments :departmentsCnt,
        enterprise :enterpriseCnt,
        encounter :encounterCnt,
        note :noteCnt,
        medication :medicationCnt,
        orderItem :orderItemCnt,
        order :orderCnt,
        patient :patientCnt,
        Customer :CustomerCnt,
        Plan :PlanCnt,
        Task :TaskCnt,
        Chat_message :Chat_messageCnt,
        Comment :CommentCnt,
        Chat_group :Chat_groupCnt,
        ToDo :ToDoCnt,
        Appointment_schedule :Appointment_scheduleCnt,
        Event :EventCnt,
        Appointment_slot :Appointment_slotCnt,
        Master :MasterCnt,
        Blog :BlogCnt,
        user :userCnt + updated,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteDepartments,
  deleteEnterprise,
  deleteEncounter,
  deleteNote,
  deleteMedication,
  deleteOrderItem,
  deleteOrder,
  deletePatient,
  deleteCustomer,
  deletePlan,
  deleteTask,
  deleteChat_message,
  deleteComment,
  deleteChat_group,
  deleteToDo,
  deleteAppointment_schedule,
  deleteEvent,
  deleteAppointment_slot,
  deleteMaster,
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countDepartments,
  countEnterprise,
  countEncounter,
  countNote,
  countMedication,
  countOrderItem,
  countOrder,
  countPatient,
  countCustomer,
  countPlan,
  countTask,
  countChat_message,
  countComment,
  countChat_group,
  countToDo,
  countAppointment_schedule,
  countEvent,
  countAppointment_slot,
  countMaster,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteDepartments,
  softDeleteEnterprise,
  softDeleteEncounter,
  softDeleteNote,
  softDeleteMedication,
  softDeleteOrderItem,
  softDeleteOrder,
  softDeletePatient,
  softDeleteCustomer,
  softDeletePlan,
  softDeleteTask,
  softDeleteChat_message,
  softDeleteComment,
  softDeleteChat_group,
  softDeleteToDo,
  softDeleteAppointment_schedule,
  softDeleteEvent,
  softDeleteAppointment_slot,
  softDeleteMaster,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};

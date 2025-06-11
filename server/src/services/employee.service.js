const { PrismaClient } = require('@prisma/client');
const { ConflictError, NotFoundError, BadRequestError } = require('../errors/errors');

const prisma = new PrismaClient();

// Create Employee
const createEmployee = async (adminId, employeeData) => {
  const adminCheck = await prisma.user.findFirst({
      where: { id: adminId, role: "ADMIN" },
    });
  
    if (!adminCheck) {
      throw new BadRequestError("Unauthorized access");
    }
  const existingEmployee = await prisma.employee.findUnique({ where: { email: employeeData.email } });
  if (existingEmployee) throw new ConflictError('Employee with this email already exists');
  const employee = await prisma.employee.create({ data: employeeData });
  return employee;
};

// Edit Employee
const updateEmployee = async (adminId, employeeId, updateData) => {
  const adminCheck = await prisma.user.findFirst({
    where: { id: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }
    const existingEmployee = await prisma.existingEmployee.findUnique({ where: { email: employeeData.email } });
    if (existingEmployee) throw new ConflictError('Employee with this email already exists');

     let updatedFields = {};
      if(updateData.name) updatedFields.name = updateData.name;
      if(updateData.email) updatedFields.email = updateData.email;
      if(updateData.position) updatedFields.position = updateData.position;
      if(updateData.department) updatedFields.department = updateData.department;
      if (updateData.dateOfJoining) updatedFields.dateOfJoining = updateData.dateOfJoining;
      if (updateData.phoneNumber) updatedFields.phoneNumber = updateData.phoneNumber;

    const employee = await prisma.employee.update({
      where: { id: employeeId },
      data: updatedFields,
    });
    return employee;
};

// Delete Employee
const deleteEmployee = async (adminId, employeeId) => {
  const adminCheck = await prisma.user.findFirst({
    where: { id: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }
    const employee = await prisma.employee.delete({ where: { id: employeeId } });
    if(!employee) throw new NotFoundError("Employee not found");
    return employee;
};

// Filter/Search Employees
const searchEmployees = async (adminId, filters) => {
  const adminCheck = await prisma.user.findFirst({
    where: { id: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }
  // filters: { name, email, department, position, attendanceStatus }
  const employees = await prisma.employee.findMany({
    where: {
      ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
      ...(filters.email && { email: { contains: filters.email, mode: 'insensitive' } }),
      ...(filters.department && { department: filters.department }),
      ...(filters.position && { position: filters.position }),
      ...(filters.attendanceStatus && { attendanceStatus: filters.attendanceStatus }),
    },
    orderBy: { createdAt: 'desc' },
  });
  if(employees.length=='0') throw NotFoundError("No employee exists");
  return employees;
};

const getEmployeeById = async (adminId, employeeId) => {
  const adminCheck = await prisma.user.findFirst({
    where: { id: adminId, role: "ADMIN" },
  });

  if (!adminCheck) {
    throw new BadRequestError("Unauthorized access");
  }
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });
  if (!employee) {
    throw new NotFoundError("Employee not found");
  }
  return employee;
};

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  getEmployeeById
};

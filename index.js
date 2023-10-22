function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  // Example usage:
  const employeeRecords = createEmployeeRecords([
    ["John", "Doe", "Manager", 20],
    ["Jane", "Smith", "Employee", 15]
  ]);
  
  createTimeInEvent(employeeRecords[0], "2018-01-01 0800");
  createTimeOutEvent(employeeRecords[0], "2018-01-01 1600");
  console.log(wagesEarnedOnDate(employeeRecords[0], "2018-01-01")); // Calculate wages for a specific date
  console.log(allWagesFor(employeeRecords[0])); // Calculate total wages for the employee
  console.log(calculatePayroll(employeeRecords)); // Calculate total payroll for all employees
  
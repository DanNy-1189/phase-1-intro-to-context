function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}
function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(array => createEmployeeRecord(array));
}
function createTimeInEvent(record, date) {
    const newTimeInEvents = {
      type: "TimeIn",
      hour: parseInt(date.slice(-4)),
      date: date.slice(0, 10)
    }
    record.timeInEvents.push(newTimeInEvents)
    return record
  }
  
  function createTimeOutEvent(record, date) {
    const newTimeOutEvents = {
      type: "TimeOut",
      hour: parseInt(date.slice(-4)),
      date: date.slice(0, 10)
    }
    record.timeOutEvents.push(newTimeOutEvents)
    return record
  }
  
  function hoursWorkedOnDate(record, date) {
    const timeIn = record.timeInEvents.find(e => e.date === date);
    const timeOut = record.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour)/100;
  }
  
  function wagesEarnedOnDate(record, date) {
    return hoursWorkedOnDate(record, date) * record.payPerHour;
  }
  
  function allWagesFor(record) {
    const allWages = record.timeInEvents.map(e => wagesEarnedOnDate(record, e.date));
    return allWages.reduce((total, wage) => total + wage);
  }
  
  function calculatePayroll(records) {
    const totalForEachEmployee = records.map(record => allWagesFor(record))
    return totalForEachEmployee.reduce((total, employTotal) => total + employTotal)
  }
  
  function findEmployeeByFirstName(collection, name) {
    return collection.find(record => record.firstName === name);
  }
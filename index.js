/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


function createEmployeeRecord(employeeDetails){
    return {
        firstName: employeeDetails[0],
        familyName: employeeDetails[1],
        title: employeeDetails[2],
        payPerHour: employeeDetails[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(multipleEmployeesDetails){
    if(!multipleEmployeesDetails) return

    const employeeRecords = []
    for(const employee of multipleEmployeesDetails){
        employeeRecords.push(createEmployeeRecord(employee))   
    }

    return employeeRecords
}

function createTimeInEvent(dateStamp){
    this.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(dateStamp.split(" ")[1]),
            date: dateStamp.split(" ")[0]
        }
    )

    return this
}

function createTimeOutEvent(dateStamp){
    this.timeOutEvents.push(
        {
            type: "TimeOut",
            hour: parseInt(dateStamp.split(" ")[1]),
            date: dateStamp.split(" ")[0]
        }
    )

    return this
}


function hoursWorkedOnDate(date){
    const timeInDetails = this.timeInEvents.find(timeInEvent =>{
        return timeInEvent.date == date.split(" ")[0]
    })

    const timeOutDetails = this.timeOutEvents.find(timeOutEvent =>{
        return timeOutEvent.date == date.split(" ")[0]
    })

    return Math.abs(timeOutDetails.hour - timeInDetails.hour)/100
}

function wagesEarnedOnDate(date){
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    return this.payPerHour * hoursWorked
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employeeRecord =>{
        return employeeRecord.firstName == firstName
    })
}

function calculatePayroll(multipleEmployeeRecords){

    if(!multipleEmployeeRecords) return

    let payroll = 0
    for(const employeeRecord of multipleEmployeeRecords){
        console.log(employeeRecord)
        payroll += allWagesFor.call(employeeRecord, employeeRecord)
    }

    return payroll
}
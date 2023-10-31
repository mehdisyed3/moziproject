import React, { useState } from 'react';

function App() {
  const [textareaValue, setTextareaValue] = useState('');
  const [rateOfInterest, setRateOfInterest] = useState('');
  const [daysInMonth, setDaysInMonth] = useState('');
  const [generatedData, setGeneratedData] = useState(null);
  const [startingBalance, setStartingBalance] = useState('');

  // console.log('>>>rateOfInterest', rateOfInterest)

  const clickHandler = () => {
    const arr = textareaValue.split('')

    // const startingBalance = 3000
    //  console.log('>>>> ',Math)
    const extract = []
    let string = []

    for (let i = 0; i < arr.length; i++) {

      let isNumber = parseInt(arr[i])

      if (isNumber || arr[i] === '0' || arr[i] === '/' || arr[i] === '(' || arr[i] === ')'|| arr[i]=== '.') {
        string.push(arr[i])
      }
      if (arr[i] === '\t' || arr[i] === '\n' || i === arr.length - 1) {
        string.join('')
        extract.push(string)
        string = []
      }
    }

    const valueArr = extract?.map(item => item.length > 0 && item.join('')).filter(item => item)

    // block to have array of date and amoune
    const finalArray = []
    if (valueArr?.length > 0 && valueArr.length % 2 === 0) {
      for (let j = 0; j < valueArr?.length; j += 2) {
        // Push a pair of elements into the new array
        finalArray.push([valueArr[j], valueArr[j + 1]]);
      }
    }
    finalArray?.reverse()

    // console.log('>>>> EXTRACT', finalArray)

    let previousDayOfMonth = 1
    let amount = startingBalance
    let accumulatedInterestAmount = 0
    const interestRate = ((rateOfInterest / 100) / 365)


    console.log('>>> 30', interestRate)

    //loop to calculate

    for (let x = 0; x < finalArray.length; x++) {

      const date = new Date(finalArray[x][0]);
      const dayOfMonth = date.getDate();

      console.log('>>> days on interest', dayOfMonth - previousDayOfMonth)
      let interestRateSinceLastTransaction = (dayOfMonth - previousDayOfMonth) * interestRate * amount
      accumulatedInterestAmount = accumulatedInterestAmount + interestRateSinceLastTransaction
      // console.log('>>> accumulated interestRate', accumulatedInterestAmount)

      if (finalArray[x][1].startsWith('(') && finalArray[x][1].endsWith(')')) {
        // Remove the parentheses and convert to a negative number

        amount = amount - Number(finalArray[x][1].slice(1, -1));
      } else {
        // Convert to a regular number

        amount = Number(amount) + Number(finalArray[x][1]);
      }
      // console.log('>>> previousDay', x, previousDayOfMonth)
      // amount = amount + finalArray[x][2]
      previousDayOfMonth = dayOfMonth

      // console.log('>>>> x DAY OF MOnth', dayOfMonth)
      // console.log('>>> amount inside', x, amount)

    }

    if (previousDayOfMonth < daysInMonth) {
      // console.log('>>> prepreviousDayOfMonth', previousDayOfMonth)
      let interestRateSinceLastLoop = previousDayOfMonth * interestRate * amount
      accumulatedInterestAmount = accumulatedInterestAmount + interestRateSinceLastLoop
      //6266
      // console.log('>>>>> IF NOT LAST DAY', accumulatedInterestAmount)
    }

    setGeneratedData({
      accumulatedInterestAmount,
      totalAmountAtMonthEnd : amount
    })


  }

  const resetHandler = () => {
    setDaysInMonth('');
    setTextareaValue('');
    setRateOfInterest('');
    setGeneratedData(null);
    setStartingBalance('');
  };


  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  return (
    <div style={{ marginLeft: '20px', marginTop:'5%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
      <div style={{display:'flex'}}>
          <label style={{ marginTop: '15px' }}>Starting Balance: </label>
          <input style={{ width: '90px', marginTop: '15px', marginLeft:'5px' }} type='number' value={startingBalance} onChange={(e) => setStartingBalance(e.target.value)} />
        </div>
        <div style={{display:'flex'}}>
          <label style={{ marginTop: '15px' }}>Interest Rate: </label>
          <input style={{ width: '50px', marginTop: '15px', marginLeft:'5px' }} type='number' value={rateOfInterest} onChange={(e) => setRateOfInterest(e.target.value)} />
        </div>
        <div style={{display:'flex'}}>
          <label style={{ marginTop: '15px' }}>Days In Month : </label>
          <input style={{ width: '35px', marginTop: '15px', marginLeft:'5px'}} type='number' value={daysInMonth}  onChange={(e) => setDaysInMonth(e.target.value)} />
        </div>
        <div style={{display:'flex'}}>
        <textarea
          type="text"
          style={{ width: '600px', height: '300px', marginTop: '15px' }} // Set the width to 400 pixels
          value={textareaValue}
          onChange={handleTextareaChange}
        />
        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
        <button style={{ width: '200px', marginTop: '15px',  }} disabled={!rateOfInterest || !daysInMonth || !textareaValue || !startingBalance} onClick={clickHandler}>{!rateOfInterest || !daysInMonth || !textareaValue || !startingBalance ? 'Please Enter Values' : 'Calculate'}</button>
        <button style={{ width: '200px', marginTop: '15px',  }}  onClick={resetHandler}>Reset</button>

        </div>

        <>
        {generatedData?.totalAmountAtMonthEnd > 0 && generatedData?.accumulatedInterestAmount>0 &&
          <p>
          The total interest amount accumulated at the end of the month is ${generatedData.accumulatedInterestAmount?.toFixed(4)} with closing balance of ${generatedData.totalAmountAtMonthEnd}
        </p>}
        </>


      </div>
    </div>
  );
}

export default App;

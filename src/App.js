import { abi } from "./abi"
import { useState } from "react"
import './App.css'
import React from "react"



let contractToken = "0xac7a5A4Cd4AFb88F30a86fF0755438eC4eEc8Da9"

function App() {
  const [symbol, setSymbol] = useState()
  const [balance, setBalance] = useState()
  const { ethers } = require("ethers")

  const getBlock = async () => {
    const wallet = new ethers.BrowserProvider(window.ethereum)
    //get connected address

    const address = await wallet.getSigner()  

    const token = new ethers.Contract(contractToken, abi, address)

    const symbol = await token.symbol()
    setSymbol(symbol)

    const balance = await token.balanceOf(address.address)
    setBalance(balance)
    console.log(balance)
  }

  const mintToken = async () => {
    // get latest block number
    const wallet = new ethers.BrowserProvider(window.ethereum)
    //get connected address

    const address = await wallet.getSigner()
    console.log(address.address)
    
    // create contract

    const token = new ethers.Contract(contractToken, abi, address)
    await token.mint(address.address, 500)
    console.log(balance + "balance")
  }


  const transferToken = async (highestBid) => {
    const wallet = new ethers.BrowserProvider(window.ethereum)
    const address = await wallet.getSigner()
    console.log(address.address + "my address")
    console.log(typeof highestBid)
    const token = new ethers.Contract(contractToken, abi, address)

    await token.transfer("0x8B4312e50b0BeABdFaF3DAD6dC1E73e570712c81", highestBid)
  }
  const checkBalance = () =>{
    const elements = document.getElementsByClassName("userbid");
    let totalBid = 0
    for (let i = 0; i < elements.length; i++){
      const element = elements[i];
      const value = parseFloat(element.value);
      totalBid += value
    }
    return totalBid;
  }

  const checkTempBalance = () =>{
    const elements = document.getElementsByClassName("userbid");
    let totalBid = 0
    for (let i = 0; i < elements.length; i++){
      const element = elements[i];
      const value = parseFloat(element.value);
      totalBid += value
    }
    document.getElementById("tempBid").innerHTML = "(Temporarily used token: " + totalBid + ")"
    return totalBid;
  }

  const biddingIncrement = (id, id2,timerid) => {
    const totalBid = parseFloat(checkBalance());
    let nbalance = parseFloat(balance)
    let currentBid = parseFloat(document.getElementById(id2).value);
    let highestbid = parseFloat(document.getElementById(id).value);
    console.log(id2 + "this is id2")
    console.log(id + "this is id")
    console.log(currentBid)
    console.log(highestbid)
    console.log(totalBid)
    let timeLeft = document.getElementById(timerid).textContent
    console.log(timeLeft)
    if (timeLeft !== "EXPIRED"){
      if (currentBid === highestbid){
        if (totalBid + 20 <= nbalance){
          let inputElement = document.getElementById(id);
          let inputElement2 = document.getElementById(id2);
          // Parse the initial price as a number
          let initialPrice = parseFloat(inputElement.value);
          let finalPrice = initialPrice + 20;
          inputElement.value = finalPrice;
          inputElement2.value = finalPrice;
        }
        else{
        window.alert("You do not have enough EDT coin for this.")
        }
    }
    else{
      if (totalBid + highestbid <= nbalance){
        let inputElement = document.getElementById(id);
        let inputElement2 = document.getElementById(id2);
        // Parse the initial price as a number
        let initialPrice = parseFloat(inputElement.value);
        let finalPrice = initialPrice + 20;
        inputElement.value = finalPrice;
        inputElement2.value = finalPrice;
    }else{
      window.alert("You do not have enough EDT2 coin for this.")
      console.log(document.getElementById(id).value)
      console.log(document.getElementById(id2).value)
      console.log(currentBid)
    }
  }
}
else{
  window.alert("Item has expired.")
}
checkTempBalance();
}

function startCountdown(endTime, elementId){
  // Set the date we're counting down to
  var countDownDate = new Date(endTime).getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes, and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with the specified ID
    document.getElementById(elementId).innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    // If the countdown is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      const highestBid = checkBalance()
      document.getElementById(elementId).innerHTML = "EXPIRED";
      console.log(highestBid)
      return highestBid;
    }
    else {return 0}
  });
}

// Array of objects with end times and element IDs
var countdowns = [
  { endTime: "Oct 15, 2023 15:37:25", elementId: "timer1" },
  { endTime: "Oct 15, 2023 07:04:00", elementId: "timer2" },
  { endTime: "Jan 15, 2023 20:00:00", elementId: "timer3" },
  { endTime: "Oct 15, 2023 07:06:00", elementId: "timer4" },
  { endTime: "Oct 17, 2023 10:45:00", elementId: "timer5" },
  { endTime: "Oct 20, 2023 20:00:00", elementId: "timer6" }
];



// Start countdown timers for each object
const maybeTransfer = async (num) => {
  console.log(document.getElementById("timer"+num))
  console.log(checkBalance())
  const timerElement = document.getElementById("timer"+num)
  if(timerElement && timerElement.textContent.trim() === "EXPIRED") {
   if (checkBalance()>0) {
      console.log(checkBalance())
      console.log(typeof checkBalance())
      transferToken(checkBalance())
      console.log("transfer successful")
    }
    else {window.alert("You lost the auction")}
  }
  else {window.alert("The auction for this item is still ongoing")}
};
  ;
countdowns.forEach(function(countdown){
  startCountdown(countdown.endTime, countdown.elementId)
});

getBlock()

  return (
    <div>
      <section className="header" id="main">
        <nav>
          <a href="#main" className="nav_left"><img src="bg_pic.png"></img></a>
        </nav> 

        <div className="text-box">
          <h1>eDeiots Exchange</h1>
          <p className="bio">Auction platform with blockchain technology</p>
          <a href="#auction" className="hero-btn">
            Head to Auction
          </a>
        </div>
        </section>
        <section id="auction">
        <div className="itemdiv">
          <div className="user-profile">
            <img src="user_profile_2.jpg" className="profilePicture"/>
            <p>0x8B4312e50b0BeABdFaF3DAD6dC1E73e570712c81</p>
          </div>
          <h2 id="timer1"></h2>
          <a href="item1.png" target="_blank"><img src="item1.png" className="items"></img></a>
          <h3>Special-Designed House</h3>
          <div className="row">
            <p>Highest Bid:</p><input type="text" id="name1" value="99980" readOnly className="highestbid"/><p>EDT</p></div>
            <div className="row"><label htmlFor="name1">Your bid:</label>
            <input type="number" id="name11" value="0" readOnly className="userbid"/><p>EDT</p>
            <button onClick={() => biddingIncrement("name1", "name11","timer1")}>BID</button>
            <button onClick ={() => maybeTransfer(1)}>TRANSFER</button>
          </div>
        </div>
        <div className="itemdiv">
          <div className="user-profile">
            <img src="user_profile_2.jpg" className="profilePicture"/>
            <p>0x8B4312e50b0BeABdFaF3DAD6dC1E73e570712c81</p>
          </div>
        <h2 id="timer2"></h2>
          <a href="item2.png" target="_blank"><img src="item2.png" className="items"></img></a>
          <h3>Rare Pokemon Cards</h3>
          <div className="row">
            <p>Highest Bid:</p><input type="text" id="name2" value="30" readOnly className="highestbid"/><p>EDT</p></div>
            <div className="row"><label htmlFor="name2">Your bid:</label>
            <input type="number" id="name22" value="0" readOnly className="userbid"/><p>EDT</p>
            <button onClick={() => biddingIncrement("name2", "name22","timer2")}>BID</button>
            <button onClick ={() => maybeTransfer(2)}>TRANSFER</button>
          </div>
        </div>
        <div className="itemdiv">
          <div className="user-profile">
            <img src="user_profile_2.jpg" className="profilePicture"/>
            <p>0x8B4312e50b0BeABdFaF3DAD6dC1E73e570712c81</p>
          </div>
        <h2 id="timer3"></h2>
        <a href="item3.png" target="_blank"><img src="item3.png" className="items"></img></a>
          <h3>WW2 Minigun</h3>
          <div className="row">
            <p>Highest Bid:</p><input type="text" id="name3" value="90" readOnly className="highestbid"/><p>EDT</p></div>
            <div className="row"><label htmlFor="name3">Your bid:</label>
            <input type="number" id="name33" value="0" readOnly className="userbid"/><p>EDT</p>
            <button onClick={() => biddingIncrement("name3", "name33","timer3")}>BID</button>
            <button onClick ={() => maybeTransfer(3)}>TRANSFER</button>
          </div>
        </div>
        <div className="itemdiv">
          <div className="user-profile">
            <img src="user_profile_2.jpg" className="profilePicture"/>
            <p>0x8B4312e50b0BeABdFaF3DAD6dC1E73e570712c81</p>
          </div>
          <h2 id="timer4"></h2>
          <a href="item4.png" target="_blank"><img src="item4.png" className="items"></img></a>
          <h3>Famous Athlete's Signature on Baseballs</h3>
          <div className="row">
            <p>Highest Bid:</p><input type="text" id="name4" value="110" readOnly className="highestbid"/><p>EDT</p></div>
            <div className="row"><label htmlFor="name4">Your bid:</label>
            <input type="number" id="name44" value="0" readOnly className="userbid"/><p>EDT</p>
            <button onClick={() => biddingIncrement("name4", "name44","timer4")}>BID</button>
            <button onClick ={() => maybeTransfer(4)}>TRANSFER</button>
          </div>
        </div>
        <div className="itemdiv">
          <div className="user-profile">
            <img src="user_profile_2.jpg" className="profilePicture"/>
            <p>0x8B4312e50b0BeABdFaF3DAD6dC1E73e570712c81</p>
          </div>
          <h2 id="timer5"></h2>
          <a href="item5.png" target="_blank"><img src="item5.png" className="items"></img></a>
          <h3>Antique Chinese Vases</h3>
          <div className="row">
            <p>Highest Bid:</p><input type="text" id="name5" value="1000" readOnly className="highestbid"/><p>EDT</p></div>
            <div className="row"><label htmlFor="name5">Your bid:</label>
            <input type="number" id="name55" value="0" readOnly className="userbid"/><p>EDT</p>
            <button onClick={() => biddingIncrement("name5", "name55","timer5")}>BID</button>
            <button onClick ={() => maybeTransfer(5)}>TRANSFER</button>
          </div>
        </div>
        <div className="itemdiv">
          <div className="user-profile">
            <img src="user_profile_2.jpg" className="profilePicture"/>
            <p>0x8B4312e50b0BeABdFaF3DAD6dC1E73e570712c81</p>
          </div>
          <h2 id="timer6"></h2>
          <a href="item6.png" target="_blank"><img src="item6.png" className="items"></img></a>
          <h3>Pure Gold Stopwatch</h3>
          <div className="row">
            <p>Highest Bid:</p><input type="text" id="name6" value="600" readOnly className="highestbid"/><p>EDT</p></div>
            <div className="row"><label htmlFor="name6">Your bid:</label>
            <input type="number" id="name66" value="0" readOnly className="userbid"/><p>EDT</p>
            <button onClick={() => biddingIncrement("name6", "name66","timer6")}>BID</button>
            <button onClick ={() => maybeTransfer(6)}>TRANSFER</button>
          </div>
        </div>
      </section>
      <section className="footer">
      <div class="balance-container">
        <p class="balance">Account balance: {balance + "" + symbol} </p>
        <p id="tempBid" class="temp-bid"></p>
        <button onClick={() => mintToken()}>mint Token</button>
      </div>
      </section>
    </div>
  );
}

export default App;
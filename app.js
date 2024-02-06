const Base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select"); // these two variavles are used to get the type of currency from user ;
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const msg=document.querySelector(".msg");


for(let select of dropdowns){
    for (let  curcode in countryList) {
        let newOption=document.createElement("option")
        newOption.innerText=curcode;
        newOption.value=curcode;
        if(select.name==="From" && curcode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="To" && curcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFLag(evt.target);
    })
}
// here i am changing the flag of country according to country code
const  updateFLag=(element)=>{
let curcode=element.value;
let countrycode=countryList[curcode];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let img=element.parentElement.querySelector("img");// here we are accessing the img tag to set new images according to code 
img.src=newsrc;
//console.log(countrycode);
}

const updateExchangeRate= async()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
   // console.log(amtval);
   if(amtval===" " || amtval<0)
   {
    amount.value="1";
   }//used to rest the value if the entered value is invalid 
   const URL=`${Base_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
// console.log(fromcurr.value);
// console.log(tocurr.value);
//fromcurr.value and tocurr.prints the type of currency 
let response=await fetch(URL);
let acutaldata=await response.json();
let rate=acutaldata[tocurr.value.toLowerCase()];
let finalAmount=amtval*rate; //calculation part
msg.innerText=`${amtval} ${fromcurr.value} =${finalAmount} ${tocurr.value}`
//console.log(rate)
}

btn.addEventListener("click", (evt)=>{
    
    evt.preventDefault();    // the preventDefault will change the default setting  of button i.e reload the page
  updateExchangeRate();
})
window.addEventListener("load",()=>{
    updateExchangeRate();
    })

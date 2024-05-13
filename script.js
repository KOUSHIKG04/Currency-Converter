//  free-apis.github.io

let baseUrl ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let to = $(".to select");   let from = $(".from select"); 


$(".dropdown select").each(function () {
  var select = $(this);
  $.each(countryList, function (currCode) {
    var newOpt = $("<option>").text(currCode).val(currCode);
    if (select.hasClass("from") && currCode === "USD") {
      newOpt.attr("selected", "selected");
    } else if (select.hasClass("to") && currCode === "INR") {
      newOpt.attr("selected", "selected");
    }
    select.append(newOpt);
  });
  select.on("change", (e) => {
    updateFlag(e.target);
  });
});

 


const updateExchangeRate = async() =>{
let amount = $(".amount input").val();
  
if (amount === "") {
  $("input").val(); 
  amount = 1; 
} else if (amount < 1) {
  $("input").val("1");
  amount = 1;
} else if (isNaN(amount)) {
  $("input").val("1");
  amount = 1;
}else{};

  let url_ = `${baseUrl}/${from.val().toLowerCase()}/${to.val().toLowerCase()}.json`;
  let resp = await fetch(url_); 
  let data = await resp.json();

  let finalAmount = (amount * data[to.val().toLowerCase()]).toFixed(3);// let rate = data[to.val().toLowerCase()];
   $(".msg").text(`${amount} ${from.val()} = ${finalAmount} ${to.val()}`);
  
}

const updateFlag = (e) => {
  let counCode = countryList[$(e).val()];
  $(e).parent().find("img")
    .attr("src", `https://flagsapi.com/${counCode}/flat/64.png`);
};


$(window).on("load", () => {
  updateExchangeRate();
});



$(".btn").on("click", (e)=>{
  e.preventDefault(); updateExchangeRate();
});





/*

FOR BETTER UNDRSTANDING of some part of the code

const dropDwons = document.querySelectorAll(".dropdown select");
for (let select of dropDwons){
  for (currCode in countryList){
    let newOpt = document.createElement("option");
    newOpt.innerText = currCode; newOpt.value = currCode;
     if(select.name === "from" && currCode === "USD"){
      newOpt.selected = "selected"
    }
    select.append(newOpt);
  }
  select.addEventlistner("change", (e) =>{
    updateFlag(e.target)
  })
}

const updateFlag = (element) =>{
  let cuurCode = element.value;
  let counCode = countryList[cuurCode];
  let newigsrc = `https://flagsapi.com/${counCode}/flat/64.png`;
  let img=  element.parentElement.querySelector("img")
  img.src = newigsrc
 }



*/

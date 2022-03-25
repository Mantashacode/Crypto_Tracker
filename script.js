"use strict";

const  container =document.getElementById('container');
const search = document.getElementById('search');
const sort = document.getElementById("sort");
//search
search.addEventListener('input',function(){
   const value=search.value.toLowerCase();
   const searchText= document.getElementsByClassName('imgName');
   
   const searchSymbol= document.getElementsByClassName('column1');

   let i=0;
   while(i<searchText.length){
    let textValue = searchText[i].textContent.toLowerCase();
    console.log(textValue);
    let symbValue = searchSymbol[i].textContent.toLowerCase();
    console.log(symbValue);
    //check for match
    if(!(  (textValue.includes(value)) || (symbValue.includes(value)) ))
    {  document.getElementById(`${searchText[i].textContent}`).classList.add('hidden');
    }
    else
    {
        document.getElementById(`${searchText[i].textContent}`).classList.remove('hidden');
    }
    i++;
   }

})


//fetch data
const cryptoData= async function()
{
const sort = document.getElementById("sort");
console.log(sort.value);
     try{
    const res=await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_pag=100&page=1&sparkline=false");
    const data= await res.json();  
    console.log(data);
    const arr1=[...data].reverse();
    console.log(arr1);
   
     if(sort.value=="asc")
       { newdata(arr1)}
     else
      { newdata(data);}

       function newdata(data){
           while(container.firstChild){
               container.removeChild(container.firstChild);
           }
        const n = data.length;
       let i = 0;
       while (i < n) {
         const singleData = data[i];
        //  console.log(singleData);
         display(singleData, i);
         i++;
       }
     }

    }
     catch(err){
         container.insertAdjacentText("beforeend",`Something went wrong 💥💥${err.message}.Try again`);
        }
    };



//for display 
const display = function (data, i) {
  const subDiv = document.createElement("div");
  subDiv.className = "subDiv";
  subDiv.id = `${data.name}`;

  // div for image 

  const divImg = document.createElement("div");
  divImg.className = "divImg";
  const image = document.createElement("div");
  image.className="image";
  const img = document.createElement("img");
  img.src = data.image;
  image.appendChild(img);
  //for name
  const imgName = document.createElement("p");
  imgName.className = "imgName";
  imgName.textContent = data.name;
  divImg.appendChild(image);

  divImg.appendChild(imgName);
  subDiv.appendChild(divImg);

  // div for codeName

  const cryptoCode = document.createElement("p");
  cryptoCode.className = "column1";
  cryptoCode.textContent = data.symbol;
  subDiv.appendChild(cryptoCode);

//for current price
  const currentPrice = document.createElement("p");
  currentPrice.className = "column2";
  currentPrice.textContent = "$" + data.current_price;
  subDiv.appendChild(currentPrice);

  const total = document.createElement("p");
  total.className = "column3";
  total.textContent = "$" + data.total_volume.toLocaleString('en-us');
  subDiv.appendChild(total);

  const pricePercentageDiv = document.createElement("div");
  pricePercentageDiv.className = "column4";
  const pricePercentageValue = document.createElement("p");
  pricePercentageValue.textContent =
    data.price_change_percentage_24h.toFixed(2) + "%" +`${data.price_change_percentage_24h > 0?'👍':'👎'}`;

  // for color and thumbs up and down

  if (data.price_change_percentage_24h > 0) {
    pricePercentageValue.style.color = "green";
    const pricePercentageImage = document.createElement("img");
    pricePercentageDiv.appendChild(pricePercentageValue);
  } 
  else if (data.price_change_percentage_24h < 0){
    pricePercentageValue.style.color = "red";
    const pricePercentageImage = document.createElement("img");
    pricePercentageDiv.appendChild(pricePercentageValue);
  }
  subDiv.appendChild(pricePercentageDiv);

  // market capital value
  const marketCap = document.createElement("p");
  marketCap.className = "column5";
  marketCap.textContent = "Mkt Cap: $" +(data.market_cap).toLocaleString('en-us');
  subDiv.appendChild(marketCap);


  container.appendChild(subDiv);
};
 cryptoData();


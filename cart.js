

var CartArr= JSON.parse(localStorage.getItem("Cart_Data"))
var wishlistArr=JSON.parse(localStorage.getItem("Wishlist_Data")) || [];

display(CartArr);

totalprice()


function display(CartArr)
{

if(CartArr.length==1)
{
    var Items=document.querySelector("#totalitem");
    Items.innerText=("Ship From: China "+"("+CartArr.length+" "+"Item)")
    console.log(Items.innerText);
}

else{
    var Items=document.querySelector("#totalitem");
    Items.innerText=("Ship From: China "+"("+CartArr.length+" "+"Items)")
    console.log(Items.innerText);
}

     


    CartArr.forEach(function(elem,i)
    {
        
           
        var tr=document.createElement("tr");
  
        var td1=document.createElement("td");
        td1.setAttribute("class","firstcol")
        
        var image=document.createElement("img");
        image.setAttribute("src",elem.image_url);

        var p=document.createElement("p");
        p.innerText=(elem.name).toLowerCase();
        

         var td2=document.createElement("td");
         td2.innerText="₹"+" "+elem.price;
         td2.setAttribute("class","equal")

         var td3=document.createElement("td");
         
         td3.setAttribute("class","equal")

         var td4=document.createElement("td");
         td4.innerText="₹"+" "+elem.finalprice;
         td4.style.fontWeight="bold";
         td4.setAttribute("class","equal")


         var div=document.createElement("div");
         div.setAttribute("id","quant")

         var p1=document.createElement("div");
         p1.innerText=elem.quantity;

         var inc=document.createElement("button");
         inc.innerText="+";
         inc.addEventListener("click",incfn)

         function incfn()
         {
              elem.quantity+=1;
              elem.finalprice=elem.quantity*elem.price;  
              p1.innerText=elem.quantity;
             td4.innerText="₹"+" "+elem.finalprice;
             localStorage.setItem("Cart_Data",JSON.stringify(CartArr))

             console.log(CartArr)
             totalprice();
         }


         var dec=document.createElement("button");
         dec.innerText="-";
         dec.addEventListener("click",decfn)
        
         function decfn()
         {
             if(elem.quantity>1)
             {
                elem.quantity-=1;
                elem.finalprice=elem.quantity*elem.price;  
                p1.innerText=elem.quantity;
                td4.innerText="₹"+" "+elem.finalprice;
               localStorage.setItem("Cart_Data",JSON.stringify(CartArr))
              
               totalprice();
             }

             else if(elem.quantity==1)
             {
                p1.innerText=elem.quantity;
                td4.innerText="₹"+" "+elem.quantity*elem.price;
             }
             
         }
    
        
        
         div.append(dec,p1,inc)
         td3.append(div)
          
         var td5=document.createElement("td");
         td5.setAttribute("class","equal");
         td5.setAttribute("id","last")
         
         var button=document.createElement("button");
         button.innerText="WishList";
         button.addEventListener("click",function()
         {
             wishlistFn(elem);
         })

         var Remove=document.createElement("button");
        Remove.innerText="Delete";
        Remove.addEventListener("click",function(elem,i)
        {
            Delete(elem,i);
        })

          
         
           
       td5.append(Remove,button)
        td1.append(image,p);
        tr.append(td1,td2,td3,td4,td5);

        document.querySelector("#body").append(tr)


    })

  
 
}



function totalprice()
{
    var PayArr=[];

var TotalPrice=document.querySelector(".totalprice>h3");
        var Total=CartArr.reduce(function(acc,element)
        {
            return acc+=Number(element.finalprice);
        },0)

       
       console.log("ok")
        TotalPrice.innerText=(" ₹"+" "+Total);
        var Payment=Total;
        console.log(Payment)
        PayArr.push(Payment)
        localStorage.setItem("payment",JSON.stringify(PayArr));

    }
function wishlistFn(elem)
{
    wishlistArr.push(elem)
    console.log(wishlistArr);
    localStorage.setItem("Wishlist_Data",JSON.stringify(wishlistArr))
    window.location.reload();
}

function Delete(elem,i)
{
    CartArr.splice(i,1);
    console.log(CartArr);
    localStorage.setItem("Cart_Data",JSON.stringify(CartArr));
    window.location.reload()
}


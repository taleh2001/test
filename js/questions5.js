let num1 = document.getElementById('num1').value
let num2 = document.getElementById('num2').value
let num3 = document.getElementById('num3').value
let num4 = document.getElementById('num4').value


document.querySelector('#getSur').onclick = function(){

    if(document.getElementById('num1').value == 7 &&
     document.getElementById('num2').value == 8 &&
      document.getElementById('num3').value == 2 &&  
      document.getElementById('num4').value == 3)
      {
       window.location.href = '../html/surprize.html' 
    }else{
        alert('Не правильно')
    }

}
 


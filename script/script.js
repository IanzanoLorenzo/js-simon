"use strict";

const playButton = document.getElementById('play');
const messageText = document.getElementById('message');
const timerShow = document.getElementById('timer')

//funzione per creare un numero randomico tra min e max
function randomNumGenerator(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//funzione per creare un numero randomico tra min e max di lengthOfArray lunghezza
function createRandomArray(min, max, lengthOfArray){
    let array = [];
    while(array.length < lengthOfArray){
        let num = randomNumGenerator(min, max);
        if (!array.includes(num)){
            array.push(num);
        }
    }
    return array;
}

//funzione che confronta i numeri che fa inserire con un array
function arrayNumUtente(array, arrayConfronto){
    for(let x = 0; x < arrayConfronto.length; x++){
        let num = prompt('Inserisci i numeri che hai visto uno alla volta').trim();
        let numArray = num.split(' ');
        const quantityOfArrayItems = numArray.length
        //se viene annullato il prompt conclude subito l'operazione
        if(num === null){
            num = ' '
            x = arrayConfronto.length
        }
        //ciclo che rimuove gli spazi vuoti nell'array
        for(let i = 0; i < quantityOfArrayItems ; i++){
            const indexArray = quantityOfArrayItems - 1 - i
            if (numArray[indexArray] === ''){
                numArray.splice(indexArray, 1);
            } 
        }
        //ciclo che inserisce i valori validi all'interno dei numeri esatti
        for(let i = 0; i < arrayConfronto.length ; i++){
            if (arrayConfronto.includes(parseInt(numArray[i])) && !array.includes(numArray[i])){
                array.push(numArray[i]);
            }
            if (numArray.length !== 1){
                x++
            }
            
        }
    }
}

//creo l'evento per il gioco
playButton.addEventListener('click', function() {
    let numeriGioco = createRandomArray(1, 99, 5);
    let numeriGiusti = [];
    let time = 30;
    setTimeout(function(){
        messageText.innerText = numeriGioco;
    }, 1000)
    //funzione timer
    let timer = setInterval(function(){
        timerShow.innerText = time + 's'
        if(time === 0){
            clearInterval(timer)
        }
        time--
    }, 1000)
    //funzione che toglie i numeri dallo schermo
    setTimeout(function(){
        messageText.innerText = 'Ricorda i numeri';
        console.log(numeriGioco);//cheat
    }, 31000)
    //funzione che scrive un messaggio in base al risultato
    setTimeout(function(){
        arrayNumUtente(numeriGiusti, numeriGioco);
        if(numeriGiusti.length === 0){
            messageText.innerText = 'Non hai ricordato nemmeno un numero';
        } else if(numeriGiusti.length === 1){
            messageText.innerHTML = `Hai individuato un solo numero: ${numeriGiusti}`;
        } else if(numeriGiusti.length === numeriGioco.length){
            messageText.innerText = `Complimenti, hai ricordato tutti i numeri: ${numeriGiusti}`;
        } else{
            messageText.innerHTML = `Hai individuato ${numeriGiusti.length} numeri: ${numeriGiusti}`;
        }
    }, 31100)

})
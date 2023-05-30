"use strict";

const playButton = document.getElementById('play');
const messageText = document.getElementById('message');

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
function arrayNumUtente(array, arrayControllo){
    for(let i = 0; i < arrayControllo.length ; i++){
        let num = parseInt(prompt('Inserisci i numeri che hai visto uno alla volta'))
        if (arrayControllo.includes(num)){
            array.push(num)
        }
    }
}

//creo l'evento per il gioco
playButton.addEventListener('click', function() {
    let numeriGioco = createRandomArray(1, 99, 5);
    let numeriGiusti = [];
    messageText.innerText = numeriGioco;
    //funzione che toglie i numeri dallo schermo
    setTimeout(function(){
        messageText.innerText = 'Ricorda i numeri';
        console.log(numeriGioco)//cheat
    }, 5000)
    //funzione che scrive un messaggio in base al risultato
    setTimeout(function(){
        arrayNumUtente(numeriGiusti, numeriGioco)
        if(numeriGiusti.length === 0){
            messageText.innerText = 'Non hai ricordato nemmeno un numero'
        } else if(numeriGiusti.length === 1){
            messageText.innerHTML = `Hai individuato un solo numero: ${numeriGiusti}`;
        } else if(numeriGiusti.length === numeriGioco.length){
            messageText.innerText = `Complimenti, hai ricordato tutti i numeri: ${numeriGiusti}`
        } else{
            messageText.innerHTML = `Hai individuato ${numeriGiusti.length} numeri: ${numeriGiusti}`;
        }
    }, 5100)

})
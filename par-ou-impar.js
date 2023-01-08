const parOuImpar = process.argv[2];
const numero = Number(process.argv[3]);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10);

 console.log(`Você escolheu ${parOuImpar} e o número ${numero} `);
 console.log(
   `O computador escolheu o número ${numeroAleatorioEntreZeroeDez}, a soma total é ${
     numero + numeroAleatorioEntreZeroeDez
   }`
 );

if (parOuImpar === "par") {
  if ((numero + numeroAleatorioEntreZeroeDez) % 2 === 0) {   
    console.log("Você ganhou!");
  }else{
    console.log("Você perdeu!");
  }
}else{
    if ((numero + numeroAleatorioEntreZeroeDez) % 2 === 0) {
      console.log("Você perdeu!");
    } else {
      console.log("Você ganhou!");
    }
}

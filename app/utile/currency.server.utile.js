module.exports = function(){

  /**
 * @description formart price to brazil pattern
 * @param  {price_display}
 * @return {price_display formated}
 */
function formatBrazilCurrency(price_display,next){
    //config
    var valor = Number(price_display);
    var casas = 2;
    var separdor_decimal = ',';
    var separador_milhar = '.';


    var valor_total = parseInt(valor * (Math.pow(10,casas)));
    var inteiros =  parseInt(parseInt(valor * (Math.pow(10,casas))) / parseFloat(Math.pow(10,casas)));
    var centavos = parseInt(parseInt(valor * (Math.pow(10,casas))) % parseFloat(Math.pow(10,casas)));
   
    if(centavos%10 === 0 && centavos+"".length<2 ){
      centavos = centavos+"0";
    }else if(centavos<10){
      centavos = "0"+centavos;
    }
  
    var milhares = parseInt(inteiros/1000);
    inteiros = inteiros % 1000; 
   
    var retorno = "";
   
    if(milhares>0){
      retorno = milhares+""+separador_milhar+""+retorno;
    if(inteiros === 0){
      inteiros = "000";
    } else if(inteiros < 10){
      inteiros = "00"+inteiros; 
    } else if(inteiros < 100){
      inteiros = "0"+inteiros; 
    }
  }

  retorno += inteiros+""+separdor_decimal+""+centavos;
 
  return next('R$ ' + retorno);
}

return {
	 formatBrazilCurrency:formatBrazilCurrency
  };

};

const axios = require("axios")
const app_key = "0634ea20b51063b31966eb3facbd8e50"
const city = "Itu"
const units = "metric"
const lang = "pt_BR"
const cnt= 10
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${app_key}&lang=${lang}&cnt=${cnt}`;

axios
  .get(url)
  .then((res) => {
    console.log(res); // Exibe a resposta completa da requisição
    return res.data; // Passa apenas os dados relevantes para o próximo bloco
  })
  .then((res) => {
    console.log("Quantidade:", res.cnt);
    return res;
  })
  .then((res) => {
    console.log("Aqui", res); // Exibe todos os dados retornados pela API
    return res["list"]; // Retorna a lista de previsões do tempo
  })
  .then((res) => {
    for(let previsao of res){
      console.log(` 
        ${new Date(+previsao.dt * 1000).toLocaleString()},
        ${'Min: ' + previsao.main.temp_min}\u00B0C,
        ${'Max: ' + previsao.main.temp_max}\u00B0C,
        ${'Hum: ' + previsao.main.humidity}%,
        ${previsao.weather[0].description}
        `);
    }
    return res;
  })
  .then((res) => {
    const lista = res.filter(r => r.main.feels_like >= 30);
    console.log (`${lista.length} previsões têm
      percepção humana de temperatura acima de 30
      graus`)
  });


/*
Cada res (que é o parâmetro das funções dentro dos blocos .then()) vai passando seu valor de uma etapa para a próxima.


1. O primeiro .then():
    Recebe o resultado completo da requisição HTTP feita pelo axios, que inclui dados como o corpo da resposta (data), os cabeçalhos, e o status.
    Esse .then() retorna res.data, que contém apenas os dados relevantes da previsão do tempo.


2. O segundo .then():

  Recebe como argumento o res.data que foi retornado pelo primeiro .then().


3. O terceiro .then():

    Recebe novamente res, que é o res.data retornado no .then() anterior.
    Agora, ele retorna res.list, que é o array de previsões meteorológicas.

4. O quarto .then():

    Recebe res, que agora é o array de previsões (res.list) retornado no .then() anterior.
    Ele percorre cada previsão, exibe as informações no console e, em seguida, retorna o mesmo array (res).


5. O último .then():

    Recebe res, que ainda é o array de previsões.
    Ele filtra o array para encontrar as previsões onde a sensação térmica é maior ou igual a 30°C e exibe o número de previsões que atendem a esse critério.

    
*/
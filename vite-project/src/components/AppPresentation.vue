<script>


export default {
  name: "AppPresentation",
}
</script>

<template>
  <div class="presentazione">
    <h1>Organizzare un concerto non è mai stato cosi semplice</h1>
    <h3>Se vuoi dare vita ai tuoi eventi sei capitato nel posto giusto! </h3>
    <h5>Dal 2022 siamo parte della vita serale Romana e collaboriamo con artisti da tutto il mondo per metterli in
      contatto con la nostra città, i nostri locali ed i nostri concittadini con voglia di far festa.
    </h5>
    <div class="banner-container">
      <div class="banner">
        <p>Stai cercando una band per il tuo matrimonio?Hai bisogno di un dj per la tua serata tra amici?Addirittura un
          intera orchestra per un evento importante? Hai bisogno di una rockstar per organizzare un concerto al Colosseo?
          devi solo chiedere!

        </p>
      </div>
      <div class="banner">
        <p>Troverai da noi una vasta selezione di artisti e professionisti legati al mondo della musica disponibili per
          offrire il
          proprio talento nella zona di Roma e dintorni.
          Ricordate che oltre a cantanti e musicisti potrete contattare anche professionisti da palco pronti a creare
          l'atmosfera perfetta ovunque vi serva.
        </p>
      </div>
      <div class="banner">
        <p>Ci fa ovviamente piacere collaborare con artisti nostrani e consigliamo a tutti i nostri artisti
          emergenti di iscriversi alla nostra piattaforma! saremo felici di offrivi una vetrina per poter dare una svolta
          alla vostra carriera.
        </p>
      </div>
    </div>
  </div>

  <div class="jumbo">
    <p class="centro-jumbo">Riempi il palco!</p>

  </div>
</template>
<style scoped>
.presentazione {
  background-color: rgb(0, 0, 0);
  padding-top: 10rem;
}

.jumbo {
  background-image: url('https://www.bluestoneedge.com/wp-content/uploads/2021/02/Fotolia_165796723_Subscription_Monthly_M.jpg');
  height: 30vh;
  width: 100vw;
  margin: 0 auto;
  border-radius: 0.4rem;



  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-y: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;


  -webkit-box-shadow: 0px 10px 13px -7px #000000, 0px 36px 20px 8px rgba(255, 253, 225, 0.695);
  box-shadow: 0px 10px 13px -7px #000000, 0px 36px 40px 8px rgba(255, 253, 225, 0.132);
}

.centro-jumbo {
  color: rgb(208, 83, 0);
  font-size: 5rem;
}

.banner-container {
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin: 0 auto;
  justify-content: space-evenly;
  align-items: center;


}

.banner {
  width: 30%;
  height: 14rem;
  background-color: #ff6a00;
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 0.6rem;
}
</style>
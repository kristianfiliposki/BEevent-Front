<script>


export default {
  name: "AppPresentation",
}
</script>

<template>
  <div class="presentazione">
    <div class="presentationCopy">
      <h1>Ti diamo il benvenuto su Heavy Planning!</h1>
      <h1>Organizzare un concerto non è mai stato cosi semplice</h1>
      <h3>Se vuoi dare vita ai tuoi eventi sei capitato nel posto giusto! </h3>
      <h5>Dal 2022 siamo parte della vita serale Romana e collaboriamo con artisti da tutto il mondo per metterli in
        contatto con la nostra città, i nostri locali ed i nostri concittadini con voglia di far festa.
      </h5>
    </div>
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
  height: 80vh;
  background-image: url("https://staticgeopop.akamaized.net/wp-content/uploads/sites/32/2022/10/iStock-177303568.jpg?im=AspectCrop=(16,9);");
  background-size: cover;
  background-position: bottom;
  color: #FD129E;
  padding-top: 3rem;

}

h1 {
  color: #F6FB01;
  font-size: 2.3rem;
}

.presentationCopy {
  text-align: center;
  width: 60%;

  padding: 1.5rem;
  margin: 0 auto;
  background-color: #0000005b;

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 1rem;
  border: solid black 1px;


}


.jumbo {
  background-image: url('https://www.bluestoneedge.com/wp-content/uploads/2021/02/Fotolia_165796723_Subscription_Monthly_M.jpg');
  height: 40vh;
  width: 100%;
  margin: 0 auto;




  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;


  display: flex;
  justify-content: center;
  align-items: center;


  -webkit-box-shadow: 0px 10px 13px -7px #000000, 0px 36px 20px 8px rgba(255, 253, 225, 0.695);
  box-shadow: 0px 10px 13px -7px #000000, 0px 36px 40px 8px rgba(255, 253, 225, 0.132);
}

.centro-jumbo {
  color: #F6FB01;
  font-size: 5rem;
}

.banner-container {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
  justify-content: space-evenly;
  align-items: center;
  padding: 4rem;



}

.banner {
  width: 30%;
  height: 14rem;
  background-color: #000000b6;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  margin: 2rem 0;
  padding: 2rem;
  border-radius: 0.6rem;
  text-align: center;
}

/*media query cards*/
@media only screen and (max-width: 968px) {
  .presentazione {
    height: fit-content;
  }

  h1 {
    color: #F6FB01;
    font-size: 2rem;
  }

  .presentationCopy {
    text-align: center;
    width: 95%;

  }

  .banner-container {
    width: 95%;
    margin: 0 auto;
    padding: 0.5rem;
  }

  .banner {
    width: 30%;
    height: 14rem;
    background-color: #000000b6;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    margin: 2rem 0;
    padding: 0.3rem;
    border-radius: 0.6rem;
    text-align: center;
  }
}

@media only screen and (max-width: 468px) {}
</style>
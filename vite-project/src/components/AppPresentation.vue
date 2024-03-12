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
    <div class="jumboLinks">
      <a href="http://localhost:5174/ricerca?specialization=Pianoforte"> <img class="specimg"
          src="../../public/img/IMG_1189.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Chitarra"> <img class="specimg"
          src="../../public/img/IMG_1190.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Violino"> <img class="specimg"
          src="../../public/img/IMG_1191.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Canto"> <img class="specimg"
          src="../../public/img/IMG_1192.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Batteria"> <img class="specimg"
          src="../../public/img/IMG_1194.jpg" alt="img">
      </a>
    </div>
    <div class="jumboLinks2">
      <a href="http://localhost:5174/ricerca?specialization=Musicista"> <img class="specimg"
          src="../../public/img/IMG_1195.jpg" alt="img">
      </a>


      <p class="centro-jumbo">Riempi il palco!</p>
      <a href="http://localhost:5174/ricerca?specialization=Fonico"> <img class="specimg"
          src="../../public/img/IMG_1196.jpg" alt="img">
      </a>
    </div>

    <div class="jumboLinks2">
      <a href="http://localhost:5174/ricerca?specialization=Produttore"> <img class="specimg"
          src="../../public/img/IMG_1197.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Tecnico+del+suono"> <img class="specimg"
          src="../../public/img/IMG_1198.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Tecnico+Luci"> <img class="specimg"
          src="../../public/img/IMG_1199.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Tastierista"> <img class="specimg"
          src="../../public/img/IMG_1201.jpg" alt="img">
      </a>


    </div>

    <div class="jumboLinks3">
      <a href="http://localhost:5174/ricerca?specialization=Violoncellista"> <img class="specimg"
          src="../../public/img/IMG_1202.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Saxofonista"> <img class="specimg"
          src="../../public/img/IMG_1203.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Trombettista"> <img class="specimg"
          src="../../public/img/IMG_1205.jpg" alt="img">
      </a>
      <a href="http://localhost:5174/ricerca?specialization=Dj"> <img class="specimg" src="../../public/img/IMG_1206.jpg"
          alt="img">
      </a>


    </div>

  </div>
  <div class="preFooter">
    <h3>Sito web creato da:</h3>
    <div class="footlinks">
      <a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile">Kristian
        Filiposki</a>
      <a href="https://www.linkedin.com/in/marco-percolla-a358ab2b9/">Marco Percolla</a>
      <a href="https://www.linkedin.com/in/francesco-bonanno-78aa692b9/">Francesco Bonanno</a>
      <a href="https://www.linkedin.com/in/lorenzo-monteforte-2846702b5/">Lorenzo Monteforte</a>
      <a href="https://www.linkedin.com/in/riccardo-rocco-497251200/">Riccardo Rocco</a>
    </div>

  </div>
</template>
<style scoped>
.presentazione {
  height: 40rem;
  background-image: url("https://staticgeopop.akamaized.net/wp-content/uploads/sites/32/2022/10/iStock-177303568.jpg?im=AspectCrop=(16,9);");
  background-size: cover;
  background-position: bottom;
  color: #FD129E;
  padding-top: 3rem;


}

h1 {
  color: #F6FB01;
  font-size: 2.3rem;
  font-family: "Bebas Neue", sans-serif;
}

h3 {
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.5rem;
  padding: 0.5rem;
}

h5 {
  font-family: "Bebas Neue", sans-serif;
  font-size: 1rem;
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
  height: 83vh;
  width: 100%;
  margin: 0 auto;




  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-y: -3rem;


  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;


  -webkit-box-shadow: 0px 10px 13px -7px #000000, 0px 36px 20px 8px rgba(255, 253, 225, 0.695);
  box-shadow: 0px 10px 13px -7px #000000, 0px 36px 40px 8px rgba(255, 253, 225, 0.132);
}

.jumboLinks {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.jumboLinks2 {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.jumboLinks3 {
  width: 55%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.specimg {
  height: 5rem;
  margin: 1% 3% 1% 1%;
  border-radius: 12em;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 0px 36px 20px 8px rgba(255, 253, 225, 0.695);
  box-shadow: 0px 10px 13px -7px #000000, 0px 36px 40px 8px rgba(255, 253, 225, 0.132);
}

.specimg:hover {
  height: 7rem;
}

.centro-jumbo {
  color: #F6FB01;
  font-size: 5rem;
  font-family: "Bebas Neue", sans-serif;
  text-align: center;
  margin: 0 auto;
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
  min-height: 14rem;
  background-color: #000000b6;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  margin: 2rem 0;
  padding: 2rem;
  border-radius: 0.6rem;
  text-align: center;
}

.preFooter {
  height: 8vh;
  text-align: center;
  background-color: #090021;

  color: #FD129E;



}

.footlinks {
  height: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.footlinks a {
  text-decoration: none;
  color: white;
  font-family: "Bebas Neue", sans-serif;
}

/*media query cards*/
@media only screen and (max-width: 968px) {
  .presentazione {
    height: 80vh;
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
    height: 60%;
    margin: 0 auto;
    padding: 0.5rem;
  }


  .banner {
    width: 80%;
    min-height: fit-content;

    background-color: #000000b6;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    margin: 2rem 0;
    padding: 1.5rem;
    border-radius: 0.6rem;
    text-align: center;
  }

  .jumbo {
    height: 80vh;
    background-position-y: 1rem;
    background-size: cover;

  }

  .jumboLinks {
    width: 70%;

  }

  .jumboLinks2 {
    width: 90%;

  }

  .jumboLinks3 {
    width: 60%;

  }
}

@media only screen and (max-width: 468px) {
  .presentazione {
    height: 140vh;
  }

  .banner {
    width: 98%;
  }

  .jumboLinks {
    width: 100%;

  }

  .jumboLinks2 {
    width: 90%;

  }

  .jumboLinks3 {
    width: 100%;

  }

  .specimg {
    height: 4rem;

  }

  .centro-jumbo {
    font-size: 4rem;
  }
}

@media only screen and (max-width: 389px) {
  .presentazione {
    height: 180vh;
  }

  .banner {
    width: 98%;
  }

  .jumboLinks {
    width: 100%;

  }

  .jumboLinks2 {
    width: 90%;

  }

  .jumboLinks3 {
    width: 100%;

  }

  .specimg {
    height: 4rem;

  }

  .centro-jumbo {
    font-size: 4rem;
  }

  .preFooter {
    height: 5rem;
  }
}
</style>
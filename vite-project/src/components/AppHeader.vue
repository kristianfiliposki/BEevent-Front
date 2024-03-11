<script>
export default {
  name: "AppHeader"
}
</script>

<template>
  <header id="navbar">

    <div class="logoWrap">
      <router-link to="/">
        <img class="logo" src="/logo/Heavy planning logo.jpg" alt="img">
      </router-link>
    </div>
    <div class="link-rights">
      <a href="/">Homepage</a>
      <a href="/welcome">Chi siamo</a>
      <a href="http://localhost:8000/register">Registrati/log in</a>
      <a href="/ricerca">Ricerca Avanzata</a>
        </div>


  </header>
</template>

<style scoped>
/* //navbar admin section */
#navbar {
  width: 100%;
  height: 20vh;
  background-color: #090021;
  display: flex;
  align-items: center;
  justify-content: space-between;

}

.logoWrap {
  width: 20%;
  height: 100%;

}

.logo {

  height: 100%;
  padding: 0.4rem;
  aspect-ratio: 1 1;


}



#navbar a {
  font-family: sans-serif;
  color: #FD129E;
  text-decoration: none;
  font-size: 1em;
  font-weight: bolder;
}

.link-rights {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#navbar a:hover {
  color: #F6FB01;
  transition: 250ms;
}

#navbar i {
  color: #FD129E;
}

/* Media queries */
@media only screen and (max-width: 768px) {

  .logoWrap {
    width: 20%;
    height: 80%;

  }





  .link-rights {
    width: 70%;
    height: 70%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;

  }


  #navbar a {
    margin: 0% 4% 0% 0%;
    font-size: 1.2rem;
  }
}

@media only screen and (max-width: 468px) {
  .link-rights {
    width: 70%;
    height: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-end;


  }

  #navbar {
    min-height: 10rem;
  }

  .link-rights a {
    margin: 2rem;
    font-size: 1.6rem;
  }
}
</style>
<script>
export default {
  name: "AppHeader"
}
</script>

<template>
  <header id="navbar">

    <router-link to="/">
      <img src="/logo/Heavy planning logo.jpg" alt="img">
    </router-link>
    <a href="http://localhost:8000/register">Registrati/log in</a>
    <a href=""><i class="fa-solid fa-plus fa-lg fa-fw"></i> Aggiungi operatore</a>
    <a href="/ricerca">ricerca avanzata</a>
    <a href="" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
     <i class="fa-solid fa-sign-out-alt fa-lg fa-fw"></i>
    </a>
    <a href="/">Homepage</a>
    <form id="logout-form" action="" method="POST" class="d-none"></form>


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

#navbar img {
  width: 10%;
}

#navbar a {
  font-family: sans-serif;
  color: #FD129E;
  text-decoration: none;
  margin: 1% 1% 1% 0%;
  font-size: 1.5em;
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
  
  #navbar img {
    width: 35%;
    margin-bottom: 10px;
  }
  
  #navbar a {
    margin: 0% 4% 0% 0%;
    font-size: 0.7rem;
  }
}
@media only screen and (max-width: 468px){
  
}
</style>
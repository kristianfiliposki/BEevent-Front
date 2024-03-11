<script>
import { store } from '../store';
export default{
    data(){
        return{

        }
    }
}
</script>
<template>

    <div class="container">
        <!--link e diritti-->
        <footer class="bg-black absolute">
            <!--diritti-->
            <div class=" diritti" id="name">
                <div class="logo">
                    <router-link to="/">
                        <div class="img-box">
                            <img src="/logo/Heavy planning logo.jpg" alt="img" class="img">
                        </div>
                    </router-link>
                </div>
                <div>Heavy Planning</div>
            </div>
            <div class="diritto">
                <span class="note">Inf. legali</span>
                <span class="note">Inf. privacy</span>
                <span class="note">Diritto d'accesso</span>
            </div>
            <!--diritti-->

            <!--social-->
            <div class="social">
                <div class="">trovaci anche su:</div>
                
                <div>
                    <i class="fa-brands fa-instagram c-white"></i>
                    <i class="fa-brands fa-facebook c-white"></i>
                    <i class="fa-brands fa-pinterest c-white"></i>
                    <i class="fa-brands fa-youtube c-white"></i>
                    <i class="fa-brands fa-twitter c-white "></i>
                </div>
            </div>
            <!--fine social-->
        </footer>
        <!--fine link e diritti-->
    </div>
</template>
<style scoped>
*{
    font-size: 0.9em;
}

#name{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
}
.container{
    background-color: #090021;
    height: 10vh;
    color: azure;
    font-size: 1.3em;
}

footer{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
}

.note{
    margin: 1em;

}
a{
    width: 80%;
}
.img{
    width: 100%;
    height: 100%;
}
.img-box{
    width: 100%;
    width: 100%;
}
.logo{
    width: 30%;
    height: 100%;
}

.social{
    display: flex;
}

.social div{
    margin:0 0.3rem ;
}

/* Media queries */
@media only screen and (max-width: 768px) {
    *{
        font-size: 0.8em;
    }

    .diritto{
        display: flex;
        flex-direction: column;
    }
    .diritto span{
        margin: 0;
    }

}
@media only screen and (max-width: 468px) {
    *{
        font-size: 0.8em;
    }

    .diritto{
        display: flex;
        flex-direction: column;
    }
    .diritto span{
        margin: 0;
    }

}



</style>
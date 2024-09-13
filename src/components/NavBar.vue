<template>
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container-fluid p-0">
            <router-link class="navbar-brand p-0" to="/">
                <img src="https://i.postimg.cc/2jBN8jdG/Fortune-Track-Logo.png" alt="logo" class="img-fluid"
                    loading="lazy">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" @click="closeNavbar" active-class="active">
                                Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about" @click="closeNavbar" active-class="active">
                                About
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/predict" @click="closeNavbar" active-class="active">
                                Predict
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact" @click="closeNavbar" active-class="active">
                                Reach Me
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    padding: 0px;
    margin: 0px;
    background-color: #4169E1;
}

.navbar-brand,
.nav-link {
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    color: black;
    font-size: 24px;
}

.nav-link:hover{
    color: white;
}

.nav-link.active {
    color: white;
}

.navbar-toggler{
    border-color: black;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 1%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 7h22M4 13h22M4 19h22'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    height: 30px;
    width: 30px;
    border: 1px solid black;
}
</style>

<script>
export default {
    methods: {
        closeNavbar() {
            let navbarCollapse = document.getElementById('navbarSupportedContent')
            navbarCollapse.classList.remove('show')
        }
    }
}
</script>
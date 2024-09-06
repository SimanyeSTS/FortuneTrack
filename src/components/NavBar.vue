<template>
    <nav class="navbar navbar-expand-lg sticky-top">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
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
                        <router-link class="nav-link active" aria-current="page" to="/" @click="closeNavbar">
                                Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about" @click="closeNavbar">
                                About
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/predict" @click="closeNavbar">
                                Predict
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact" @click="closeNavbar">
                                Reach me
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
    font-weight: bold;
    color: black;
}
.nav-link:hover{
    color: white;
}

.navbar-toggler{
    border-color: black;
}

.navbar-toggler-icon{
    background-color: #4169E1;
}

.nav-item i{
    margin-right: 5px;
}

img{
    padding: 0px;
    margin: 0px;
}
</style>

<script>
export default {
    methods: {
        closeNavbar() {
            let navbarCollapse = document.getElementById('navbarSupportedContent');
            navbarCollapse.classList.remove('show');
        }
    }
}
</script>
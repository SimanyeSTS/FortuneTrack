
<template>
    <footer class="container-fluid">
        <div class="row">
            <p class="lead">&copy;Copyright | FotuneTrack</p><span class="shadow">{{ cYear }}</span>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterComp",
    data() {
        return {
            cYear: new Date().getUTCFullYear()
        }
    },
}
</script>

<style scoped>
.container-fluid{
    background-color: #4169E1;
}
.container-fluid, p{
    font-family: 'Montserrat', sans-serif;
    text-align: center;
    font-weight: 900;
    color: black;
    font-size: 24px;
}
</style>
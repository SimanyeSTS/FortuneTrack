
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
    text-align: center;
    font-weight: bold;
}
</style>
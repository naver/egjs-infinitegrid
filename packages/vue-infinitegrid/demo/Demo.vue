<template>
    <div>
        <header>Vue-InfiniteGrid Demo</header>
        <article>
            <router-link class="link" to="/gridlayout">GridLayout</router-link>
        </article>
        <transition name="component-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<style scoped>
body {
    margin: 0;
}
header {
    font-size: 30px;
    font-weight: 300;
    padding: 20px;
}
article {
    font-size: 20px;
    padding: 20px;
}
a.link::before {
    content: "▪ ";
}
</style>

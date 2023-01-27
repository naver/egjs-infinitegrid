# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.8.1](https://github.com/naver/egjs-infinitegrid/compare/4.7.1...4.8.1) (2023-01-27)
### :sparkles: Packages
* `@egjs/infinitegrid` 4.8.1
* `@egjs/react-infinitegrid` 4.8.1
* `@egjs/svelte-infinitegrid` 4.8.1
* `@egjs/vue-infinitegrid` 4.8.1
* `@egjs/vue3-infinitegrid` 4.8.1
* `@egjs/ngx-infinitegrid` 4.8.1


### :rocket: New Features

* All
    * update `@egjs/grid` module ([081acd5](https://github.com/naver/egjs-infinitegrid/commit/081acd53fd4ccd00b16e70e8ef86f11a63bd764c))


### :bug: Bug Fix

* `@egjs/vue3-infinitegrid`, `@egjs/vue-infinitegrid`
    * support vue 3 types (#523) ([1e09868](https://github.com/naver/egjs-infinitegrid/commit/1e0986889421ecf7a690e1f59d4adf9c0966c90f))
* `@egjs/infinitegrid`
    * fix changed groupKey (#526) ([6db0bff](https://github.com/naver/egjs-infinitegrid/commit/6db0bffc8a2d23568eb36caf1cfb8d1677c08192))
* `@egjs/ngx-infinitegrid`
    * **ngx-infinitegrid:** re-arrange peer deps and call `next` on the destroy subject (#520) ([0410c76](https://github.com/naver/egjs-infinitegrid/commit/0410c7630d443475fbc9252ea2cc5e53cb9abc21))
    * **ngx-infinitegrid:** reduce change detection cycles and teardown event listeners once the view is removed (#518) ([ee30a5b](https://github.com/naver/egjs-infinitegrid/commit/ee30a5bb21e78653844b63ac76f21e2614d8f10c))


### :memo: Documentation

* fix README ([1fe439f](https://github.com/naver/egjs-infinitegrid/commit/1fe439f513d9bcefeca92700d592d1b394b0a0dd))


### :mega: Other

* All
    * update packages versions ([191e57f](https://github.com/naver/egjs-infinitegrid/commit/191e57fbb4df5c2fc8f990fa44e2819bdadf5ee6))



## 4.7.1 (2022-09-08)
### :sparkles: Packages
* `@egjs/infinitegrid` 4.7.1
* `@egjs/react-infinitegrid` 4.7.1
* `@egjs/svelte-infinitegrid` 4.7.1
* `@egjs/vue-infinitegrid` 4.7.1
* `@egjs/vue3-infinitegrid` 4.7.1
* `@egjs/ngx-infinitegrid` 4.7.1


### :rocket: New Features

* `@egjs/vue-infinitegrid`, `@egjs/svelte-infinitegrid`, `@egjs/react-infinitegrid`, `@egjs/ngx-infinitegrid`
    * add storybook (#321) ([a726015](https://github.com/naver/egjs-infinitegrid/commit/a726015066824842ef2ba05cd53e1f7a3514d8ae))
* `@egjs/react-infinitegrid`, `@egjs/infinitegrid`
    * add includePlaceholders param (#484) ([39852c3](https://github.com/naver/egjs-infinitegrid/commit/39852c38f643afe56a959831b73e78bf84b7c0a9))
* `@egjs/ngx-infinitegrid`, `@egjs/infinitegrid`
    * add scrollContainer option (#511) ([78043ad](https://github.com/naver/egjs-infinitegrid/commit/78043ada3f65c54ed26b04bf2e4655d74961d449))
* `@egjs/svelte-infinitegrid`, `@egjs/ngx-infinitegrid`
    * support ResizeObserver#464 (#470) ([4400701](https://github.com/naver/egjs-infinitegrid/commit/4400701b5eafc52b41eb9d496bad48f551bcf96e))
* `@egjs/infinitegrid`
    * add insertByGroupIndex method (#489) ([87a06ef](https://github.com/naver/egjs-infinitegrid/commit/87a06ef9aad2a289e1360ac6c17f36e125ea75cf))
    * add nextGroupKeys property in request events (#493) ([b0260ad](https://github.com/naver/egjs-infinitegrid/commit/b0260ad828e725e6f1266898e0df7ac30a116d80))
* `@egjs/react-infinitegrid`
    * add isCached method (#288) ([1836a5b](https://github.com/naver/egjs-infinitegrid/commit/1836a5b9370d82f0f2714a571712727509445840))
    * add react-infinitegrid@3.0.0 (#296) ([a688207](https://github.com/naver/egjs-infinitegrid/commit/a688207f9c9bf3fcdafa5c52db8478d704b86e8a))
    * **react-infinitegrid:** add getItems method (#270) ([a1386be](https://github.com/naver/egjs-infinitegrid/commit/a1386bec61f79d70f2d469542e2a69b0f2e7c4eb))
    * **react-infinitegrid:** add react-infinitegrid module (#172) ([a6990e4](https://github.com/naver/egjs-infinitegrid/commit/a6990e41c7bfca5bca4fa1853fe293670f581a0d)), closes [#134](https://github.com/naver/egjs-infinitegrid/issues/134) [#128](https://github.com/naver/egjs-infinitegrid/issues/128) [#129](https://github.com/naver/egjs-infinitegrid/issues/129) [#148](https://github.com/naver/egjs-infinitegrid/issues/148) [#149](https://github.com/naver/egjs-infinitegrid/issues/149) [#150](https://github.com/naver/egjs-infinitegrid/issues/150) [#162](https://github.com/naver/egjs-infinitegrid/issues/162)
    * **react-infinitegrid:** add resize method (#195) ([ac0c548](https://github.com/naver/egjs-infinitegrid/commit/ac0c5487281a0490f13600e81c30d9b6d05e99d1)), closes [#193](https://github.com/naver/egjs-infinitegrid/issues/193)
    * **react-infinitegrid:** add updateItem, updateItems, getItem (#271) ([bc50654](https://github.com/naver/egjs-infinitegrid/commit/bc506543fecc9b25ace8195364c4b682b37950d6))
    * **react-infinitegrid:** add useFirstRender option (#265) ([9cbce7b](https://github.com/naver/egjs-infinitegrid/commit/9cbce7b320ca086247f0d38638e03fcde78c9d2b))
    * **react-infinitegrid:** add useFit option (#187) ([002f4bf](https://github.com/naver/egjs-infinitegrid/commit/002f4bfe81ed390cb6314da4217dc7779fbf666a))
    * **react-infinitegrid:** update InfiniteGrid 3.4.0 version (#209) ([ab1cb6d](https://github.com/naver/egjs-infinitegrid/commit/ab1cb6d86bff9b15a6f873c7b35352f14d620932))
* `@egjs/ngx-infinitegrid`
    * Add ngx-infinitegrid@3.0.0 (#297) ([21f3c9f](https://github.com/naver/egjs-infinitegrid/commit/21f3c9f944c93ef4738cfe3c5587f88253def679))
* `@egjs/svelte-infinitegrid`
    * add svelte-infinitegrid@3.0.0 (#301) ([8c878c9](https://github.com/naver/egjs-infinitegrid/commit/8c878c9e8d4a43ab2e98f21cb124677c7fd8f0b4))
* `@egjs/vue-infinitegrid`
    * init vue-infinitegrid ([127e684](https://github.com/naver/egjs-infinitegrid/commit/127e6843418d3cc56e5e1d40c24a36910de5daa2))
    * init vue-infinitegrid layouts ([44dccbd](https://github.com/naver/egjs-infinitegrid/commit/44dccbdfc7b62e03e45b5a0cdcbda77a94f03813))
    * use named slot as loading element ([64db738](https://github.com/naver/egjs-infinitegrid/commit/64db73801be837afc1feb2a183d12b66b7f6a464))
* Other
    * add observeChildren option (#481) ([c821b4c](https://github.com/naver/egjs-infinitegrid/commit/c821b4c46c6395dae9d9c545e446857d5a13e134))
    * add percentage option #121 (#367) ([addffc1](https://github.com/naver/egjs-infinitegrid/commit/addffc1bd18383de2db93789381ffcf311867d75))
    * add removeByIndex method (#291) ([1c37ecf](https://github.com/naver/egjs-infinitegrid/commit/1c37ecf67b0653096754a5d9efae2389ae8c20e0))
    * add resizeDebounce, maxResizeDebounce (#361) ([8dc5732](https://github.com/naver/egjs-infinitegrid/commit/8dc5732c3ea0ff133a322be9baae64ac7512281e))
    * add row option to JustifiedLayout (#383) ([9e9ff2c](https://github.com/naver/egjs-infinitegrid/commit/9e9ff2c2d55b93e5ecd0e28bcbf4fab46c552e3a))
    * add useOffset option (#412) ([78d36c9](https://github.com/naver/egjs-infinitegrid/commit/78d36c9c1f6b576a7cb784e18e4433a51d7c7bb3))
    * **all:** add getStatus/setStatus ([d007ebb](https://github.com/naver/egjs-infinitegrid/commit/d007ebb3676c45e80c712603ce5dce2ad0e408c2))
    * **all:** add getStatus/setStatus ([6008e3d](https://github.com/naver/egjs-infinitegrid/commit/6008e3d715e67b489809cbdb35f1be120e530560))
    * **all:** add getStatus/setStatus ([d78d000](https://github.com/naver/egjs-infinitegrid/commit/d78d0008f388cc056c0ec366b733f7029b387e86))
    * **all:** add isTrusted properties ([78abe2d](https://github.com/naver/egjs-infinitegrid/commit/78abe2dfad0ed688f046ce544df05a2d81274d96)), closes [#60](https://github.com/naver/egjs-infinitegrid/issues/60)
    * **all:** support IE8 ([0557460](https://github.com/naver/egjs-infinitegrid/commit/055746017947103ae469f524177d009060148c6c))
    * **DOMRanderer:** update size ([a008f34](https://github.com/naver/egjs-infinitegrid/commit/a008f3499a58ef621ee51403d686677d77b3a651))
    * **DOMRenderer:** add orgSize property ([62b7c9c](https://github.com/naver/egjs-infinitegrid/commit/62b7c9ca61da87a87fc3eca93fdc1ad30f9dea3f))
    * **Infinite:** add change event ([4e40bd7](https://github.com/naver/egjs-infinitegrid/commit/4e40bd7d2b239a7d0f6efcc616287858dff0f59f))
    * **Infinite:** add change event ([d26cb98](https://github.com/naver/egjs-infinitegrid/commit/d26cb98cf08926ce8ac4bf21364b28b264e50399))
    * **Infinite:** add getCursor method ([8febfa5](https://github.com/naver/egjs-infinitegrid/commit/8febfa59c46d5318e15f436bc73d783ddf572213))
    * **Infinite:** add getGroupKeys ([f5c8bf4](https://github.com/naver/egjs-infinitegrid/commit/f5c8bf42f201e30c902797b9726630cb96885b95))
    * **Infinite:** add getItems ([d8e6207](https://github.com/naver/egjs-infinitegrid/commit/d8e6207076669ac4a8046c69f36f1db3ff4f8a98))
    * **Infinite:** add infinite ([459c5bf](https://github.com/naver/egjs-infinitegrid/commit/459c5bf4bb684db94b46b950b8690fcbb1291b2d))
    * **InfiniteGrid,eventHandler:** add isTrusted property in event (#39) ([403464b](https://github.com/naver/egjs-infinitegrid/commit/403464ba59c69184f7d2c79665631f817a342fca)), closes [#33](https://github.com/naver/egjs-infinitegrid/issues/33)
    * **InfiniteGrid:** add event parameter 'isScroll' ([59b5932](https://github.com/naver/egjs-infinitegrid/commit/59b59326151b03467210d1f7859b9bcebfddf112))
    * **InfiniteGrid:** add getItem, updateItem, updateItems method (#248) ([3f92113](https://github.com/naver/egjs-infinitegrid/commit/3f92113d44272038609c07407aaa3633aef5d947))
    * **InfiniteGrid:** add ImageError event (#89) ([0b4873f](https://github.com/naver/egjs-infinitegrid/commit/0b4873fad302ad57dce708d3d980c4deafa42235))
    * **InfiniteGrid:** add infinite module ([408fdf4](https://github.com/naver/egjs-infinitegrid/commit/408fdf4b1d7c0770ec637329adf7639f83620bd2))
    * **InfiniteGrid:** add isConstantSize option (#198) ([a9cfe40](https://github.com/naver/egjs-infinitegrid/commit/a9cfe40f177c3276bf2e022b5408a81a050e9d6f))
    * **InfiniteGrid:** add itemSelector option (#17) ([b17fdd3](https://github.com/naver/egjs-infinitegrid/commit/b17fdd3cb154a26fe8780fd3b80e4c376b5bf4d7)), closes [#2](https://github.com/naver/egjs-infinitegrid/issues/2)
    * **InfiniteGrid:** add loading bar ([a77751e](https://github.com/naver/egjs-infinitegrid/commit/a77751ec82bc0190b777c421364fba687d49fa99))
    * **InfiniteGrid:** add loading events ([6bcae6a](https://github.com/naver/egjs-infinitegrid/commit/6bcae6aac23ac49534738205620c5fc91685d041))
    * **InfiniteGrid:** add moveTo method ([77bcb94](https://github.com/naver/egjs-infinitegrid/commit/77bcb946b51d99ce9b42b9ce4d6fc79987693898))
    * **InfiniteGrid:** add moveTo method ([18a20f9](https://github.com/naver/egjs-infinitegrid/commit/18a20f989b1111d056dd9d65ef3d49d9bb32f891))
    * **InfiniteGrid:** add transitionDuration option (#199) ([646e87d](https://github.com/naver/egjs-infinitegrid/commit/646e87dd4c149f8f7f39e2173b323322b9850f80)), closes [#133](https://github.com/naver/egjs-infinitegrid/issues/133)
    * **InfiniteGrid:** add version in InfiniteGrid module ([93adb6f](https://github.com/naver/egjs-infinitegrid/commit/93adb6f5d04af75ac958a3f0b92586c4a7be1250))
    * **InfiniteGrid:** change direction option to horizontal ([04c6181](https://github.com/naver/egjs-infinitegrid/commit/04c6181b0e2d08fc485078c520cad24a7d581223))
    * **InfiniteGrid:** make infinitegrid ([f27a7e8](https://github.com/naver/egjs-infinitegrid/commit/f27a7e8313c3737f0207006e403e7cfba6263a76))
    * **InfiniteGrid:** save/restore scroll position in get/setStatus (#38) ([1576c44](https://github.com/naver/egjs-infinitegrid/commit/1576c443de7d027fa58d0b24fa0708c496e6f879)), closes [#36](https://github.com/naver/egjs-infinitegrid/issues/36)
    * **infiniteGrid:** support ([1ad6b3b](https://github.com/naver/egjs-infinitegrid/commit/1ad6b3b3a61f32e9509ca2a8ae78c3d644af3521))
    * **InfiniteGrid:** Support layout when items already have contained (#59) ([3d9f347](https://github.com/naver/egjs-infinitegrid/commit/3d9f3476030068bbc548fd1684e396db97d21cbf)), closes [#56](https://github.com/naver/egjs-infinitegrid/issues/56)
    * **Infinite:** separate infinite module ([2824bd3](https://github.com/naver/egjs-infinitegrid/commit/2824bd3a81d3f60053962997a841ff76946a2b15))
    * **Infnite:** add useRecyle ([b02245c](https://github.com/naver/egjs-infinitegrid/commit/b02245ceda612c123b3b64b6dc383431dac50c50))
    * **ItemManager:** add indexOf method ([c72eeee](https://github.com/naver/egjs-infinitegrid/commit/c72eeee3ebd9d49bf6e4be452eb533d06c35d063))
    * **Layout:** add common constant ALIGN ([dda0ea6](https://github.com/naver/egjs-infinitegrid/commit/dda0ea6659ffe60b731a843093fb1288f725c306))
    * **Layout:** add FacebookLayout ([818f131](https://github.com/naver/egjs-infinitegrid/commit/818f1315aa97502b43adb51e462c4f6341e31d90))
    * **Layout:** add FacebookLayout ([5323c6b](https://github.com/naver/egjs-infinitegrid/commit/5323c6bf62555621df089137408959ac894f1989))
    * **Layout:** add FrameLayout ([a7e5708](https://github.com/naver/egjs-infinitegrid/commit/a7e57087cd4b49477b8a6b479b7990095e1db3b6))
    * **Layout:** add FrameLayout ([3c4cc02](https://github.com/naver/egjs-infinitegrid/commit/3c4cc02bbae766cc5a5450cc4f7141891b8c2cb1))
    * **Layout:** add FrameLayout ([7b18694](https://github.com/naver/egjs-infinitegrid/commit/7b18694d201a36d6113c1a88927453789b3277d9))
    * **Layout:** add FrameLayout ([926bd4a](https://github.com/naver/egjs-infinitegrid/commit/926bd4ab95c82b22015386d27971d7043ed64174))
    * **Layout:** add FrameLayout (#51) ([f493e48](https://github.com/naver/egjs-infinitegrid/commit/f493e488ab38dd702a99102dec8182d0aef31afe))
    * **Layout:** add FrameLayout (#51) ([966fd02](https://github.com/naver/egjs-infinitegrid/commit/966fd02b44eaee8478db85f0f775facd0d45c061))
    * **Layout:** add GoogleLayout ([e3b2d4b](https://github.com/naver/egjs-infinitegrid/commit/e3b2d4b1bd0c713a86c50c19ea4f362c3d59aa49))
    * **Layout:** add GoogleLayout ([4a31b7a](https://github.com/naver/egjs-infinitegrid/commit/4a31b7aa338bef081ebf96884377c0625e30bc39))
    * **Layout:** add GoogleLayout on outline ([2410fb0](https://github.com/naver/egjs-infinitegrid/commit/2410fb0f4c14fc47939aa260c6267b8da2f39467))
    * **Layout:** add GoogleLayout on outline ([d231f79](https://github.com/naver/egjs-infinitegrid/commit/d231f7922aa4224f4e032d090fa26a3c095cc8b2))
    * **Layout:** add GridLayout ([f7de0a8](https://github.com/naver/egjs-infinitegrid/commit/f7de0a803220b30556572e697647ff9529a98d96))
    * **Layout:** add GridLayout ([7e7a59a](https://github.com/naver/egjs-infinitegrid/commit/7e7a59a64336e952eb87b8c97f440880ddc94755))
    * **Layout:** add GridLayout (#49) ([e80b7d9](https://github.com/naver/egjs-infinitegrid/commit/e80b7d9244e771474b9b5236e65b71ec33008b03))
    * **Layout:** add index to group's outline ([fcc7c3b](https://github.com/naver/egjs-infinitegrid/commit/fcc7c3b514afe78c24cc01a0f5c62d58761f6e9d))
    * **Layout:** add index to group's outline ([be738d8](https://github.com/naver/egjs-infinitegrid/commit/be738d80186d4e0541e27f3836b0de4ede90f746))
    * **Layout:** add JustifiedLayout (#44) ([8110fe6](https://github.com/naver/egjs-infinitegrid/commit/8110fe64f47fa733e020a06b7a4505576d075441))
    * **Layout:** add LightBoxLayout ([0207af9](https://github.com/naver/egjs-infinitegrid/commit/0207af9335e232c71ffbaab13a4f2495179fbf7e))
    * **Layout:** add LightBoxLayout ([4ac2ab8](https://github.com/naver/egjs-infinitegrid/commit/4ac2ab8438d1075961c8166721aef4061a9d8097))
    * **Layout:** add PackingLayout ([f6d42c7](https://github.com/naver/egjs-infinitegrid/commit/f6d42c79c97443d34a90661d1f5bad10dfafbbef))
    * **Layout:** add PackingLayout ([48ea293](https://github.com/naver/egjs-infinitegrid/commit/48ea293050c8898e0438f6c22b29ec7175ea524f))
    * **Layout:** add prefix underbar  to private variable ([fa7cb67](https://github.com/naver/egjs-infinitegrid/commit/fa7cb675c94186ffaea07c15fcf6d5addbb0cec4))
    * **LayoutManager:** add LayoutManager module and fix Infinite scroll (#197) ([e410c6e](https://github.com/naver/egjs-infinitegrid/commit/e410c6ef8aa36684e38c5ab0a964da341793e38a)), closes [#135](https://github.com/naver/egjs-infinitegrid/issues/135) [#173](https://github.com/naver/egjs-infinitegrid/issues/173) [#185](https://github.com/naver/egjs-infinitegrid/issues/185) [#186](https://github.com/naver/egjs-infinitegrid/issues/186) [#192](https://github.com/naver/egjs-infinitegrid/issues/192)
    * **Parallax:** add Parallax ([ba67c4c](https://github.com/naver/egjs-infinitegrid/commit/ba67c4ce3cea2bbb58d09a2160376d1e2a9a4820))
    * **react-infinitegrid:** add react component ([2024a28](https://github.com/naver/egjs-infinitegrid/commit/2024a28489a0e12b1208dba396d58490bf2d7305)), closes [#67](https://github.com/naver/egjs-infinitegrid/issues/67)
    * **react-layout:** add size percentage option and fix no children error ([2e3a66b](https://github.com/naver/egjs-infinitegrid/commit/2e3a66bc8dbbc306988bc95a7b983c2a0468ee62)), closes [#163](https://github.com/naver/egjs-infinitegrid/issues/163) [#166](https://github.com/naver/egjs-infinitegrid/issues/166)
    * **react:** add option isEqualSize ([caea50a](https://github.com/naver/egjs-infinitegrid/commit/caea50a16e0deac049be2ad360fa65f1cec9aad6))
    * **react:** add react-layout package ([c1e2d4c](https://github.com/naver/egjs-infinitegrid/commit/c1e2d4ca9aa8c3d7286b030d376a3f8fed682983))
    * **react:** add react-layout README ([cfeeef4](https://github.com/naver/egjs-infinitegrid/commit/cfeeef4c5705dedfe1bdb7b37c159a04346064cc))
    * **react:** support react component react-layout (#103) ([063714b](https://github.com/naver/egjs-infinitegrid/commit/063714b09b3de8e8b4f6b544e93dd6e1d284c533)), closes [#101](https://github.com/naver/egjs-infinitegrid/issues/101)
    * support native lazy loading #354 (#368) ([8fca094](https://github.com/naver/egjs-infinitegrid/commit/8fca094d8222ca3f22fd08d042f137dca8ed0255))
    * **util:** support eventListenerOptions ([6e1517c](https://github.com/naver/egjs-infinitegrid/commit/6e1517ca57290b7ce2b4d7a6edb2463d586c3c42))
    * **watcher:** add Watcher ([bbf1a55](https://github.com/naver/egjs-infinitegrid/commit/bbf1a55d5ef938f10f92ff8cb62142572243846b))


### :bug: Bug Fix

* `@egjs/vue-infinitegrid`, `@egjs/svelte-infinitegrid`, `@egjs/react-infinitegrid`, `@egjs/ngx-infinitegrid`
    * fix error in multiple groups (#387) ([02df50f](https://github.com/naver/egjs-infinitegrid/commit/02df50f52644c461e2397458bef428dcb868f02f))
    * fix setStatus method's default value (#373) ([5f8f9a2](https://github.com/naver/egjs-infinitegrid/commit/5f8f9a27a6bc8e55e49247dd6455713b77efeaf1))
* `@egjs/react-infinitegrid`, `@egjs/infinitegrid`
    * add cjs file (#506) ([63fea02](https://github.com/naver/egjs-infinitegrid/commit/63fea02a34ed2e4c7702929cdef87191ce2208dc))
* `@egjs/vue3-infinitegrid`, `@egjs/vue-infinitegrid`
    * fix scopedSlots (#448) ([8e940b5](https://github.com/naver/egjs-infinitegrid/commit/8e940b5f0ed6466485d0a88407e523e405b19baf))
    * fix vue container #422 (#423) ([61be75e](https://github.com/naver/egjs-infinitegrid/commit/61be75e42af20eb2444a4a25ec4d8d7c13133dd1))
* `@egjs/vue-infinitegrid`, `@egjs/react-infinitegrid`
    * fixed the loading bar not rendering initially (#314) ([03ec2a1](https://github.com/naver/egjs-infinitegrid/commit/03ec2a19cc63bad279167a2198f0423dd911fa36))
* `@egjs/vue-infinitegrid`
    * add "name" property on loading component ([d2ab1f7](https://github.com/naver/egjs-infinitegrid/commit/d2ab1f78da6a2ca59e755daedc1a8e850c058eed))
    * add missing layoutOptions ([84195d4](https://github.com/naver/egjs-infinitegrid/commit/84195d4958e88edfd7dbb496c403bf216c92b4a7))
    * fix that loading element is not render (#366) ([d48508f](https://github.com/naver/egjs-infinitegrid/commit/d48508ffc6620628b875d6e6fc0bb4eef75e21b0))
    * rendering issue due to loading bar ([18da1cb](https://github.com/naver/egjs-infinitegrid/commit/18da1cb97917a9ec59efa2c886f8f403e67a8ce0))
* `@egjs/ngx-infinitegrid`
    * add defense code #443 (#446) ([31c5a7f](https://github.com/naver/egjs-infinitegrid/commit/31c5a7fd288f2a2cdc219f6b1227b426e79932c3))
    * fix container for isOverflowScroll (#327) ([6062c69](https://github.com/naver/egjs-infinitegrid/commit/6062c6996aa86bbb8f6103f95bc6327f52b9f9f7))
    * support SSR in angular (#428) ([60151d8](https://github.com/naver/egjs-infinitegrid/commit/60151d899827e7bd251c0d55bd099c701bf8f607))
* `@egjs/infinitegrid`
    * add files field to package.json ([23e37d5](https://github.com/naver/egjs-infinitegrid/commit/23e37d5344b579877490ea5b23a1f65ff946d917))
    * fit groups' outlines for start direction (#502) ([51308c0](https://github.com/naver/egjs-infinitegrid/commit/51308c0750caa517d325a320ac2f14dcfc097337))
    * fix contentError event returns an invalid item #482 ([f865dec](https://github.com/naver/egjs-infinitegrid/commit/f865decd8e12e98a04a93c42baeb4dd31fb345a2))
    * fix items to be removed (#500) ([8317f39](https://github.com/naver/egjs-infinitegrid/commit/8317f3926318e468ef49e9f28d54384c12ae3565))
    * fix mounted setting (#497) ([6d4a281](https://github.com/naver/egjs-infinitegrid/commit/6d4a281e17570b9049afebe651fd4708d230be36))
    * fix outline calculation (#498) ([0446dd4](https://github.com/naver/egjs-infinitegrid/commit/0446dd48f2d532dffc3a460472080fcd78df5724))
    * fix placholder key (#514) ([af62a98](https://github.com/naver/egjs-infinitegrid/commit/af62a98c5f0562e929e09bf976298e8e29aa94e7))
* `@egjs/react-infinitegrid`
    * **browser:** remove global.window for node.js (#233) ([b9ae32a](https://github.com/naver/egjs-infinitegrid/commit/b9ae32a46e3f3acb8b512040956a79a80dff934d)), closes [#232](https://github.com/naver/egjs-infinitegrid/issues/232)
    * call next function on componentDidUpdate (#360) ([5020356](https://github.com/naver/egjs-infinitegrid/commit/5020356ec59943dd647e815827afdb71992f6d7a))
    * change findDOMNode to ref #362 (#363) ([0bd15ab](https://github.com/naver/egjs-infinitegrid/commit/0bd15abcc6deac2143320912b091791a182b758a))
    * fix loading element for first mount #340 (#342) ([9f6ac1a](https://github.com/naver/egjs-infinitegrid/commit/9f6ac1af14e2a4a6029cd2cf8e1dabdde4cbdad0))
    * fix loading element visible (#286) ([4848d68](https://github.com/naver/egjs-infinitegrid/commit/4848d682597374c908c6416aa40afd01692e226f))
    * fix remove group's last item (#290) ([fcf331b](https://github.com/naver/egjs-infinitegrid/commit/fcf331bd148cae0881b11573138ce4044b9656d2))
    * fix strict mode (#476) ([64ac1e3](https://github.com/naver/egjs-infinitegrid/commit/64ac1e3e4792536409f3d9b4c31cd0a8be150bd1))
    * **react-infinitegrid:** fix layout problem during first rendering (#262) ([240be19](https://github.com/naver/egjs-infinitegrid/commit/240be194bb67d338c003d5af4d27fdcd65be5c88))
    * **react-infinitegrid:** fix loading bar (#189) ([aefd5cd](https://github.com/naver/egjs-infinitegrid/commit/aefd5cd973bfbccd2f75a0e59d7ff0718bd7134c)), closes [#170](https://github.com/naver/egjs-infinitegrid/issues/170) [#188](https://github.com/naver/egjs-infinitegrid/issues/188)
    * **react-infinitegrid:** fix no reset data and render first data issue (#181) ([2170d6d](https://github.com/naver/egjs-infinitegrid/commit/2170d6d78f2f160d42c20a9bf9b6a377960807a0)), closes [#179](https://github.com/naver/egjs-infinitegrid/issues/179) [#180](https://github.com/naver/egjs-infinitegrid/issues/180)
    * **react-infinitegrid:** fix package ([ad422e5](https://github.com/naver/egjs-infinitegrid/commit/ad422e579770fdc4404fcc3d26ea89716b3409d8))
    * **react-infinitegrid:** fix refresh group (#273) ([24518ae](https://github.com/naver/egjs-infinitegrid/commit/24518aebab0515086f914ac9f833a1f716e17dee))
    * **react-infinitegrid:** fix refresh groups issue ([8b9a679](https://github.com/naver/egjs-infinitegrid/commit/8b9a6799db7b8b86ecb299dfdf13c2de41308bc5))
    * **react-infinitegrid:** fix setStatus for lazy setStatus (#254) ([72042fb](https://github.com/naver/egjs-infinitegrid/commit/72042fbc32c1881b0761aa53bc2fd63d45b2667e))
    * **react-infinitegrid:** fix status error (#191) ([b8fe21b](https://github.com/naver/egjs-infinitegrid/commit/b8fe21bd445b5aa5e4bbfd18731f16dbb4b9a788)), closes [#190](https://github.com/naver/egjs-infinitegrid/issues/190)
    * **react-infinitegrid:** fix updateItems for no item (#276) ([6891e17](https://github.com/naver/egjs-infinitegrid/commit/6891e17fd6a155627a0be2169d9b37779072f86f))
    * **react-infinitegrid:** support tree shaking ([d02e1b9](https://github.com/naver/egjs-infinitegrid/commit/d02e1b95babbd158fb66de43d3ace302a16941d7))
    * update react-infinitegrid ([4b4b5f5](https://github.com/naver/egjs-infinitegrid/commit/4b4b5f5dc4606a1123b6d89876e2d434ea9d9bb0))
    * update react-infinitegrid ([ffd117d](https://github.com/naver/egjs-infinitegrid/commit/ffd117d82b43fb346e1df876cf6de2cc998e7a31))
* `@egjs/svelte-infinitegrid`
    * change afterUpdate lifecycle (#304) ([4851854](https://github.com/naver/egjs-infinitegrid/commit/4851854348524ffb247316c8bd5ddc71b7deb678))
    * fix setStatus' getter (#377) ([16fa80c](https://github.com/naver/egjs-infinitegrid/commit/16fa80c042579c9766b5143b1787980930405d78))
    * fix svelte types (#460) ([cace348](https://github.com/naver/egjs-infinitegrid/commit/cace34814d65c53562648da5713d4191242e61bd))
    * fix svelte version issue (#315) ([bee5b3d](https://github.com/naver/egjs-infinitegrid/commit/bee5b3d272261b69c9366079f028560c43c30f63))
    * fix svelte-infinitegrid's typo ([6fe14d5](https://github.com/naver/egjs-infinitegrid/commit/6fe14d5deba9922fe3864b2ed758cdaaa73a9fa0))
    * fix types (#457) ([f402d62](https://github.com/naver/egjs-infinitegrid/commit/f402d62ca0335c00e6bff2f68b1c343cfc6a285d))
    * fix types (#510) ([96adfd7](https://github.com/naver/egjs-infinitegrid/commit/96adfd7bd66c6d77015818417990339da1b59311))
    * support svelte SSR (#430) ([1518182](https://github.com/naver/egjs-infinitegrid/commit/1518182c36483574ac4a9c4ef5896d45f9c5ed05))
* `@egjs/vue3-infinitegrid`
    * fix script (#440) ([367f057](https://github.com/naver/egjs-infinitegrid/commit/367f057116aeca7afef19a80d01566be1bd330b6))
* Other
    * **all:** add keywords, reduce size, export modules (#137) ([c846787](https://github.com/naver/egjs-infinitegrid/commit/c84678772b34b191c26f61369f66a77b0752387b)), closes [#130](https://github.com/naver/egjs-infinitegrid/issues/130) [#122](https://github.com/naver/egjs-infinitegrid/issues/122) [#136](https://github.com/naver/egjs-infinitegrid/issues/136) [#132](https://github.com/naver/egjs-infinitegrid/issues/132)
    * **all:** remove Object.assing ([ca4e059](https://github.com/naver/egjs-infinitegrid/commit/ca4e059bc758edea73f026e180a778acb399da86))
    * **browser:** fix browser bug ([a9441a2](https://github.com/naver/egjs-infinitegrid/commit/a9441a2edb65f80cb3677bf693a401226423e255))
    * caculate itemSize for no column, no itemSize (#311) ([5564e97](https://github.com/naver/egjs-infinitegrid/commit/5564e9754e31a65b8c571642376cb09927298b15))
    * change cursor before calling recycle (#319) ([0732f66](https://github.com/naver/egjs-infinitegrid/commit/0732f661cdd7a01ee80f8b56779252080c7a4ca2))
    * change cursors in first layout (#380) ([7363bf2](https://github.com/naver/egjs-infinitegrid/commit/7363bf28d2dfd66472314ee7d6f16904eba3bbad))
    * **component:** support IE8 ([b321785](https://github.com/naver/egjs-infinitegrid/commit/b321785bd171ef3f0067407f670d45818c3fd2a2))
    * connect the visible and invisible areas (#452) ([2f30151](https://github.com/naver/egjs-infinitegrid/commit/2f30151a29bba0abce6999688dfd7c18026ad882))
    * **declaration:** fix InfiniteGrid types ([d8d3ffa](https://github.com/naver/egjs-infinitegrid/commit/d8d3ffac7afc7ebed7c64185810a813b6471c6cd))
    * **demo:** fix arrow syntax ([b87289a](https://github.com/naver/egjs-infinitegrid/commit/b87289afb92501410070bfbb04dded4aecde2bb0))
    * **demo:** fix innerHeight for IE ([9970066](https://github.com/naver/egjs-infinitegrid/commit/997006696cccdfa0ac1a4a6542899b5ebfa46c13))
    * **demo:** image url ([bc20f2c](https://github.com/naver/egjs-infinitegrid/commit/bc20f2c2070c10bd9f74c0081f4022890d7b89e5))
    * **DOMRenderer:** apply QA ([2a620dc](https://github.com/naver/egjs-infinitegrid/commit/2a620dc2795975832873ba52215b3026a861b888))
    * **DOMRenderer:** defense browser for webkit below 537 ([177600b](https://github.com/naver/egjs-infinitegrid/commit/177600be476aa030d6ddb058a4b297d7583d577e))
    * **DOMRenderer:** fix constructor options's initialize ([eafb8c9](https://github.com/naver/egjs-infinitegrid/commit/eafb8c9e33a9cb3ee304ade0a27f1d9e089bd824))
    * **DOMRenderer:** fix offsetTop for isOverflowScroll ([21bda49](https://github.com/naver/egjs-infinitegrid/commit/21bda49e1588192670f7176238a929b834e70e4e))
    * **DOMRenderer:** fix resize for display: none (#278) ([44df9e6](https://github.com/naver/egjs-infinitegrid/commit/44df9e67f20bab002750e7773f1522b4a27c85fe))
    * **DOMRenderer:** fix setTransition ([b6d1036](https://github.com/naver/egjs-infinitegrid/commit/b6d10361e267f5bc5739f4b24d8fb26a6c1fc2cc))
    * **DOMRenderer:** prevent adding duplicate element ([9fafb21](https://github.com/naver/egjs-infinitegrid/commit/9fafb211db2f466aeb3b3c2e44eca22e106d2a79))
    * **DOMRenderer:** remove link ([43f9d35](https://github.com/naver/egjs-infinitegrid/commit/43f9d35d9d7ea9212b19d249d3abe3a7c3a105c6))
    * **DOMRenderer:** remove scrollBy method ([345c210](https://github.com/naver/egjs-infinitegrid/commit/345c21020b8647474d4259c6290dc7243e5991cb))
    * **DOMRenderer:** remove unnecessary method ([c8c83cf](https://github.com/naver/egjs-infinitegrid/commit/c8c83cf1d5efbe6c5af9c09b9f5c6b5a40365424))
    * **DOMRenderer:** restore style after destroy ([4b54f68](https://github.com/naver/egjs-infinitegrid/commit/4b54f689e61debbc65353a764eaea4dc7ac57893)), closes [#73](https://github.com/naver/egjs-infinitegrid/issues/73)
    * **DOMRenderer:** support cross browser ([08525e5](https://github.com/naver/egjs-infinitegrid/commit/08525e51daa14fc324ed106126c48958d70bd2c2))
    * **DOMRenderer:** treat no parentNode ([59c6ec2](https://github.com/naver/egjs-infinitegrid/commit/59c6ec23aff5630d5b81692e04681567b8e607f7))
    * **eventHandler:** fix resize event when isOverflowScroll:true (#15) ([708cf33](https://github.com/naver/egjs-infinitegrid/commit/708cf337ab9c17cbc7230573ccf4d36e8cd5df14))
    * fix attribute name in SquareLayout (#309) ([3afa4ff](https://github.com/naver/egjs-infinitegrid/commit/3afa4ff3140520519f49848a3dab97c430daf661))
    * fix bug that el is null (#284) ([9903e10](https://github.com/naver/egjs-infinitegrid/commit/9903e10eef7110dcc4b15c9ec5b4a0232ab46247))
    * fix changed data (#392) ([d1d2040](https://github.com/naver/egjs-infinitegrid/commit/d1d20404d517f420c774bdaffaa6243ee1c1c5da))
    * fix container's height (#426) ([719b8ee](https://github.com/naver/egjs-infinitegrid/commit/719b8eecdbb839fb12f00f3d47ab964567f0a0f1))
    * fix destroy method (#404) ([42abbbf](https://github.com/naver/egjs-infinitegrid/commit/42abbbfe50aa64185044c912735b4790160f57c3))
    * fix first rendering items (#437) ([21300ac](https://github.com/naver/egjs-infinitegrid/commit/21300acfbb33095dbc922eb5ed6d9fcb6ac25f59))
    * fix infinitegrid dependency (#323) ([246f9d8](https://github.com/naver/egjs-infinitegrid/commit/246f9d8d6073c40346ea1e64df93f9e4fd316d6e))
    * fix item position not set with row option (#385) ([9b78c95](https://github.com/naver/egjs-infinitegrid/commit/9b78c9500b3a759faf97b8d8533d305d83e39a3f))
    * fix prepending first item's position (#338) ([553bd3c](https://github.com/naver/egjs-infinitegrid/commit/553bd3cdaa09fd587a7986a966db0b2b2703fd06))
    * fix random key, groupkey (#438) ([cfe22d6](https://github.com/naver/egjs-infinitegrid/commit/cfe22d695a6bfe224b543322e13bf4aba72dbbd0))
    * fix SquareLayout's outline caculation (#339) ([7fbb582](https://github.com/naver/egjs-infinitegrid/commit/7fbb58265a9b6cc5b983f07f2896ad2c43069466))
    * fix status recovery (#445) ([b93e154](https://github.com/naver/egjs-infinitegrid/commit/b93e1543c665b77d845bd111db5da6eff18927e6)), closes [#444](https://github.com/naver/egjs-infinitegrid/issues/444)
    * fix to change infinite viewSize after resize (#401) ([7588775](https://github.com/naver/egjs-infinitegrid/commit/7588775a1b38f3270a2ac5699b58a81cd0187613))
    * **FrameLayout:** fix layout function for prepended items ([58a5c61](https://github.com/naver/egjs-infinitegrid/commit/58a5c612c77b50e25d26f578c356eb38b9bf3481))
    * **GridLayout:** remove fill method ([988f7e6](https://github.com/naver/egjs-infinitegrid/commit/988f7e6631979eee74ea3c8d09cf7decf365787a))
    * if you have data to prepend, request it (#281) ([f284f15](https://github.com/naver/egjs-infinitegrid/commit/f284f159354ef06766e6ae92a2a4edb177e944c0))
    * **ImageLoaded:** add asynchronous code ([a8a8682](https://github.com/naver/egjs-infinitegrid/commit/a8a8682b60b73e3ba8c59de6fb37003a3abaab84))
    * **ImageLoaded:** add logic to check image element ([8a19363](https://github.com/naver/egjs-infinitegrid/commit/8a19363a78fceec7f1503cc762c805dcc7429f26))
    * **ImageLoaded:** fix that itemIndex is undefined ([00fa6fd](https://github.com/naver/egjs-infinitegrid/commit/00fa6fde7d5effc7a2fce3d70413359851fa9f77))
    * **InfinieGrid:** fix bug for resize (#53) ([efd111c](https://github.com/naver/egjs-infinitegrid/commit/efd111c9680ca56602ea13cd9824e382a148ab82)), closes [#52](https://github.com/naver/egjs-infinitegrid/issues/52)
    * **Infinite:** add itemManager method ([53f11c8](https://github.com/naver/egjs-infinitegrid/commit/53f11c87a515d9b6dd62f49caad7a9c8b539cbe9))
    * **Infinite:** fix Infinite recycle point ([e5b8af3](https://github.com/naver/egjs-infinitegrid/commit/e5b8af376d8e35eb8668291718e8699d08e0ed98))
    * **Infinite:** fix infinite scroll ([fed913e](https://github.com/naver/egjs-infinitegrid/commit/fed913ec20b32dcedf246f5413087c8dc529f8e0))
    * **infinite:** fix recycle bug ([d543ae4](https://github.com/naver/egjs-infinitegrid/commit/d543ae41e57607f4021b1ec67a36ad0c89fb574b))
    * **infinite:** fix recycle bug ([4c67af4](https://github.com/naver/egjs-infinitegrid/commit/4c67af4293b181457142ecb41e36de8ef8dbd967))
    * **Infinite:** fix recycle visible area ([f174f26](https://github.com/naver/egjs-infinitegrid/commit/f174f261e0a90a90a8188304cbe681b5b5cb59e5))
    * **infinitegrid.d:** fix type definition ([4b94331](https://github.com/naver/egjs-infinitegrid/commit/4b94331d4b89de512a555495bbe3e43fad5c0a7d))
    * **InfiniteGrid:** add export infinite ([c9361cd](https://github.com/naver/egjs-infinitegrid/commit/c9361cdb58110f5430279f79ca6adb8c58b9d850))
    * **InfiniteGrid:** apply PR ([46ff8da](https://github.com/naver/egjs-infinitegrid/commit/46ff8da06f5d49f86d42bfb24c7b329376e71159))
    * **InfiniteGrid:** apply PR ([eb6f257](https://github.com/naver/egjs-infinitegrid/commit/eb6f257677f88e538d75b7853e04d96932e4ecb0))
    * **InfiniteGrid:** apply QA ([481eb20](https://github.com/naver/egjs-infinitegrid/commit/481eb203bb95ad0c88ec798b1754705cb4f09b81))
    * **InfiniteGrid:** apply QA ([fa686ab](https://github.com/naver/egjs-infinitegrid/commit/fa686abe5929a02db231fdb884997db45b5cd065))
    * **InfiniteGrid:** apply useRecycle options ([f3c4c17](https://github.com/naver/egjs-infinitegrid/commit/f3c4c17d2740b47151476329a8840713f0783d05))
    * **InfiniteGrid:** caculate outline after image complete (#92) ([c62e519](https://github.com/naver/egjs-infinitegrid/commit/c62e519e0c43234da44c64b0f6f858e9419f754c))
    * **InfiniteGrid:** change isProcessing ([eef1f50](https://github.com/naver/egjs-infinitegrid/commit/eef1f50ab287be0f06a8b6050563786d91f4ddad))
    * **InfiniteGrid:** change pos ([2dfdf3b](https://github.com/naver/egjs-infinitegrid/commit/2dfdf3be44d3d431ef3177f2c5514f8ef36dfdb0))
    * **InfiniteGrid:** convert from JavaScript to TypeScript Project (#257) ([21ec226](https://github.com/naver/egjs-infinitegrid/commit/21ec226bf40770cd87e8613608d7889137405218))
    * **InfiniteGrid:** fix attached scroll and no request append event (#229) ([e8e1f42](https://github.com/naver/egjs-infinitegrid/commit/e8e1f42614bd027d1971177ee7b075f5a71cfe68)), closes [#227](https://github.com/naver/egjs-infinitegrid/issues/227) [#228](https://github.com/naver/egjs-infinitegrid/issues/228)
    * **InfiniteGrid:** fix change event ([07738c6](https://github.com/naver/egjs-infinitegrid/commit/07738c6425248fedc2374edbc3e6771df23e48b3))
    * **InfiniteGrid:** fix Circular reference for getstatus ([37cbff2](https://github.com/naver/egjs-infinitegrid/commit/37cbff240e28409419dcee3a77a7b3d3d6cedff7))
    * **InfiniteGrid:** fix getCursor, setCursor and append/prepend event parameter (#203) ([99f70db](https://github.com/naver/egjs-infinitegrid/commit/99f70db0c2fd25277150c92e9be562f242dd889d))
    * **InfiniteGrid:** fix getItems bug ([dba0d93](https://github.com/naver/egjs-infinitegrid/commit/dba0d93416da01c1b7d9fc2bde1ab3d0b93fb0e5))
    * **InfiniteGrid:** fix innerWidth with window ([e664574](https://github.com/naver/egjs-infinitegrid/commit/e6645741c8e6e79b17b53beea2257a58eab5633d))
    * **InfiniteGrid:** fix isProcessing to procesingStatus ([84b3f1c](https://github.com/naver/egjs-infinitegrid/commit/84b3f1cf6eee9b580113c66a82c73be02b371ab5))
    * **InfiniteGrid:** fix isProcessing to procesingStatus (#32) ([61b8a5a](https://github.com/naver/egjs-infinitegrid/commit/61b8a5acff34c55bed2cb5a333f7c29568e77bb8))
    * **InfiniteGrid:** fix items' is empty ([a7c7637](https://github.com/naver/egjs-infinitegrid/commit/a7c763750a3f7b9c4fae03072267c0381c67a3ed))
    * **InfiniteGrid:** fix layoutComplete to reset position ([ca4e2b0](https://github.com/naver/egjs-infinitegrid/commit/ca4e2b0c27cf58d21a81e1e01e683aadfd597dab))
    * **InfiniteGrid:** fix moveto and recycle bug ([33b6b1d](https://github.com/naver/egjs-infinitegrid/commit/33b6b1d5325717338dcbeebcc88f5a4f07618a72))
    * **InfiniteGrid:** fix pos ([f917078](https://github.com/naver/egjs-infinitegrid/commit/f9170781a54aa46400a752b31092862569bdf600))
    * **InfiniteGrid:** fix processingStatus in getStatus (#159) ([a8015e6](https://github.com/naver/egjs-infinitegrid/commit/a8015e6247c6133bda469e8244c76154110a5b41)), closes [#156](https://github.com/naver/egjs-infinitegrid/issues/156) [#157](https://github.com/naver/egjs-infinitegrid/issues/157)
    * **InfiniteGrid:** fix recycle structure (#34) ([0df57ea](https://github.com/naver/egjs-infinitegrid/commit/0df57eac80472a33b57b90d9bad36115839d53b4))
    * **InfiniteGrid:** fix recyle structure ([17f220d](https://github.com/naver/egjs-infinitegrid/commit/17f220d656a8d0b1efa49508a31ad392393df3f4))
    * **InfiniteGrid:** fix remove method ([59ddabd](https://github.com/naver/egjs-infinitegrid/commit/59ddabdd1b14e64edc8f633bdc790114d78cecbc))
    * **InfiniteGrid:** fix resize, itemsize, outline bug (#153) ([e354355](https://github.com/naver/egjs-infinitegrid/commit/e3543551b442f58630dd75a0c5a1cb650c7a192f)), closes [#144](https://github.com/naver/egjs-infinitegrid/issues/144) [#151](https://github.com/naver/egjs-infinitegrid/issues/151) [#152](https://github.com/naver/egjs-infinitegrid/issues/152)
    * **InfiniteGrid:** fix scroll error in moveTo method (#125) ([950e906](https://github.com/naver/egjs-infinitegrid/commit/950e9069b501009cb98e98b157d5030634bc4b61))
    * **InfiniteGrid:** fix scroll issue for IOS ([6adf016](https://github.com/naver/egjs-infinitegrid/commit/6adf016fc0452739a45138b2845467bb72228b79))
    * **InfiniteGrid:** fix setStatus for DOM Reverse issue (#226) ([decc540](https://github.com/naver/egjs-infinitegrid/commit/decc5402771b8a5489e256848cccf524397e5f3b)), closes [#225](https://github.com/naver/egjs-infinitegrid/issues/225)
    * **InfiniteGrid:** make Rollup config (#244) ([4cfe585](https://github.com/naver/egjs-infinitegrid/commit/4cfe58538bf06ca36be5c0478c340807cc52349a))
    * **InfiniteGrid:** move item index ([018b4d8](https://github.com/naver/egjs-infinitegrid/commit/018b4d8171e276ac97a5e31dc111c7980947acef))
    * **InfiniteGrid:** pass ImageLoaded if isEqualSize is true (#86) ([96802ac](https://github.com/naver/egjs-infinitegrid/commit/96802ac48ed2aab97bf144742376339756a5bc5a))
    * **InfiniteGrid:** prevent code for prepend after append ([7400662](https://github.com/naver/egjs-infinitegrid/commit/7400662b19cbcd025f621a2fc6224cfa214f3a20))
    * **InfiniteGrid:** prevent prepend when appending ([9e58dc2](https://github.com/naver/egjs-infinitegrid/commit/9e58dc2e823a185acef19cde06d31bc4bed4278e))
    * **InfiniteGrid:** remove outline data for isRelayout ([c9fac32](https://github.com/naver/egjs-infinitegrid/commit/c9fac3214d05df87035316f5644e6712e26b2084))
    * **InfiniteGrid:** remove unnecessary method (#94) ([3d6d78c](https://github.com/naver/egjs-infinitegrid/commit/3d6d78cb47a7e4426ee79e93583fc06e4bdd5c92)), closes [#93](https://github.com/naver/egjs-infinitegrid/issues/93)
    * **infinitegrid:** support IE8 ([79a1854](https://github.com/naver/egjs-infinitegrid/commit/79a1854c74d3a184b5b4a28a92e94854c7c317a8))
    * **InfiniteGrid:** support tree shaking (#215) ([7710242](https://github.com/naver/egjs-infinitegrid/commit/77102426c0d34d39cbc87744a60d621eaf66e95b)), closes [#214](https://github.com/naver/egjs-infinitegrid/issues/214)
    * **InfiniteGrid:** support type definition for Layouts and others. (#124) ([8ac8947](https://github.com/naver/egjs-infinitegrid/commit/8ac894768186f56f4b2c52ee71b7c8e190ed5176))
    * **InfiniteGrid:** the first render does not absolute position. (#235) ([b8e41bf](https://github.com/naver/egjs-infinitegrid/commit/b8e41bf527ce7b3c68e194f88316c6660560fde2)), closes [#234](https://github.com/naver/egjs-infinitegrid/issues/234)
    * **Infinite:** remove startIndex, endIndex, horizontal ([dc9df44](https://github.com/naver/egjs-infinitegrid/commit/dc9df445ce45065480a62e03f7f7f5fddd61b2ed))
    * **Infinite:** treat unknown outline ([69ec34d](https://github.com/naver/egjs-infinitegrid/commit/69ec34d1d680286cef54018ecffc6a96dd113538))
    * **ItemManager:** add IGNORE_CLASSNAME for loadingBar ([d381877](https://github.com/naver/egjs-infinitegrid/commit/d3818779eb0afc985fd22b67869c350d70a566d3))
    * **ItemManager:** disconnect link with renderer ([1204fb6](https://github.com/naver/egjs-infinitegrid/commit/1204fb6987610838c97cbad84c8c843a7f950978))
    * **ItemManager:** fix getStatus ([ef0c356](https://github.com/naver/egjs-infinitegrid/commit/ef0c356e617ad09d2c6c08423c39f3acf40b4239))
    * **ItemManager:** fix that the group without items are not deleted. (#261) ([1b29952](https://github.com/naver/egjs-infinitegrid/commit/1b299529b33c6cccc67cd0dcf90dea54562600e9))
    * **JustifiedLayout:** fix bug for max node ([d914cde](https://github.com/naver/egjs-infinitegrid/commit/d914cdeac63be4824001ac24d786dc9e750d394e))
    * **JustifiedLayout:** fix bug for min node ([1304c15](https://github.com/naver/egjs-infinitegrid/commit/1304c15538b006715e94303c53180a8b11573701))
    * **JustifiedLayout:** fix node bug ([7a2d8e9](https://github.com/naver/egjs-infinitegrid/commit/7a2d8e9f51cf6c70aba1f164e697195e4fc2d64f))
    * **JustifiedLayout:** fix size error ([4b31e50](https://github.com/naver/egjs-infinitegrid/commit/4b31e508766b974b16e5a3b3b99888bedfbde05f)), closes [#164](https://github.com/naver/egjs-infinitegrid/issues/164)
    * **Layout:** add prepending code ([b5638e9](https://github.com/naver/egjs-infinitegrid/commit/b5638e9ca419be29c1ed0344865ce5b4172dac8b))
    * **Layout:** add prepending code ([a82f033](https://github.com/naver/egjs-infinitegrid/commit/a82f033e7bcae0117e98c65e7bac259cf5f0a6b1))
    * **Layout:** fix bug for empty array ([30fd684](https://github.com/naver/egjs-infinitegrid/commit/30fd6849f62c6dee2001459050c99c7f0fb43486))
    * **Layout:** fix bug for empty array ([5e617d8](https://github.com/naver/egjs-infinitegrid/commit/5e617d8a76f788f300a2a975c0e6721bd63e7550))
    * **Layout:** fix bug for empty array ([8f2472d](https://github.com/naver/egjs-infinitegrid/commit/8f2472dc4161e95a8e03d9f9f9627018c1939da3))
    * **Layout:** fix bug for empty array ([e7aa8c3](https://github.com/naver/egjs-infinitegrid/commit/e7aa8c3db5ce31f234c75584e10be56928f48615))
    * **Layout:** fix bug for empty array. ([9b636d2](https://github.com/naver/egjs-infinitegrid/commit/9b636d21e6c93e559f21c40e51252c990da634e8))
    * **Layout:** fix eslint error ([c7f253c](https://github.com/naver/egjs-infinitegrid/commit/c7f253c42b5df205b3eb1cdb677529d412cb54e2))
    * **Layout:** fix README ([260827e](https://github.com/naver/egjs-infinitegrid/commit/260827e37900085257be72d76b1a53452de0b193))
    * **Layout:** fix README ([3fd88da](https://github.com/naver/egjs-infinitegrid/commit/3fd88da136e35eef4365eb647dc87c27a4e0dddc))
    * **Layout:** fix viewport ([f03a971](https://github.com/naver/egjs-infinitegrid/commit/f03a97172ff0e49d2a4050f76faf00ce17bca43a))
    * **Layout:** fix viewport ([0980afc](https://github.com/naver/egjs-infinitegrid/commit/0980afce02122a720902219a8caf4e4c6511db5e))
    * **layoutManager:** fix bug status ([5da786f](https://github.com/naver/egjs-infinitegrid/commit/5da786f0d242ce604071c71a7e99412af3a6b2f1))
    * **layoutManager:** fix getTopItem ([c3764ce](https://github.com/naver/egjs-infinitegrid/commit/c3764ced5c2a5b0ba81453ea235bfff807ed0376))
    * **LayoutManager:** fix resize issue for isEqualSize (#222) ([e33a6d1](https://github.com/naver/egjs-infinitegrid/commit/e33a6d1397d9e11da0e920b0dc9fdfe419ca3ff0)), closes [#221](https://github.com/naver/egjs-infinitegrid/issues/221)
    * **Layout:** move lib file ([3a671ea](https://github.com/naver/egjs-infinitegrid/commit/3a671ea50612730b86741de53133e21f2e87f4dc))
    * **Layout:** move lib file ([c4b8663](https://github.com/naver/egjs-infinitegrid/commit/c4b8663568e26069ddd3913f4d3cd70af3d5be3c))
    * **Layout:** remove prefix underbar and rename viewport to size ([cf82acd](https://github.com/naver/egjs-infinitegrid/commit/cf82acdf74172789ac59acf4eb768280b0dac51e))
    * **Layout:** remove prefix underbar and rename viewport to size ([f35e4af](https://github.com/naver/egjs-infinitegrid/commit/f35e4af1cd30611c20c6f8f79d77c22832c12eb1))
    * **Layout:** support IE11 ([4bc83d9](https://github.com/naver/egjs-infinitegrid/commit/4bc83d9779d7c9654b2706451383e650f8ff2fb3))
    * **PackingLayout:** remove get/set property ([97187aa](https://github.com/naver/egjs-infinitegrid/commit/97187aa2d0c53c513db02b8793f259ab265305cb))
    * **Parallax:** support Parallax type (#268) ([350e1b3](https://github.com/naver/egjs-infinitegrid/commit/350e1b3df54e7efb33538360d04d78b41bde360f)), closes [#267](https://github.com/naver/egjs-infinitegrid/issues/267)
    * **Parallax:** support webkit-transform ([9a03c6a](https://github.com/naver/egjs-infinitegrid/commit/9a03c6a7c97490b1183881982bec5d942cf0639c))
    * **react-layout:** fix children and componentWillUnmoount bug ([72b7990](https://github.com/naver/egjs-infinitegrid/commit/72b79906ce8bfb266db684d165fbaad4ed2a54c8)), closes [#144](https://github.com/naver/egjs-infinitegrid/issues/144)
    * **react-layout:** fix componentWillUnmount error (#139, #140) ([76b1eb2](https://github.com/naver/egjs-infinitegrid/commit/76b1eb204add5a5b088323d691c4041f4c1d2bbc)), closes [#138](https://github.com/naver/egjs-infinitegrid/issues/138)
    * **react-layout:** fix module error and React 16 error (#127) ([ab581f1](https://github.com/naver/egjs-infinitegrid/commit/ab581f1d6ce9eea9a1d4cb7d3cde824ca531d2a0)), closes [#126](https://github.com/naver/egjs-infinitegrid/issues/126)
    * **react-layout:** fix reset method (#178) ([b3fe6e7](https://github.com/naver/egjs-infinitegrid/commit/b3fe6e7ceffc557ce90e3d71ba326838bebd3b61)), closes [#177](https://github.com/naver/egjs-infinitegrid/issues/177)
    * **react-layout:** fix setState bug (#160) ([31221b5](https://github.com/naver/egjs-infinitegrid/commit/31221b55b0f63c2deecc67f685cf1f8492f0607f)), closes [#155](https://github.com/naver/egjs-infinitegrid/issues/155) [#158](https://github.com/naver/egjs-infinitegrid/issues/158)
    * **react:** apply review ([a84059e](https://github.com/naver/egjs-infinitegrid/commit/a84059ee73ff38212cae8637da7ecf68d788f6db))
    * **react:** fix README ([5213a17](https://github.com/naver/egjs-infinitegrid/commit/5213a17f83eee03ed2c9ec3c41339fa2455845bc))
    * **react:** fix shouldComponentUpdate ([3164477](https://github.com/naver/egjs-infinitegrid/commit/3164477f5efe48fdb3b8ef1978e9b868a8e61d9f))
    * read children's groupKey (#320) ([e97ebd0](https://github.com/naver/egjs-infinitegrid/commit/e97ebd06ed82a8b61a5e32bda6a604697d7bd220))
    * **README:** fix README ([d51e8d9](https://github.com/naver/egjs-infinitegrid/commit/d51e8d9388270c63ec62377bf451d91772035aa9))
    * **scripts:** fix auto caculate size script ([a5c7601](https://github.com/naver/egjs-infinitegrid/commit/a5c7601ec007f028b42c7e14e8e1ed25824b9366))
    * **SquareLayout:** apply QA ([5026552](https://github.com/naver/egjs-infinitegrid/commit/5026552b633d3d60977933948401ad09e23e6c38))
    * support event types (#358) ([d8cadad](https://github.com/naver/egjs-infinitegrid/commit/d8cadad7d328aeb4e251cc1a8679550c4b0a7175))
    * **utils:** add defence code ([64b2e47](https://github.com/naver/egjs-infinitegrid/commit/64b2e477497a00b00a6ff0eca94b16e836666cf2))
    * **utils:** fix decimal point error (#176) ([f89debf](https://github.com/naver/egjs-infinitegrid/commit/f89debf95ec2f8d6a626413da9257b929977dde8)), closes [#169](https://github.com/naver/egjs-infinitegrid/issues/169) [#175](https://github.com/naver/egjs-infinitegrid/issues/175)
    * **utils:** fix jQuery type error (#224) ([8e393a0](https://github.com/naver/egjs-infinitegrid/commit/8e393a0e3f89517f00cc39a5d6c467283da01b41))
    * **utils:** support IE8 ([394ed3d](https://github.com/naver/egjs-infinitegrid/commit/394ed3d5e99e377ee5dc922c64f9ba703cc0517d))
    * **Watcher:** add scrollBy method ([3641a31](https://github.com/naver/egjs-infinitegrid/commit/3641a31b99c2fe972514d3cb14120c597873fc64))
    * **Watcher:** fix init order (#231) ([f75590d](https://github.com/naver/egjs-infinitegrid/commit/f75590dff91212612a5009d867fa111898f944ea)), closes [#230](https://github.com/naver/egjs-infinitegrid/issues/230)
    * **Watcher:** fix resize method ([853f54a](https://github.com/naver/egjs-infinitegrid/commit/853f54a2141d2d57ea30511f73f5f270b1c0906c))
    * **Watcher:** fix watcher offset (#194) ([4a1b694](https://github.com/naver/egjs-infinitegrid/commit/4a1b6945eafbf98385a4c68a85d2a84f6b961937)), closes [#193](https://github.com/naver/egjs-infinitegrid/issues/193)
    * **Watcher:** if prevPos is null, occur append event ([dbb0c1b](https://github.com/naver/egjs-infinitegrid/commit/dbb0c1b23f8cf2c46f28e32ffce809c7dcb222dd))
    * **Watcher:** recycle issue ([4f97742](https://github.com/naver/egjs-infinitegrid/commit/4f97742a85fc705acadb9b485a3a3feaf5cb45ed))
    * **Watcher:** remove link with renderer ([af25a69](https://github.com/naver/egjs-infinitegrid/commit/af25a69a6dd48dfe4e0602e984a1a7ee3ecc307e))
    * **Watcher:** when resizing prevPos is weired ([069b7d9](https://github.com/naver/egjs-infinitegrid/commit/069b7d9edcf56bfbecc9623a6e443cc7ce5fbaa3))
    * **Watcher:** workaround for IOS ([0fe6220](https://github.com/naver/egjs-infinitegrid/commit/0fe6220c02b50c143f77fb75904091b409fcc075))


### :memo: Documentation

* `@egjs/vue-infinitegrid`, `@egjs/svelte-infinitegrid`, `@egjs/react-infinitegrid`, `@egjs/ngx-infinitegrid`
    * fix README ([a512be4](https://github.com/naver/egjs-infinitegrid/commit/a512be426af33ed949fa07c3e790a705f90ae655))
* `@egjs/vue3-infinitegrid`, `@egjs/vue-infinitegrid`
    * add vue2/3 readme link (#421) ([dfe547e](https://github.com/naver/egjs-infinitegrid/commit/dfe547e6edf9a0053a938994c4da983fe25aa896))
* `@egjs/vue-infinitegrid`
    * change copyright year ([fa925ec](https://github.com/naver/egjs-infinitegrid/commit/fa925ec47cc178700f03b67a25b8b77a37ba3162))
    * change Vue demo link ([942a12f](https://github.com/naver/egjs-infinitegrid/commit/942a12f60d88a052583272467bb4d69267651853))
    * fix startLoading & endLoading usage ([afc032c](https://github.com/naver/egjs-infinitegrid/commit/afc032c3eb151e5cdd7d3a7eff3456c98124e1ef))
    * typos at vue-infinitegrid README ([233370f](https://github.com/naver/egjs-infinitegrid/commit/233370f0b9b7f5c3d7f8b7b26773a7b4998775a7))
    * update Demo dir link ([24f56ea](https://github.com/naver/egjs-infinitegrid/commit/24f56ea195808afce0a262149ed80f422feccb46))
* `@egjs/react-infinitegrid`
    * fix misnamed function parameter (#378) ([3762702](https://github.com/naver/egjs-infinitegrid/commit/37627027014bffadb3fdbb286c0bbd1e86834b9e))
* `@egjs/infinitegrid`
    * fix README ([18df0ed](https://github.com/naver/egjs-infinitegrid/commit/18df0ed561ef574216b5ce1449c89631858cadb6))
* Other
    * add transition guides (#424) ([4dc9754](https://github.com/naver/egjs-infinitegrid/commit/4dc975492eb2d618bb923a4c308c77b3ac92ab40))
    * Add weekly download badge ([95bb5ff](https://github.com/naver/egjs-infinitegrid/commit/95bb5ffadcb1ba93ef64e671f7f1a9c07c9b3367))
    * **all:** apply jsdoc ([ae1687b](https://github.com/naver/egjs-infinitegrid/commit/ae1687b9ac2fce0eea1b4b7984bbfc4c9aad0cfe))
    * **all:** apply jsdoc, eslint ([143136f](https://github.com/naver/egjs-infinitegrid/commit/143136f568cae533b2cb42aa2985fdf4c7ef6ce1))
    * **all:** correct jsdoc ([7c1f3fc](https://github.com/naver/egjs-infinitegrid/commit/7c1f3fccf620c936c8a805316867c0c8bb5931cd))
    * **all:** correct jsdoc ([6ac906e](https://github.com/naver/egjs-infinitegrid/commit/6ac906e301e677477f61710e578ed897d44bd309))
    * **all:** remove docs ([87d8b02](https://github.com/naver/egjs-infinitegrid/commit/87d8b0236c993e9fbc56c2d29da601153400af06))
    * **all:** update ([3a1d568](https://github.com/naver/egjs-infinitegrid/commit/3a1d568b7545d180efd84f84069c26b2edcafbcc))
    * **all:** update docs ([31bb141](https://github.com/naver/egjs-infinitegrid/commit/31bb1412f6e4dce36efae61e0791da50ac435494))
    * **all:** update reademe, demo start page ([053c3d6](https://github.com/naver/egjs-infinitegrid/commit/053c3d6d1571f85ba809be65fa305b15ce5ca49f))
    * **CONTRIBUTING:** add contriburting file ([639fb44](https://github.com/naver/egjs-infinitegrid/commit/639fb4444e784d16b245cea72db13b71a1a65a35))
    * fix CHANGELOG ([ab9bce1](https://github.com/naver/egjs-infinitegrid/commit/ab9bce1e13255a48913404ff49536b1661c3ca08))
    * fix README ([a82ed3c](https://github.com/naver/egjs-infinitegrid/commit/a82ed3c92038df017df452df30719fdc0b1e0b74))
    * fix README ([61ce7e4](https://github.com/naver/egjs-infinitegrid/commit/61ce7e4e9d322c25aecfe322b78970c7c6411eb5))
    * fix README ([2980ac5](https://github.com/naver/egjs-infinitegrid/commit/2980ac5eb1bfd77f8e1803d4a41cbca891e96b3c))
    * fix README ([fb05678](https://github.com/naver/egjs-infinitegrid/commit/fb056787fa7112904bbed076d1b618c74f3274c9))
    * fix README ([3ae3960](https://github.com/naver/egjs-infinitegrid/commit/3ae3960fb403068c67b2ad976d3a318336a7c253))
    * fix README (#357) ([5f826cf](https://github.com/naver/egjs-infinitegrid/commit/5f826cfcc75e26e986e36f5e54b13b6d2e431b30))
    * **InfiniteGrid:** add docs to interface (#263) ([f669888](https://github.com/naver/egjs-infinitegrid/commit/f669888907852ade6fdb8c9a662d78bb5cec9203))
    * **InfiniteGrid:** correct doc (#61) ([f752a19](https://github.com/naver/egjs-infinitegrid/commit/f752a1957b0edbd9c8442009d77cc1ff2d1c0e54)), closes [#55](https://github.com/naver/egjs-infinitegrid/issues/55)
    * **infiniteGrid:** enhance demo ([a8e1397](https://github.com/naver/egjs-infinitegrid/commit/a8e1397864cac153256efc499a1e1f4dfb3379fb))
    * **Layout:** add Parallax ([790cbc1](https://github.com/naver/egjs-infinitegrid/commit/790cbc13bb44887ebe10d6c4a9d5b57847d4ac80))
    * **Layout:** fix classdesc ([1f17ee4](https://github.com/naver/egjs-infinitegrid/commit/1f17ee43fc0ce6dc84b6b1443ae819d8b9430985))
    * **Layouts:** add jsdoc ([875bc8e](https://github.com/naver/egjs-infinitegrid/commit/875bc8ed42f122857075b06055ccc8a6fada0f4b))
    * **readme.md:** correct link ([b8cac21](https://github.com/naver/egjs-infinitegrid/commit/b8cac21275223536a2574fbafa960871a075c735))
    * **README:** changed a typing error ([bea90bf](https://github.com/naver/egjs-infinitegrid/commit/bea90bf2ae75ae321a4285f6e4d2d1f5da894fb9))
    * **README:** correct link ([62737f4](https://github.com/naver/egjs-infinitegrid/commit/62737f495fed79e210c28e3fbcbb14aa5060f1e7))
    * **readme:** update ([4e80a33](https://github.com/naver/egjs-infinitegrid/commit/4e80a33d006130013f3a3e41576445de43ceea7a))
    * **readme:** update egjs name ([1d9d7e6](https://github.com/naver/egjs-infinitegrid/commit/1d9d7e6b9c8b87cb82575d866e0ffb0ef70b56e9))
    * **README:** update img link ([bd9a248](https://github.com/naver/egjs-infinitegrid/commit/bd9a2488c93d5d3256317f8a5e32d5617c0c6276))
    * **README:** update layout link ([7d5c3cb](https://github.com/naver/egjs-infinitegrid/commit/7d5c3cb5efd389164bed53049159b166f9c0c6ee))
    * some minor Typos  (#397) ([3b2bc39](https://github.com/naver/egjs-infinitegrid/commit/3b2bc392f6c0aeccfbff7c812c593824b37c7246))
    * update docs ([c7ef7ea](https://github.com/naver/egjs-infinitegrid/commit/c7ef7ea23a1d0f8e3d1d7cc00a7b0814887b54e8))


### :sparkles: Styling

* `@egjs/vue-infinitegrid`
    * add missing editorconfig ([fa8c2fc](https://github.com/naver/egjs-infinitegrid/commit/fa8c2fccf4dd56408982b8a4872ed437b7e1179f))
* Other
    * **InfiniteGrid:** fix variable name vertical to horizontal ([3ac31d1](https://github.com/naver/egjs-infinitegrid/commit/3ac31d1f1067792068570e441e3a82fbca6ae139))
    * **Layout:** remove useless variable ([f477a04](https://github.com/naver/egjs-infinitegrid/commit/f477a04dea9bf65dc261b0ce086b9be127b379b7))
    * **Layout:** remove useless variable ([5b39ea3](https://github.com/naver/egjs-infinitegrid/commit/5b39ea3af80d5f6fac3fd04078a81830d2656f37))
    * **Layout:** remove useless variable ([9ab53a5](https://github.com/naver/egjs-infinitegrid/commit/9ab53a5d7d6cc7bccf8f571ef5c13c3e8e95031c))
    * **Layout:** remove useless variable ([13deaa3](https://github.com/naver/egjs-infinitegrid/commit/13deaa35139b72edc52e541ef7319ccf9742cdc4))


### :house: Code Refactoring

* `@egjs/react-infinitegrid`, `@egjs/ngx-infinitegrid`, `@egjs/infinitegrid`
    * apply lerna ([d7f20f1](https://github.com/naver/egjs-infinitegrid/commit/d7f20f19c83bc26309b27095351e17227d9abad6))
* Other
    * **all:** complete refactoring ([e20aec9](https://github.com/naver/egjs-infinitegrid/commit/e20aec967dcd9c43e50fb47707c91feb0a91d804))
    * **all:** fix env && remove infinite ([e421314](https://github.com/naver/egjs-infinitegrid/commit/e4213146593df73c7df7f497034048a7493723b5))
    * **all:** refactoring infiniteGrid ([4697c14](https://github.com/naver/egjs-infinitegrid/commit/4697c147d75f110c8163ada5cca58069e2e2bff4))
    * **all:** refactoring WIP ([1dbca34](https://github.com/naver/egjs-infinitegrid/commit/1dbca343d91ffbdc40f0ef3c6a7c0f6d3d3e1d79))
    * **all:** refactoring WIP ([6de6fc9](https://github.com/naver/egjs-infinitegrid/commit/6de6fc917a21e819ae41749c396087267eab0d4a))
    * Apply infinitegrid to the framework (#295) ([1ffcc43](https://github.com/naver/egjs-infinitegrid/commit/1ffcc4379eeb87d297702b1839f23416c9d1ca8d))
    * **infinite:** refactor modules (WIP) ([ff28a0e](https://github.com/naver/egjs-infinitegrid/commit/ff28a0e95a691044a74a3b9730099afb49d589e0))
    * **Layout:** fixed size ([6821e2c](https://github.com/naver/egjs-infinitegrid/commit/6821e2cc63442220dcd99bcc5169eff61b26e943))


### :mega: Other

* All
    * Release 4.3.0 ([d18031e](https://github.com/naver/egjs-infinitegrid/commit/d18031ee3e9bf7f012e7bf1b0157572ba78f70b0))
    * Release 4.3.1 ([165e354](https://github.com/naver/egjs-infinitegrid/commit/165e354bb6382cba61e0670ab16096193fdf2a2b))
    * Release 4.4.0 ([2b066a8](https://github.com/naver/egjs-infinitegrid/commit/2b066a83470719fc78940317fe0ab44fa21fc378))
    * Release 4.5.0 ([23e0885](https://github.com/naver/egjs-infinitegrid/commit/23e0885c2ae29130b34613227291ee6f0b102c75))
    * Release 4.6.0 ([d529854](https://github.com/naver/egjs-infinitegrid/commit/d529854917ef31afbbb138dec8af98ef8c3c1d47))
    * Release 4.7.0 ([9a1c5a0](https://github.com/naver/egjs-infinitegrid/commit/9a1c5a0985381a632c00cae94481cb1a50425aa0))
    * update packages versions ([212d1bc](https://github.com/naver/egjs-infinitegrid/commit/212d1bcf22c60fde09989f373d61738a195d9902))
    * update packages versions ([e438c00](https://github.com/naver/egjs-infinitegrid/commit/e438c00929ba28bd001d6174bd57efd918144686))
    * update packages versions ([d4aa615](https://github.com/naver/egjs-infinitegrid/commit/d4aa615a8cd3e25b621500e2a7b243dcc9696eef))
    * update packages versions ([171bb74](https://github.com/naver/egjs-infinitegrid/commit/171bb74f708110a2fd986276c9b8d65472fa64ab))
    * update packages versions ([29bdea0](https://github.com/naver/egjs-infinitegrid/commit/29bdea08f334113e4a73180dd5f9e803c4befc99))
* `@egjs/vue3-infinitegrid`, `@egjs/vue-infinitegrid`, `@egjs/svelte-infinitegrid`, `@egjs/react-infinitegrid`, `@egjs/ngx-infinitegrid`
    * release 4.2.0-rc ([110b5d4](https://github.com/naver/egjs-infinitegrid/commit/110b5d4ae845d7812da1cf5727366c22840ed82a))
    * **release:** Release 4.0.0 ([7b77f77](https://github.com/naver/egjs-infinitegrid/commit/7b77f77e3e0444fc1162458133db1303c6531903))
    * **release:** Release 4.1.0 ([57dc167](https://github.com/naver/egjs-infinitegrid/commit/57dc167b7a1e6fc60a39d8fa990c28294ef4722b))
    * **release:** Release 4.1.1 ([ad36273](https://github.com/naver/egjs-infinitegrid/commit/ad3627396d64c421100d9623c3bfaf6a3c1bc40d))
    * **release:** Release 4.2.1 ([414faa6](https://github.com/naver/egjs-infinitegrid/commit/414faa683fe5e60d746d99ba1944b086ff4b23e4))
    * update packages versions ([47f9348](https://github.com/naver/egjs-infinitegrid/commit/47f9348042e19c789b986ec936ed042a3838afc8))
    * update packages versions ([bc07e37](https://github.com/naver/egjs-infinitegrid/commit/bc07e37a5fb40e94f87cd1b07f1f7a843ddbe7e8))
* `@egjs/vue-infinitegrid`, `@egjs/svelte-infinitegrid`, `@egjs/react-infinitegrid`, `@egjs/ngx-infinitegrid`
    * **release:** Release 3.6.2 ([7e0201b](https://github.com/naver/egjs-infinitegrid/commit/7e0201ba39ec4989ca02b81d84594ae1967c5488))
    * **release:** Release 3.6.3 ([91d264c](https://github.com/naver/egjs-infinitegrid/commit/91d264c22142828ea9c26d19cb747c42c65773d7))
    * **release:** Release 3.7.0 ([83982dd](https://github.com/naver/egjs-infinitegrid/commit/83982dd04cf2a52c0d165925de0a3ec14d4acb0a))
    * **release:** Release 3.7.1 ([e89e4a3](https://github.com/naver/egjs-infinitegrid/commit/e89e4a386a577dc2deffb822a56b6fdfb9808525))
    * **release:** Release 3.8.0 ([0318d41](https://github.com/naver/egjs-infinitegrid/commit/0318d416acb63611890dc752815386af7497ca19))
    * **release:** Release 3.8.1 ([578263b](https://github.com/naver/egjs-infinitegrid/commit/578263bd36356f1e976dbf78d8eab423cf84a4ef))
    * **release:** Release 3.8.2 ([bc043cc](https://github.com/naver/egjs-infinitegrid/commit/bc043ccd840bdbd28907d6c5592bc86cf3722c95))
    * **release:** Release 3.8.3 ([dbb97ee](https://github.com/naver/egjs-infinitegrid/commit/dbb97ee7e368ee0a3bf512e20c3cd7f2c33b2e7a))
    * **release:** Release 3.8.4 ([67f5300](https://github.com/naver/egjs-infinitegrid/commit/67f53003f0faa58039fd560682097f6ecf4534c1))
    * **release:** Release 3.9.0 ([9d2dca7](https://github.com/naver/egjs-infinitegrid/commit/9d2dca76591a7b033108641783418e2dc183edf3))
    * update @egjs/infinitegrid to frameworks ([cc2458d](https://github.com/naver/egjs-infinitegrid/commit/cc2458dc59229865041c22d0c40068813779d132))
* `@egjs/vue3-infinitegrid`, `@egjs/vue-infinitegrid`, `@egjs/svelte-infinitegrid`, `@egjs/react-infinitegrid`
    * update package.json ([c9d1faa](https://github.com/naver/egjs-infinitegrid/commit/c9d1faa896d84672771caccb086f0002bd282370))
* `@egjs/infinitegrid`
    * move demo files ([eeb8bf1](https://github.com/naver/egjs-infinitegrid/commit/eeb8bf173e2055207a2b0e590838919a0f198dfa))
    * move test files ([6974101](https://github.com/naver/egjs-infinitegrid/commit/69741011c0b9fcf11eb22ef574523468d3cbca3f))
* `@egjs/react-infinitegrid`
    * **react-infinitegrid:** update infinitegrid version ([c9357b2](https://github.com/naver/egjs-infinitegrid/commit/c9357b256fc9945846a163cac53bee3d447dc548))
    * remove browser field (#486) ([14b063c](https://github.com/naver/egjs-infinitegrid/commit/14b063cc220eb71fb946614f2c82207d19a682ab))
* `@egjs/vue-infinitegrid`
    * update version ([73d3940](https://github.com/naver/egjs-infinitegrid/commit/73d3940de5500aff74416c6c03e042288782b780))
* Other
    * **.github:** add templates ([292ca20](https://github.com/naver/egjs-infinitegrid/commit/292ca20edd6c6529183bde3f3aa4b2e96da420b7))
    * **.npmignore:** add ignored files ([07fd7ae](https://github.com/naver/egjs-infinitegrid/commit/07fd7ae5360f66f31e0658cec10e2d9cb6f8881d))
    * **all:** apply lint ([4255309](https://github.com/naver/egjs-infinitegrid/commit/425530917f5fb05b4686b417b5ce3d2fe9f5e5f5))
    * **all:** change dist ([83ee6e1](https://github.com/naver/egjs-infinitegrid/commit/83ee6e1a136cb933f4eef650e66b6b37bb4fb16e))
    * **all:** change dist ([b763173](https://github.com/naver/egjs-infinitegrid/commit/b763173b597a185658003e7403eed72e9ea98e3b))
    * **all:** change dist ([9c18b97](https://github.com/naver/egjs-infinitegrid/commit/9c18b9768f0d6174cf7872c4b02826ab2aa4d605))
    * **all:** change dist ([995012d](https://github.com/naver/egjs-infinitegrid/commit/995012d642bb8bb442daaf869941f6d0e01d4293))
    * **all:** change dist ([991c9b3](https://github.com/naver/egjs-infinitegrid/commit/991c9b372079bf9b252637e60789951839e5757f))
    * **all:** change dist for qa ([50e0136](https://github.com/naver/egjs-infinitegrid/commit/50e01366bead4351522537b4a60f99d3fb83b972))
    * **all:** change dist for QA ([7050520](https://github.com/naver/egjs-infinitegrid/commit/7050520452dbddc111def41cfcd2557689b7cf33))
    * **all:** change dsit ([4ceb107](https://github.com/naver/egjs-infinitegrid/commit/4ceb107ce90e0cd1ebf161d777d1b76150be9495))
    * **all:** fix host ([b769596](https://github.com/naver/egjs-infinitegrid/commit/b7695963c11aa24ad90c4bcb321ee2c7904474f3))
    * **all:** fix package main ([3e5ed92](https://github.com/naver/egjs-infinitegrid/commit/3e5ed92afc627f46df8cd0e7b30df30ef86043c4))
    * **all:** ready for release ([8ef89be](https://github.com/naver/egjs-infinitegrid/commit/8ef89bea009d0e7783d94d4bf30441b32b97a02a))
    * **all:** ready for release ([8b91057](https://github.com/naver/egjs-infinitegrid/commit/8b910570a53fb65999375a9d43e38a5803812e27))
    * **all:** ready to 2.0.0 ([cfe3c93](https://github.com/naver/egjs-infinitegrid/commit/cfe3c9358e4b9272e0a8ae8d028313e4f1bdf9ea))
    * **all:** release 2.0.0 ([ee567c2](https://github.com/naver/egjs-infinitegrid/commit/ee567c24c6c9104d128c9d1bd01b526649582aec))
    * **all:** remove blank ([67aa4a1](https://github.com/naver/egjs-infinitegrid/commit/67aa4a1e479a9ba61911d3b5f0fc4f3912328db0))
    * **all:** remove dist ([95bb127](https://github.com/naver/egjs-infinitegrid/commit/95bb127522523841563f4507df7212a68d4ebdb8))
    * **all:** remove dist ([8ca3569](https://github.com/naver/egjs-infinitegrid/commit/8ca3569ccdb2647c44f9d4fb15b86ee96e8b58bf))
    * **all:** remove extends ([1ac270c](https://github.com/naver/egjs-infinitegrid/commit/1ac270c693e12cf9c466c9d43f005ee0d9c30f1f))
    * **all:** update document ([1ffbc88](https://github.com/naver/egjs-infinitegrid/commit/1ffbc88890fe1375d3720056f8b20be875d49c50))
    * **all:** update sync ([85068e4](https://github.com/naver/egjs-infinitegrid/commit/85068e42e338a274275c241cf4841853e5353523))
    * **all:** upgrade jsdoc template ([8505880](https://github.com/naver/egjs-infinitegrid/commit/85058805fd3f3c8a92dba80f7fee54a4d68e1e37))
    * apply lint ([e9e6f2e](https://github.com/naver/egjs-infinitegrid/commit/e9e6f2e5a6341220a6607eb10b047b5988f254a3))
    * **Conflicting:** merged ([b027e0f](https://github.com/naver/egjs-infinitegrid/commit/b027e0f4ed07c86071c538767454fd7da0da9cde))
    * **demos:** update demos ([5a17bf4](https://github.com/naver/egjs-infinitegrid/commit/5a17bf46249658595946078283ea70a9af58da82))
    * **demo:** update demo ([146b7ef](https://github.com/naver/egjs-infinitegrid/commit/146b7efcc7b61afd6df1a7b420c9ca300e8aff30))
    * **dist:** add dist ([3e8b370](https://github.com/naver/egjs-infinitegrid/commit/3e8b370b3da41c70c331de0b7361e2bc6e34ef16))
    * **dist:** update dist files ([3143252](https://github.com/naver/egjs-infinitegrid/commit/3143252ef5457fdead9ccf022c3ab70c38e41207))
    * **env:** add release, changelog task, update dependency (#35) ([ae71b6b](https://github.com/naver/egjs-infinitegrid/commit/ae71b6b8ed99fcb381312388aaaecc924ca76ef7)), closes [#34](https://github.com/naver/egjs-infinitegrid/issues/34)
    * **env:** change snapshot version ([fb7c643](https://github.com/naver/egjs-infinitegrid/commit/fb7c643e3981d9e6afdd13d839b4547016efb977))
    * **env:** remove unecessary files ([8356834](https://github.com/naver/egjs-infinitegrid/commit/8356834dce9a6a58b05dacc99a0a64f37d90f359))
    * **env:** remove unnecessary files ([6c7f1b2](https://github.com/naver/egjs-infinitegrid/commit/6c7f1b2ee344096d57be107c55156d1b8602c719))
    * **env:** update ([e757a35](https://github.com/naver/egjs-infinitegrid/commit/e757a35fe5428e58ff05e8427e654772eb2fa988))
    * **eventHandelr:** correct lint ([4acc0c6](https://github.com/naver/egjs-infinitegrid/commit/4acc0c6ac996a63491509291cef7880042c05ac9))
    * **ga:** update GA ([efdac89](https://github.com/naver/egjs-infinitegrid/commit/efdac89e091e7e62c249f2526476c28805bd5fd1))
    * **infinitegrid.d.ts:** add typedefination (#28) ([f97d7ca](https://github.com/naver/egjs-infinitegrid/commit/f97d7ca98eb5bba1adfd8d0714871a58e78e4b6b)), closes [#23](https://github.com/naver/egjs-infinitegrid/issues/23)
    * **Layout:** add common constant ALIGN ([ead55e6](https://github.com/naver/egjs-infinitegrid/commit/ead55e6a575bc373ce791b215f605b6d5394276c))
    * **Layout:** add prefix underbar  to private variable ([96697b6](https://github.com/naver/egjs-infinitegrid/commit/96697b6a48e8f28154e7bf46a38cb2d745ae0c1b))
    * **Layout:** add private variable, add common constants ([813fa05](https://github.com/naver/egjs-infinitegrid/commit/813fa053c33c18e15262a1451d039905a9d7caff))
    * **Layout:** add private variable, add common constants ([f99c7e0](https://github.com/naver/egjs-infinitegrid/commit/f99c7e04cb323ad42698bf402d4391526df5607b))
    * **Layout:** add test file ([df64a62](https://github.com/naver/egjs-infinitegrid/commit/df64a6287ff2710aa459062ff5e88de4ed4765ac))
    * **Layout:** fix comments ([68896be](https://github.com/naver/egjs-infinitegrid/commit/68896bef68e2ff9bcb6f114a2035d571479c0a88))
    * **Layout:** fix es6 code for QA ([4dbe7b0](https://github.com/naver/egjs-infinitegrid/commit/4dbe7b06b2532fb3e92293f6f11b6beb21b2f0f7))
    * **Layout:** fixed JustifiedLayout for group ([35b402a](https://github.com/naver/egjs-infinitegrid/commit/35b402ac63fcc14a095136354f390300de58a123))
    * **Layout:** fixed JustifiedLayout for group ([e590ea1](https://github.com/naver/egjs-infinitegrid/commit/e590ea14cb57b93794cca00680f93ee75b9e9229))
    * **Layout:** fixed JustifiedLayout for group (#47) ([959b0dc](https://github.com/naver/egjs-infinitegrid/commit/959b0dc89017116206a8ae7b16e8504f26a431af))
    * **Layout:** fixed name GoogleLayout to JustifiedLayout ([8e7a562](https://github.com/naver/egjs-infinitegrid/commit/8e7a5623ba0c96e7439ab0b2a8e27ad8d88c0b63))
    * **Layout:** fixed name GoogleLayout to JustifiedLayout ([0474b02](https://github.com/naver/egjs-infinitegrid/commit/0474b0273ec049846974c9ef17edfddb3ba38d59))
    * **Layout:** merge ([2014e05](https://github.com/naver/egjs-infinitegrid/commit/2014e05f2070640f554ac3275a3b6c1011dcb0f7))
    * **Layout:** merged ([9c1673d](https://github.com/naver/egjs-infinitegrid/commit/9c1673d9529011abd63668fe0fe40d16ea2a3429))
    * **Layout:** move dijkstra file ([9fc16fd](https://github.com/naver/egjs-infinitegrid/commit/9fc16fd6cb9251d9ecf010d7a31c83a15e33296e))
    * **Layout:** move dijkstra file ([0257ac0](https://github.com/naver/egjs-infinitegrid/commit/0257ac01220ec50a30b7a1adfdf6b98350476238))
    * **Layout:** move dijkstra file ([5f237de](https://github.com/naver/egjs-infinitegrid/commit/5f237de71c3853fac342b34554bf3038fbda2206))
    * **Layout:** move folder lib ([f867bd5](https://github.com/naver/egjs-infinitegrid/commit/f867bd53fcb16f74a14d862be601bdbbc1f56d55))
    * **Layout:** move Render file to lib ([4decb9a](https://github.com/naver/egjs-infinitegrid/commit/4decb9af8539e842876dcf5cbcb71fbf231caa53))
    * **Layout:** remove .git ([132aad2](https://github.com/naver/egjs-infinitegrid/commit/132aad2581161b7eaa50d309fae06239842c3ca0))
    * **Layout:** remove useless style ([7195d32](https://github.com/naver/egjs-infinitegrid/commit/7195d327e4346610a598fb55adb3746c0ad60cad))
    * **Layout:** remove useless style ([7cb9064](https://github.com/naver/egjs-infinitegrid/commit/7cb9064d3ded8ec0a05014999b66d5a18ee9e4e0))
    * **Layout:** test ([047258e](https://github.com/naver/egjs-infinitegrid/commit/047258eb03e36b4c9d3e12347c937581c609c9d0))
    * **Layout:** test ([9bf7b22](https://github.com/naver/egjs-infinitegrid/commit/9bf7b222995bd68ccfafa026c2a1387a21757a9e))
    * merge 3.6.1-rc ([9e55f22](https://github.com/naver/egjs-infinitegrid/commit/9e55f22dd29368439e416c5bf379a1ded960059a))
    * merge 3.6.2-rc ([cac9139](https://github.com/naver/egjs-infinitegrid/commit/cac91398bc117cfd8651dbb5af89e753436cebb0))
    * merge 3.7.0-rc ([ccabeb5](https://github.com/naver/egjs-infinitegrid/commit/ccabeb50659ef88313dd65ee9ea31f23e4daf487))
    * merge 3.7.1-rc ([dba56e4](https://github.com/naver/egjs-infinitegrid/commit/dba56e4a373840c361d32b05b299495057eb20b0))
    * merge 3.8.0-rc ([edaab25](https://github.com/naver/egjs-infinitegrid/commit/edaab258fdc505d0336df5ca3d5317369d2aa08f))
    * merge 3.8.1-rc ([9d4bbb5](https://github.com/naver/egjs-infinitegrid/commit/9d4bbb593c41bb00f6eb79c4da219f4e60dc839a))
    * merge 3.8.2-rc ([077ce14](https://github.com/naver/egjs-infinitegrid/commit/077ce14428e8d0215b4a49436868918f23710758))
    * merge 3.8.4-rc ([081e934](https://github.com/naver/egjs-infinitegrid/commit/081e93419f58c9e5cd105f34d884ed8122ffdffe))
    * merge 3.9.0-rc ([1196219](https://github.com/naver/egjs-infinitegrid/commit/1196219c885bd36c2a544af2a3e0a30786630332))
    * merge 4.0.0-rc ([96340d6](https://github.com/naver/egjs-infinitegrid/commit/96340d6bab380be3cbf7a3bbc3eceac31007557b))
    * merge 4.1.0-rc ([333cce1](https://github.com/naver/egjs-infinitegrid/commit/333cce14990548b399fcd65b76de5c0354bd90b9))
    * merge 4.1.1-rc ([f6912fe](https://github.com/naver/egjs-infinitegrid/commit/f6912fe5d40d4a228b4beb1b345e07ac93d88482))
    * merge 4.2.0-rc ([c86aed4](https://github.com/naver/egjs-infinitegrid/commit/c86aed4c326230c6f10c30d37bc3d13cb4f348ae))
    * merge 4.2.1-rc ([ed554a3](https://github.com/naver/egjs-infinitegrid/commit/ed554a31dc5adc4af8f08cf6eb8afb115eed6255))
    * **package.json:** update dependency ([6b49694](https://github.com/naver/egjs-infinitegrid/commit/6b49694e720627441ca28c57e6061fd7016d453c))
    * **package:** add module,es2015 property ([8a3ca1c](https://github.com/naver/egjs-infinitegrid/commit/8a3ca1c33d0692253a2805ae06763afa44e6a39f))
    * **package:** fix 3.3.0-snapshot version ([8a9fb90](https://github.com/naver/egjs-infinitegrid/commit/8a9fb906fe9c40330dc52375c182ee9b7e2bd5aa))
    * **package:** ready to merge ([b05b534](https://github.com/naver/egjs-infinitegrid/commit/b05b534f5596a128b9e624612db48f1a771a3b2e))
    * **package:** support es6 module ([aba5b66](https://github.com/naver/egjs-infinitegrid/commit/aba5b662b64a43d74d12fbc1b430e23f4e283e37)), closes [#95](https://github.com/naver/egjs-infinitegrid/issues/95)
    * **package:** update ([6ebe8ef](https://github.com/naver/egjs-infinitegrid/commit/6ebe8ef3a639c28a792f595efeb3bae6049cd4f3))
    * **react:** update InfiniteGrid version (#107) ([14e2a23](https://github.com/naver/egjs-infinitegrid/commit/14e2a238c3f61edb9625b23a0f10af58208520ba))
    * **README:** update reademe ([93216bf](https://github.com/naver/egjs-infinitegrid/commit/93216bf82a2e98049543c60980cbd7049142a629))
    * release 3.6.3-rc ([2d6c7d2](https://github.com/naver/egjs-infinitegrid/commit/2d6c7d20d1d7f789a7fb4f189bfa6d9698c7cb39))
    * **release:** merge 2.1.0-rc ([a7296b3](https://github.com/naver/egjs-infinitegrid/commit/a7296b3c4878a39bb2e592770e0c0e88900f131b))
    * **release:** merge 2.1.1.-rc ([4d3c86c](https://github.com/naver/egjs-infinitegrid/commit/4d3c86c957a19122be7b4082a0c26bf1cdd223c2))
    * **release:** merge 3.0.0-rc ([626068b](https://github.com/naver/egjs-infinitegrid/commit/626068b1e782d2809734f96039b253cfd56e0bb7))
    * **release:** merge 3.1.0-rc ([a7c159f](https://github.com/naver/egjs-infinitegrid/commit/a7c159ff57da20fad2b856169e90112ac9f1739f))
    * **release:** merge 3.1.2-rc ([8c7d5e4](https://github.com/naver/egjs-infinitegrid/commit/8c7d5e42630c59e57c83c8746b1ef7968f41a549))
    * **release:** merge 3.1.4-rc ([bfe4566](https://github.com/naver/egjs-infinitegrid/commit/bfe4566cdf34c29ac5dd9fde5432a2fd85bc1bde))
    * **release:** merge 3.2.1-rc ([7c7b6f0](https://github.com/naver/egjs-infinitegrid/commit/7c7b6f021ab84fbba62f8d20e45ca76375064cf4))
    * **release:** merge 3.2.1-rc ([6d9855c](https://github.com/naver/egjs-infinitegrid/commit/6d9855cb724fee32fb1b300a08be3989c9b9f2cf))
    * **release:** merge 3.2.2-rc ([5ed1b2c](https://github.com/naver/egjs-infinitegrid/commit/5ed1b2cc5d5e7518b2157b3969fb49cdcd29cbc0))
    * **release:** merge 3.2.3-rc ([ca1fe3e](https://github.com/naver/egjs-infinitegrid/commit/ca1fe3ebf294f5228cf9de517dff4508f36a072e))
    * **release:** merge 3.2.4-rc ([f311e9d](https://github.com/naver/egjs-infinitegrid/commit/f311e9dc666b13f48213e374097efdbc3b5e2965))
    * **release:** merge 3.3.0-rc ([8e4cd39](https://github.com/naver/egjs-infinitegrid/commit/8e4cd39fda2d7802fa156f615eef2406919bf0ba))
    * **release:** merge 3.3.1-rc ([386493a](https://github.com/naver/egjs-infinitegrid/commit/386493ab7a3db33e66290773475c22056338598b))
    * **release:** merge 3.3.2-rc ([c51fcef](https://github.com/naver/egjs-infinitegrid/commit/c51fceffc3c10992b5f110061d55410ed05f4777))
    * **release:** merge 3.3.3-rc ([e3e7300](https://github.com/naver/egjs-infinitegrid/commit/e3e7300692c02b36dcb3a851e815db0c60aaac18))
    * **release:** merge 3.3.4-rc ([6c895e1](https://github.com/naver/egjs-infinitegrid/commit/6c895e1a2b86ead0c3eed6a60e31ac0549251ded))
    * **release:** merge 3.3.5-rc ([08c25ce](https://github.com/naver/egjs-infinitegrid/commit/08c25ceaa6615edf2e6a4ce75fe307ecd78cc0aa))
    * **release:** merge 3.3.6-rc ([766f576](https://github.com/naver/egjs-infinitegrid/commit/766f576ea94cf5ef4cb1d45511784a616872fff9))
    * **release:** merge 3.4.0-rc ([534cf11](https://github.com/naver/egjs-infinitegrid/commit/534cf113593e033be1f4565706ade6c842cdb186))
    * **release:** merge 3.4.1-rc ([d70222b](https://github.com/naver/egjs-infinitegrid/commit/d70222baa0c630d2590a46657ecf271827e8528f))
    * **release:** merge 3.4.2-rc ([e32d8c8](https://github.com/naver/egjs-infinitegrid/commit/e32d8c8b4c320e107cc591d995eeaa5510d6747c))
    * **release:** merge 3.4.3-rc ([62202f6](https://github.com/naver/egjs-infinitegrid/commit/62202f6e02c37643a3f3cf9051b547b27ed4237a))
    * **release:** merge 3.4.4-rc ([514ce55](https://github.com/naver/egjs-infinitegrid/commit/514ce55c8fc12ee70e5cc7884cff3ffc54a43fde))
    * **release:** merge 3.4.5-rc ([ae10b20](https://github.com/naver/egjs-infinitegrid/commit/ae10b200f549d6a0fb3163ee67e72cac2c3408be))
    * **release:** merge 3.4.6-rc ([f9e2bac](https://github.com/naver/egjs-infinitegrid/commit/f9e2bac29fb96c11841c6eecce993fcb8859648f))
    * **release:** merge 3.4.7-rc ([ae6da27](https://github.com/naver/egjs-infinitegrid/commit/ae6da271214cd71f8d48b9a4345a7433e2b6d1ea))
    * **release:** merge 3.5.1-rc ([79d374e](https://github.com/naver/egjs-infinitegrid/commit/79d374e371cff61570d0903c939efea4bef1b430))
    * **release:** merge 3.5.2-rc ([2478f9a](https://github.com/naver/egjs-infinitegrid/commit/2478f9a73bd30c4f88bada0cdf21e8295a0025db))
    * **release:** merge 3.5.3-rc ([7c87fbf](https://github.com/naver/egjs-infinitegrid/commit/7c87fbf33af334217d02c30fdd2d83485d0524e4))
    * **release:** merge 3.5.5-rc ([57bf700](https://github.com/naver/egjs-infinitegrid/commit/57bf70040aa73c35033387fca864384020e3dd67))
    * **release:** ready to qa ([6379edd](https://github.com/naver/egjs-infinitegrid/commit/6379edd6ed43b976d8f656958297b4d558b0408f))
    * **release:** ready to qa ([2d9b93c](https://github.com/naver/egjs-infinitegrid/commit/2d9b93c8b9aa8d54b2def28f595de48c2f91adf6))
    * **release:** ready to qa ([dfde170](https://github.com/naver/egjs-infinitegrid/commit/dfde170de399e7747a950a9fcf9eb5a5c777677b))
    * **release:** ready to qa ([655d319](https://github.com/naver/egjs-infinitegrid/commit/655d3194af3713075c984c18ce6491baa5229492))
    * **release:** ready to qa ([766c6a9](https://github.com/naver/egjs-infinitegrid/commit/766c6a965631e3490ec794b08512fbccd5ef9479))
    * **release:** ready to qa ([4e67d58](https://github.com/naver/egjs-infinitegrid/commit/4e67d584d267196adfa1332e4b06c12a1c28cfc9))
    * **release:** ready to qa ([6c69851](https://github.com/naver/egjs-infinitegrid/commit/6c698517cd2557f5b93821587b9398d62e839fd8))
    * **release:** ready to qa ([e1d001c](https://github.com/naver/egjs-infinitegrid/commit/e1d001cd439f4848885d9a32ce15bd693a92e2fe))
    * **release:** ready to qa ([80b7e3b](https://github.com/naver/egjs-infinitegrid/commit/80b7e3b2a36a46123426124ebf90cb29a320d8e8))
    * **release:** ready to qa ([5f561b1](https://github.com/naver/egjs-infinitegrid/commit/5f561b176e982aea87c81796e2ac3ca40cad3fad))
    * **release:** ready to qa ([336aa6c](https://github.com/naver/egjs-infinitegrid/commit/336aa6cda3380479216f90c06753fa5fb1f38ab6))
    * **release:** ready to qa ([22c0578](https://github.com/naver/egjs-infinitegrid/commit/22c0578a283bec2e21502904288e3a75096c2424))
    * **release:** Release 2.1.0 ([65836a3](https://github.com/naver/egjs-infinitegrid/commit/65836a3edec343548fe9d6325d998671c73274c8))
    * **release:** Release 2.1.1 ([4e713e2](https://github.com/naver/egjs-infinitegrid/commit/4e713e2529ee856148f4f0ef571091d4e6d826ac))
    * **release:** Release 3.0.0 ([dc1d307](https://github.com/naver/egjs-infinitegrid/commit/dc1d30764a7f78e94ae86ff6775694b9059e099a))
    * **release:** Release 3.1.0 ([82a66c2](https://github.com/naver/egjs-infinitegrid/commit/82a66c2121c70499f8c06df6568b8c59e954e5f3))
    * **release:** Release 3.1.2 ([ed5cc82](https://github.com/naver/egjs-infinitegrid/commit/ed5cc82d33b1a8d4509ad51b63f8e0059624a54f))
    * **release:** Release 3.1.3 ([db94c68](https://github.com/naver/egjs-infinitegrid/commit/db94c68105b3710ad2ad5419a6859f64835ce2a7))
    * **release:** Release 3.1.4 ([96d1329](https://github.com/naver/egjs-infinitegrid/commit/96d13290458552f98950b0430a3695df4726c750))
    * **release:** Release 3.2.0 ([c69590d](https://github.com/naver/egjs-infinitegrid/commit/c69590d57b4e3ffa7cb8a0c2dc64b4bd04fbe351))
    * **release:** Release 3.2.1 ([79d6df4](https://github.com/naver/egjs-infinitegrid/commit/79d6df4391e95019d7dbb68dde5fac6c775b98f6))
    * **release:** Release 3.2.2 ([7e328ef](https://github.com/naver/egjs-infinitegrid/commit/7e328ef4efb90c8d969a8dde29e4af690cbb9810))
    * **release:** Release 3.2.3 ([044c1dc](https://github.com/naver/egjs-infinitegrid/commit/044c1dcc81a75e0a90765d3a2001207f8c02867a))
    * **release:** Release 3.2.4 ([3add598](https://github.com/naver/egjs-infinitegrid/commit/3add59882f0c28bebc1f422f6c4bcfb5bd3d24e2))
    * **release:** Release 3.3.0 ([66fb6fa](https://github.com/naver/egjs-infinitegrid/commit/66fb6faf4568320dc86367e186189f951e2bfe48))
    * **release:** Release 3.3.1 ([c2f40c4](https://github.com/naver/egjs-infinitegrid/commit/c2f40c440c2454cacabf7fa2af21e81eed3812a2))
    * **release:** Release 3.3.2 ([826b085](https://github.com/naver/egjs-infinitegrid/commit/826b0852d128b8288998922ab256a0e3340e8da8))
    * **release:** Release 3.3.3 ([7977357](https://github.com/naver/egjs-infinitegrid/commit/79773574b212a1fb5d278b8487449f861864a9d9))
    * **release:** Release 3.3.4 ([0e90228](https://github.com/naver/egjs-infinitegrid/commit/0e90228e782e92bfbc18bb2c4f77a798af8b6c0a))
    * **release:** Release 3.3.5 ([0d1e0c5](https://github.com/naver/egjs-infinitegrid/commit/0d1e0c5adc815f969820b0259ae05c831b7f25f1))
    * **release:** Release 3.3.6 ([97bef4f](https://github.com/naver/egjs-infinitegrid/commit/97bef4fa2540c44eb40d13b0354aebe111772bf1))
    * **release:** Release 3.4.0 ([cd8e511](https://github.com/naver/egjs-infinitegrid/commit/cd8e5114fe5a3c93c9ac4f588efc8c9e78cd9c7e))
    * **release:** Release 3.4.1 ([3de82d0](https://github.com/naver/egjs-infinitegrid/commit/3de82d0338763758864bb685b1990e58a6ec8559))
    * **release:** Release 3.4.2 ([2e0b2b1](https://github.com/naver/egjs-infinitegrid/commit/2e0b2b1aff8f09efb0b4789d69b29609e514ebe6))
    * **release:** Release 3.4.3 ([131b891](https://github.com/naver/egjs-infinitegrid/commit/131b8915839acd49daab89b325ce57f6aee4ae10))
    * **release:** Release 3.4.4 ([ed19148](https://github.com/naver/egjs-infinitegrid/commit/ed191485a9fdd9bb847c1106e308237216f5391d))
    * **release:** Release 3.4.5 ([1b8e38f](https://github.com/naver/egjs-infinitegrid/commit/1b8e38f9e74f652f8ffa62b45a7f64564e71955d))
    * **release:** Release 3.4.6 ([74b4194](https://github.com/naver/egjs-infinitegrid/commit/74b419438f6f23429d2236d15acc60d3feeb76e4))
    * **release:** Release 3.4.7 ([713941e](https://github.com/naver/egjs-infinitegrid/commit/713941e55bccc889f91b8ae17395957b246f415e))
    * **release:** Release 3.4.7 ([23f87be](https://github.com/naver/egjs-infinitegrid/commit/23f87be1c52e20c4f7b1e468ecc66a92b53f0779))
    * **release:** Release 3.5.0 ([ef626b9](https://github.com/naver/egjs-infinitegrid/commit/ef626b9702abe8bf42a0e987ced5125b9b4ac761))
    * **release:** Release 3.5.1 ([5268e7f](https://github.com/naver/egjs-infinitegrid/commit/5268e7f2b6bd17ae7dd29a329f82f70bd121a80b))
    * **release:** Release 3.5.2 ([bf2eee6](https://github.com/naver/egjs-infinitegrid/commit/bf2eee6954e97ddc44324047fd02730b563a3a0e))
    * **release:** Release 3.5.3 ([01e19f9](https://github.com/naver/egjs-infinitegrid/commit/01e19f9942ce2883b48146e66bf493c5ce2b2d85))
    * **release:** Release 3.5.4 ([9986dd0](https://github.com/naver/egjs-infinitegrid/commit/9986dd0729432b0614dd652fbdc7f713a23a3751))
    * **release:** Release 3.5.5 ([7b40fd7](https://github.com/naver/egjs-infinitegrid/commit/7b40fd7acbbf788ce06eb9f433cb2cbc300ad42a))
    * **release:** Release 3.6.0 ([3b36111](https://github.com/naver/egjs-infinitegrid/commit/3b36111a3539afad7df8abe28f1f3b2cfb2ce34c))
    * **release:** Release 3.6.0 ([ad1c62e](https://github.com/naver/egjs-infinitegrid/commit/ad1c62e9d8484a12c1ab143e2e282c9600d0756a))
    * **release:** Release 3.6.1 ([c698b23](https://github.com/naver/egjs-infinitegrid/commit/c698b230d93ff00a17ba40542ef73425913226df))
    * **release:** Release 3.8.3 ([8786ed0](https://github.com/naver/egjs-infinitegrid/commit/8786ed0d0fbd9f96f9f8cd3e164d6460fb3bdafe))
    * **release:** Release 4.2.0 ([5dc0691](https://github.com/naver/egjs-infinitegrid/commit/5dc0691aff2ee29408eb72d0b5fb669ac363a942))
    * **releas:** merge 3.5.4-rc ([c6a1633](https://github.com/naver/egjs-infinitegrid/commit/c6a16331be7c106ce32bd744c4902194c32d3169))
    * remove dist ([233ce66](https://github.com/naver/egjs-infinitegrid/commit/233ce66f435afa5ebf67d69e2e8e561786509937))
    * update imready (#375) ([82b5b6c](https://github.com/naver/egjs-infinitegrid/commit/82b5b6cd2aa4e9fefa4a8d588435ca15cc3f7a16))
    * update stale.yml ([c67f79b](https://github.com/naver/egjs-infinitegrid/commit/c67f79b19809662b8d76e43b51650e0a37b784a6))



## [4.7.0](https://github.com/naver/egjs-infinitegrid/compare/4.6.0...4.7.0) (2022-09-02)
### :sparkles: Packages
* `@egjs/infinitegrid` 4.7.0
* `@egjs/react-infinitegrid` 4.7.0
* `@egjs/svelte-infinitegrid` 4.7.0
* `@egjs/vue-infinitegrid` 4.7.0
* `@egjs/vue3-infinitegrid` 4.7.0
* `@egjs/ngx-infinitegrid` 4.7.0


### :rocket: New Features

* `@egjs/ngx-infinitegrid`, `@egjs/infinitegrid`
    * add scrollContainer option (#511) ([78043ad](https://github.com/naver/egjs-infinitegrid/commit/78043ada3f65c54ed26b04bf2e4655d74961d449))


### :bug: Bug Fix

* `@egjs/react-infinitegrid`, `@egjs/infinitegrid`
    * add cjs file (#506) ([63fea02](https://github.com/naver/egjs-infinitegrid/commit/63fea02a34ed2e4c7702929cdef87191ce2208dc))
* `@egjs/infinitegrid`
    * fix placholder key (#514) ([af62a98](https://github.com/naver/egjs-infinitegrid/commit/af62a98c5f0562e929e09bf976298e8e29aa94e7))
* `@egjs/svelte-infinitegrid`
    * fix types (#510) ([96adfd7](https://github.com/naver/egjs-infinitegrid/commit/96adfd7bd66c6d77015818417990339da1b59311))


### :mega: Other

* All
    * update packages versions ([e438c00](https://github.com/naver/egjs-infinitegrid/commit/e438c00929ba28bd001d6174bd57efd918144686))



## [4.6.0](https://github.com/naver/egjs-infinitegrid/compare/4.5.0...4.6.0) (2022-07-26)
### :sparkles: Packages
* `@egjs/infinitegrid` 4.6.0
* `@egjs/react-infinitegrid` 4.6.0
* `@egjs/svelte-infinitegrid` 4.6.0
* `@egjs/vue-infinitegrid` 4.6.0
* `@egjs/vue3-infinitegrid` 4.6.0
* `@egjs/ngx-infinitegrid` 4.6.0


### :bug: Bug Fix

* `@egjs/infinitegrid`
    * fit groups' outlines for start direction (#502) ([51308c0](https://github.com/naver/egjs-infinitegrid/commit/51308c0750caa517d325a320ac2f14dcfc097337))
    * fix items to be removed (#500) ([8317f39](https://github.com/naver/egjs-infinitegrid/commit/8317f3926318e468ef49e9f28d54384c12ae3565))
    * fix mounted setting (#497) ([6d4a281](https://github.com/naver/egjs-infinitegrid/commit/6d4a281e17570b9049afebe651fd4708d230be36))
    * fix outline calculation (#498) ([0446dd4](https://github.com/naver/egjs-infinitegrid/commit/0446dd48f2d532dffc3a460472080fcd78df5724))


### :mega: Other

* All
    * update packages versions ([d4aa615](https://github.com/naver/egjs-infinitegrid/commit/d4aa615a8cd3e25b621500e2a7b243dcc9696eef))



## [4.5.0](https://github.com/naver/egjs-infinitegrid/compare/4.4.0...4.5.0) (2022-06-23)
### :sparkles: Packages
* `@egjs/infinitegrid` 4.5.0
* `@egjs/react-infinitegrid` 4.5.0
* `@egjs/svelte-infinitegrid` 4.5.0
* `@egjs/vue-infinitegrid` 4.5.0
* `@egjs/vue3-infinitegrid` 4.5.0
* `@egjs/ngx-infinitegrid` 4.5.0


### :rocket: New Features

* `@egjs/infinitegrid`
    * add insertByGroupIndex method (#489) ([87a06ef](https://github.com/naver/egjs-infinitegrid/commit/87a06ef9aad2a289e1360ac6c17f36e125ea75cf))
    * add nextGroupKeys property in request events (#493) ([b0260ad](https://github.com/naver/egjs-infinitegrid/commit/b0260ad828e725e6f1266898e0df7ac30a116d80))


### :mega: Other

* All
    * update packages versions ([171bb74](https://github.com/naver/egjs-infinitegrid/commit/171bb74f708110a2fd986276c9b8d65472fa64ab))
* `@egjs/react-infinitegrid`
    * remove browser field (#486) ([14b063c](https://github.com/naver/egjs-infinitegrid/commit/14b063cc220eb71fb946614f2c82207d19a682ab))



## [4.4.0](https://github.com/naver/egjs-infinitegrid/compare/4.3.1...4.4.0) (2022-05-25)
### :sparkles: Packages
* `@egjs/infinitegrid` 4.4.0
* `@egjs/react-infinitegrid` 4.4.0
* `@egjs/svelte-infinitegrid` 4.4.0
* `@egjs/vue-infinitegrid` 4.4.0
* `@egjs/vue3-infinitegrid` 4.4.0
* `@egjs/ngx-infinitegrid` 4.4.0


### :rocket: New Features

* `@egjs/react-infinitegrid`, `@egjs/infinitegrid`
    * add includePlaceholders param (#484) ([39852c3](https://github.com/naver/egjs-infinitegrid/commit/39852c38f643afe56a959831b73e78bf84b7c0a9))


### :mega: Other

* All
    * update packages versions ([29bdea0](https://github.com/naver/egjs-infinitegrid/commit/29bdea08f334113e4a73180dd5f9e803c4befc99))



## [4.3.1](https://github.com/naver/egjs-infinitegrid/compare/4.3.0...4.3.1) (2022-05-17)
### :sparkles: Packages
* `@egjs/infinitegrid` 4.3.1
* `@egjs/react-infinitegrid` 4.3.1
* `@egjs/svelte-infinitegrid` 4.3.1
* `@egjs/vue-infinitegrid` 4.3.1
* `@egjs/vue3-infinitegrid` 4.3.1
* `@egjs/ngx-infinitegrid` 4.3.1


### :bug: Bug Fix

* `@egjs/infinitegrid`
    * fix contentError event returns an invalid item #482 ([f865dec](https://github.com/naver/egjs-infinitegrid/commit/f865decd8e12e98a04a93c42baeb4dd31fb345a2))


### :memo: Documentation

* `@egjs/infinitegrid`
    * fix README ([18df0ed](https://github.com/naver/egjs-infinitegrid/commit/18df0ed561ef574216b5ce1449c89631858cadb6))
* Other
    * fix CHANGELOG ([ab9bce1](https://github.com/naver/egjs-infinitegrid/commit/ab9bce1e13255a48913404ff49536b1661c3ca08))


### :mega: Other

* `@egjs/vue3-infinitegrid`, `@egjs/vue-infinitegrid`, `@egjs/svelte-infinitegrid`, `@egjs/react-infinitegrid`, `@egjs/ngx-infinitegrid`
    * update packages versions ([47f9348](https://github.com/naver/egjs-infinitegrid/commit/47f9348042e19c789b986ec936ed042a3838afc8))
* `@egjs/infinitegrid`
    * move demo files ([eeb8bf1](https://github.com/naver/egjs-infinitegrid/commit/eeb8bf173e2055207a2b0e590838919a0f198dfa))



## [4.3.0](https://github.com/naver/egjs-infinitegrid/compare/4.2.1...4.3.0) (2022-05-13)
### :sparkles: Packages
* `@egjs/infinitegrid` 4.3.0
* `@egjs/react-infinitegrid` 4.3.0
* `@egjs/svelte-infinitegrid` 4.3.0
* `@egjs/vue-infinitegrid` 4.3.0
* `@egjs/vue3-infinitegrid` 4.3.0
* `@egjs/ngx-infinitegrid` 4.3.0


### :rocket: New Features

* add observeChildren option (#481) ([c821b4c](https://github.com/naver/egjs-infinitegrid/commit/c821b4c46c6395dae9d9c545e446857d5a13e134))


### :bug: Bug Fix

* `@egjs/react-infinitegrid`
    * fix strict mode (#476) ([64ac1e3](https://github.com/naver/egjs-infinitegrid/commit/64ac1e3e4792536409f3d9b4c31cd0a8be150bd1))


### :house: Code Refactoring

* `@egjs/react-infinitegrid`, `@egjs/ngx-infinitegrid`, `@egjs/infinitegrid`
    * apply lerna ([d7f20f1](https://github.com/naver/egjs-infinitegrid/commit/d7f20f19c83bc26309b27095351e17227d9abad6))


### :mega: Other

* `@egjs/vue3-infinitegrid`, `@egjs/vue-infinitegrid`, `@egjs/svelte-infinitegrid`, `@egjs/react-infinitegrid`, `@egjs/ngx-infinitegrid`
    * update packages versions ([bc07e37](https://github.com/naver/egjs-infinitegrid/commit/bc07e37a5fb40e94f87cd1b07f1f7a843ddbe7e8))
* `@egjs/infinitegrid`
    * move test files ([6974101](https://github.com/naver/egjs-infinitegrid/commit/69741011c0b9fcf11eb22ef574523468d3cbca3f))

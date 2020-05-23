<template>
    <card class="card-user" title="App Settings">
        <div slot="image">
            <img src="@/assets/img/background.jpg" alt="...">
        </div>

        <div>
            <h3><i class="fa fa-check-square mr-2"></i> Unconfirmed Txs</h3>
        </div>

        <p class="setting-tip">
            Instantly display your FULL balance, before coins are confirmed in a block.
        </p>

        <hr>

        <div>
            <h3><i class="fa fa-square mr-2"></i> Dark Mode</h3>
        </div>

        <p class="setting-tip">
            Adapts the fore/back-ground themes for reduced stress on the eyes.
        </p>
    </card>
</template>

<script>
export default {
    data() {
        return {
            details: [
                {
                    title: '12',
                    subTitle: 'Files'
                },
                {
                    title: '2GB',
                    subTitle: 'Used'
                },
                {
                    title: '24,6$',
                    subTitle: 'Spent'
                }
            ]
        }
    },
    methods: {
        //
    }
}
</script>

<style scoped>
.setting-tip {
    margin-left: 40px;
    font-size: 0.9em;
}
</style>

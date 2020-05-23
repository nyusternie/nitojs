<template>
    <card class="card-user" title="App Settings">
        <div slot="image">
            <img src="@/assets/img/background.jpg" alt="...">
        </div>

        <div>
            <h3><i class="fa fa-check-square mr-2"></i> Unconfirmed Txs</h3>
            <h3><i class="fa fa-square mr-2"></i> Dark Mode</h3>
        </div>

        <hr>

        <div class="text-center">
            <div class="row">
                <div class="col">
                    <h5>
                        {{details[0].title}}
                        <br>
                        <small>{{details[0].subtitle}}</small>
                    </h5>
                </div>

                <div class="col">
                    <h5>
                        {{details[1].title}}
                        <br>
                        <small>{{details[1].subtitle}}</small>
                    </h5>
                </div>

                <div class="col">
                    <h5>
                        {{details[2].title}}
                        <br>
                        <small>{{details[2].subtitle}}</small>
                    </h5>
                </div>
            </div>
        </div>
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
/*  */
</style>

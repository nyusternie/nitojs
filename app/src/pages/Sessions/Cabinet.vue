<template>
    <card class="card" title="My Sessions">
        <ul v-if="getSessions" class="list-unstyled team-members">
            <li>
                <div class="row cabinet-row" v-for="session in sessions" :key="session.name">
                    <div class="col-3">
                        <div class="avatar">
                            <img :src="session.image" alt="Circle Image" class="rounded img-fluid">
                        </div>
                    </div>

                    <div class="col-6">
                        <span class="text-capitalize">{{session.label}}</span>
                        <br>
                        <span :class="getStatusClass(session.status)">
                            <small>{{session.status}}</small>
                        </span>
                    </div>

                    <div class="col-3 text-center">
                        <i class="fa fa-circle fa-2x text-success"></i>
                    </div>
                </div>
            </li>
        </ul>

        <div v-else>
            <em class="text-danger">You have no sessions available</em>
        </div>
    </card>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            sessions: null,
        }
    },
    computed: {
        ...mapGetters('purse', [
            'getSessions',
        ]),

    },
    methods: {
        ...mapActions('purse', [
            //
        ]),

        getStatusClass(status) {
            switch (status) {
            case 'Canceled':
                return 'text-muted'
            case 'Active':
                return 'text-success'
            case 'Failed':
                return 'text-danger'
            default:
                return 'text-success'
            }
        },

        getClasses(index) {
            const remainder = index % 3;

            if (remainder === 0) {
                return 'col-lg-3 offset-lg-1'
            } else if (remainder === 2) {
                return 'col-lg-4'
            } else {
                return 'col-lg-3'
            }
        },
    },
    created: function () {
        // FOR DEVELOPMENT PURPOSES ONLY
        this.sessions = [
            // {
            //     label: 'Party goods',
            //     status: 'Active',
            //     image: require('@/assets/img/faces/face-1.jpg'),
            // },
            // {
            //     label: 'Testing',
            //     status: 'Canceled',
            //     image: require('@/assets/img/faces/face-1.jpg'),
            // },
            {
                label: 'My first session',
                status: 'Active',
                image: require('@/assets/img/incognito.jpg'),
            },
        ]
    }
}
</script>

<style scoped>
.cabinet-row {
    /* border-bottom: 1pt solid rgba(180, 180, 180, 0.2); */
    padding: 10px 0;
    margin-bottom: 10px;
    cursor: pointer;
}
.cabinet-row:hover {
    background-color: rgba(255, 0, 0, 0.2);
}
</style>

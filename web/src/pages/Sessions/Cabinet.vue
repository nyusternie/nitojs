<template>
    <card class="card" title="Sessions Cabinet">
        <div>
            <ul class="list-unstyled team-members">
                <li>
                    <div class="row journal-row" v-for="session in sessions" :key="session.name">
                        <div class="col-3">
                            <div class="avatar">
                                <img :src="session.image" alt="Circle Image" class="rounded img-fluid">
                            </div>
                        </div>

                        <div class="col-6">
                            {{session.name}}
                            <br>
                            <span :class="getStatusClass(session.status)">
                                <small>{{session.status}}</small>
                            </span>
                        </div>

                        <div class="col-3">
                            <p-button type="success" outline icon>
                                <i class="fa fa-list-ol"></i>
                            </p-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </card>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

import NotificationTemplate from '@/pages/Notifications/NotificationTemplate'

export default {
    data() {
        return {
            depositAddress: null,
            type: ['', 'info', 'success', 'warning', 'danger'],
            notifications: {
                topCenter: false
            },

            sessions: [
                {
                    image: require('@/assets/img/faces/face-1.jpg'),
                    name: 'Party goods',
                    status: 'Active'
                },
                {
                    image: require('@/assets/img/faces/face-1.jpg'),
                    name: 'Testing',
                    status: 'Canceled'
                },
                {
                    image: require('@/assets/img/faces/face-1.jpg'),
                    name: 'Session #1',
                    status: 'Failed'
                },
            ]
        }
    },
    computed: {
        ...mapGetters('purse', [
            // 'getAddress',
        ]),

    },
    methods: {
        ...mapActions('purse', [
            // 'initSession',
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

        notifyVue(verticalAlign, horizontalAlign) {
            const color = Math.floor(Math.random() * 4 + 1)

            this.$notify({
                component: NotificationTemplate,
                icon: 'ti-gift',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: this.type[color]
            })
        }
    },
    created: function () {
        //
    }
}
</script>

<style scoped>
.journal-row {
    border-bottom: 1pt solid rgba(180, 180, 180, 0.2);
    padding-bottom: 10px;
    margin-bottom: 10px;
}
</style>

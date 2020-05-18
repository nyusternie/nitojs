<template>
    <div class="row">
        <div class="col-12">
            <card :title="sessions.title" :subTitle="sessions.subTitle">
                <div slot="raw-content" class="table-responsive">
                    <paper-table type="hover" :data="sessions.data" :columns="sessions.columns">

                    </paper-table>
                </div>
            </card>
        </div>

        <div class="col-12">
            <card class="card-plain" :title="transactions.title" :subTitle="transactions.subTitle">
                <div class="table-full-width table-responsive">
                    <paper-table type="hover" :title="transactions.title" :sub-title="transactions.subTitle" :data="transactions.data"
                         :columns="transactions.columns">

                     </paper-table>
                 </div>
             </card>
         </div>

         <div class="col-12">
             <card :title="system.title" :subTitle="system.subTitle">
                 <div slot="raw-content" class="table-responsive">
                     <paper-table :data="system.data" :columns="system.columns">

                     </paper-table>
                 </div>
             </card>
         </div>

     </div>
</template>

<script>
import { PaperTable } from '@/components'

const tableColumns = ['Id', 'Name', 'Salary', 'Country', 'City']

const tableData = [
    {
        id: 1,
        name: 'Dakota Rice',
        salary: '$36.738',
        country: 'Niger',
        city: 'Oud-Turnhout'
    },
    {
        id: 2,
        name: 'Minerva Hooper',
        salary: '$23,789',
        country: 'Curaçao',
        city: 'Sinaai-Waas'
    },
    {
        id: 3,
        name: 'Sage Rodriguez',
        salary: '$56,142',
        country: 'Netherlands',
        city: 'Baileux'
    },
    {
        id: 4,
        name: 'Philip Chaney',
        salary: '$38,735',
        country: 'Korea, South',
        city: 'Overland Park'
    },
    {
        id: 5,
        name: 'Doris Greene',
        salary: '$63,542',
        country: 'Malawi',
        city: 'Feldkirchen in Kärnten'
    }
]

export default {
    components: {
        PaperTable
    },
    data() {
        return {
            sessions: {
                title: 'Sessions',
                subTitle: 'List of ALL CashShuffle session activity since app setup.',
                columns: [...tableColumns],
                data: [...tableData]
            },
            transactions: {
                title: 'Deposits & Transfers',
                subTitle: 'List of ALL incoming and outgoing coin activity since app setup.',
                columns: [...tableColumns],
                data: [...tableData]
            },
            system: {
                title: 'Application Events',
                subTitle: 'List of ALL application activity since app setup.',
                columns: [...tableColumns],
                data: [...tableData]
            },
        }
    }
}
</script>

<style scoped>
/*  */
</style>

<template>
    <footer class="footer">
        <div class="container-fluid d-flex flex-wrap justify-content-between">
            <nav>
                <ul>
                    <li>
                        <a href="https://docs.nitojs.org/" target="_blank">
                            Terms
                        </a>
                    </li>

                    <li>
                        <a href="https://docs.nitojs.org/" target="_blank">
                            Privacy
                        </a>
                    </li>

                    <li>
                        <a href="https://gitlab.com/bchplease/nitojs" target="_blank">
                            Source
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="copyright d-flex flex-wrap">
                &copy; {{curYear}}.
                <a href="https://bchplease.org" target="_blank" class="mx-1">
                    <strong class="text-success">Bitcoin Cash Please.</strong>
                </a>
                All rights reserved.
            </div>
        </div>
    </footer>
</template>

<script>
import moment from 'moment'

export default {
    computed: {
        curYear() {
            return moment().format('YYYY')
        }
    }
}
</script>

<style>
/*  */
</style>

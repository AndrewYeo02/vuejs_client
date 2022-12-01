<template>
    <div id="create-logbook">
        <h1>Create Logbook</h1>

        <p><router-link :to="{ name: 'all_trainees' }">Return to trainees</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="addLogbook">
            <div class="form-group">
                <label name="logbook_id">ID</label>
                <input type="text" class="form-control" disabled v-model="logbook.id" id="logbook_id">
            </div>

            <div class="form-group">
                <label name="logbook_name">Name</label>
                <input type="text" class="form-control" v-model="logbook.name" id="logbook_name" required>
            </div>

            <div class="form-group">
                <label name="logbook_trainee_name">Trainee ID</label>
                <input type="text" class="form-control" v-model="logbook.trainee_id" id="logbook_Fname" required>
            </div>

            <div class="form-group">
                <label name="logbook_ac_tail_sign">Ac_Tail_Sign</label>
                <input type="text" class="form-control" v-model="logbook.ac_tail_sign" id="logbook_ac_tail_sign" required>
            </div>

            <div class="form-group">
                <label name="logbook_issue_date">Issue Date</label>
                <input type="text" class="form-control" v-model="logbook.issue_date" id="logbook_issue_date" required>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';

    export default{
        data(){
            return{
                logbook:{},
                notifications:[]
            }
        },
         created: function(){
            this.getLogbook();
        },


        methods: {
            addLogbook: function()
            {

                this.$http.post('http://192.168.1.66/api/logbooks', this.logbook, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'Logbook created successfully'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'Logbook not created'
                    });
                });
            }
        },
           getLogbook: function()
            {
                this.$http.get('http://192.168.1.66/api/logbooks/' + this.$route.params.id).then((response) => {
                    this.logbook = response.body;
                }, (response) => {

                });
            },

        components: {
            'notification' : Notification
        }
    }
</script>

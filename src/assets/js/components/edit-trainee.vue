<template>
    <div id="update-trainee">
        <h1>Update Trainee</h1>

        <p><router-link :to="{ name: 'all_trainees' }">Return to trainee</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="editTrainee">
            <div class="form-group">
                <label name="trainee_id">ID</label>
                <input type="text" class="form-control" disabled v-model="trainee.id" id="trainee_id">
            </div>

            <div class="form-group">
                <label name="trainee_name">User Name</label>
                <input type="text" class="form-control" v-model="trainee.username" id="trainee_Uname" required>
            </div>

            <div class="form-group">
                <label name="trainee_name">First Name</label>
                <input type="text" class="form-control" v-model="trainee.fname" id="trainee_Fname" required>
            </div>

            <div class="form-group">
                <label name="trainee_name">Last Name</label>
                <input type="text" class="form-control" v-model="trainee.surname" id="trainee_Lname" required>
            </div>

            <div class="form-group">
                <label name="trainee_name">Email</label>
                <input type="text" class="form-control" v-model="trainee.email" id="trainee_Email" required>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';

    export default{
        data(){
            return{
                trainee:{},
                notifications:[]
            }
        },

        created: function(){
            this.getTrainee();
        },

        methods: {
            getTrainee: function()
            {
                this.$http.get('http://192.168.1.66/api/trainees/' + this.$route.params.id).then((response) => {
                    this.trainee = response.body;
                }, (response) => {

                });
            },

            editTrainee: function()
            {
                // Validation
              

                this.$http.put('http://192.168.1.66/api/trainees/' + this.$route.params.id, this.trainee, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'Trainee updated successfully'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'Trainee not updated'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>

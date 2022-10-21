<template>
    <div id="delete-trainee">
        <h1>Delete Trainee {{ trainee.username }}</h1>

        <p><router-link :to="{ name: 'all_trainees' }">Return to trainees</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="deleteTrainee">
            <p><button class="btn btn-danger">Delete Trainee</button></p>
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

            deleteTrainee: function()
            {
                this.$http.delete('http://192.168.1.66/api/trainees/' + this.$route.params.id, this.trainee, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.$router.push({name: 'all_trainees'})
                }, (response) => {
                    this.notifications.push({
                        type: 'danger',
                        message: 'Trainee could not deleted'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>

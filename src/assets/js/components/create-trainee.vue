<template>
    <div id="create-trainee">
        <h1>Create Trainee</h1>

        <p><router-link :to="{ name: 'all_trainees' }">Return to trainees</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="addTrainee">
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

            <!-- <div class="form-group">
                <label name="trainee_price">Price</label>
                <input type="text" class="form-control" v-model="trainee.price" id="trainee_price" required>
            </div> -->

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
                trainee:{},
                notifications:[]
            }
        },

        methods: {
            addTrainee: function()
            {
                // // Validation
                // var price = parseFloat(this.trainee.price);
                // if(isNaN(price))
                // {
                //     this.notifications.push({
                //         type: 'danger',
                //         message: 'Price must be a number'
                //     });
                //     return false;
                // } else {
                //     this.trainee.price = this.trainee.price;
                // }

                this.$http.post('http://192.168.1.66/api/trainees', this.trainee, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'Trainee created successfully'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'Trainee not created'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>

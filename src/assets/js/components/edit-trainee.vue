<template>
    <div id="update-product">
        <h1>Update Trainee</h1>

        <p><router-link :to="{ name: 'all_trainees' }">Return to trainee</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="editTrainee">
            <div class="form-group">
                <label name="product_id">ID</label>
                <input type="text" class="form-control" disabled v-model="product.id" id="product_id">
            </div>

            <div class="form-group">
                <label name="product_name">User Name</label>
                <input type="text" class="form-control" v-model="product.username" id="product_Uname" required>
            </div>

            <div class="form-group">
                <label name="product_name">First Name</label>
                <input type="text" class="form-control" v-model="product.fname" id="product_Fname" required>
            </div>

            <div class="form-group">
                <label name="product_name">Last Name</label>
                <input type="text" class="form-control" v-model="product.surname" id="product_Lname" required>
            </div>

            <div class="form-group">
                <label name="product_name">Email</label>
                <input type="text" class="form-control" v-model="product.email" id="product_Email" required>
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
                product:{},
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
                    this.product = response.body;
                }, (response) => {

                });
            },

            editTrainee: function()
            {
                // Validation
              

                this.$http.patch('http://192.168.1.66/api/trainees/' + this.$route.params.id, this.product, {
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

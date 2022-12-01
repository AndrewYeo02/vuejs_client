<template>
    <div id="all-logbooks">
        <h1>All Logbooks</h1>
          
       
        
        <p >
         <router-link :to="{name : 'all_trainees'}" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                </svg>
                
              </router-link>
        <router-link :to="{ name: 'create_logbook' ,params: { id: logbook.trainee_id }}" class="btn btn-primary">Create Logbook</router-link>
        </p>

        <div class="form-group">
            <input type="text" name="search" v-model="logbookSearch" placeholder="Search logbooks" class="form-control" v-on:keyup="searchLogbooks">
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Trainee ID</td>
                <td>Ac_Tail_Sign</td>
                <td>Issue Date</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody v-for="logbook in logbooks">

                <tr v-if="trainee.id == logbook.trainee_id" >
                    <td>{{ logbook.id }}</td>
                    <td>{{ logbook.name }}</td>
                    <td>{{ logbook.trainee_id }}</td>
                    <td>{{ logbook.ac_tail_sign }}</td>
                    <td>{{ logbook.issue_date }}</td>
                   <td> 
                    <router-link :to="{name: 'edit_logbooks', params: { id: logbook.id }}" class="btn btn-primary">Edit</router-link>
                    <router-link :to="{name: 'delete_trainee', params: { id: logbook.id }}" class="btn btn-danger">Delete</router-link>
                   </td>
                  
                </tr>
               
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                logbooks: [],
                originalLogbooks: [],
                trainee: {},
                logbook:{},
                logbookSearch: ''
            }
        },

        created: function()
        {
            this.fetchLogbooksData();
            this.fetchLogbookData();
            this.fetchTraineeData();
        },

        methods: {
            fetchLogbooksData: function()
            {
                this.$http.get('http://192.168.1.66/api/logbooks').then((response) => {
                    this.logbooks = response.body;
                    this.originalLogbooks = this.logbooks;
                }, (response) => {

                });
            }, 
            fetchLogbookData: function()
            {
                this.$http.get('http://192.168.1.66/api/logbooks/' + this.$route.params.id).then((response) => {
                    this.logbook = response.body;
                }, (response) => {

                });
            },
             fetchTraineeData: function()
            {
                this.$http.get('http://192.168.1.66/api/trainees/' + this.$route.params.id).then((response) => {
                    this.trainee = response.body;
                }, (response) => {

                });
            },

            searchLogbooks: function()
            {
                if(this.logbookSearch == '')
                {
                    this.logbooks = this.originalLogbooks;
                    return;
                }

                var searchedLogbooks = [];
                for(var i = 0; i < this.originalLogbooks.length; i++)
                {
                    var logbookName = this.originalLogbooks[i]['name'].toLowerCase();
                    if(logbookName.indexOf(this.logbookSearch.toLowerCase()) >= 0)
                    {
                        searchedLogbooks.push(this.originalLogbooks[i]);
                    }
                }

                this.logbooks = searchedLogbooks;
            }
        }
    }
</script>

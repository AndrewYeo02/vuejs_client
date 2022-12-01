<template>
    <div id="all-logbooks">
        <h1>All Logbooks</h1>
          
        <p><router-link :to="{ name: 'all_trainees' }">Return to trainees</router-link></p>

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

            <tbody>
                <tr v-for="logbook in logbooks">
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
                logbookSearch: ''
            }
        },

        created: function()
        {
            this.fetchTraineeData();
        },

        methods: {
            fetchTraineeData: function()
            {
                this.$http.get('http://192.168.1.66/api/logbooks').then((response) => {
                    this.logbooks = response.body;
                    this.originalLogbooks = this.logbooks;
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

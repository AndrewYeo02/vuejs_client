<template>
    <div id="all-tasks">
        <h1>All Tasks</h1>
          
         <p><router-link :to="{ name: 'all_trainees' }">Return to trainees</router-link></p>
        
        <p>
         <!-- <router-link :to="{name : 'all_trainees'}" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"></path>
                </svg>
                
              </router-link>
        <router-link :to="{ name: 'create_task' }" class="btn btn-primary">Create Task</router-link> -->
        </p>

        <div class="form-group">
            <input type="text" name="search" v-model="taskSearch" placeholder="Search tasks" class="form-control" v-on:keyup="searchTasks">
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Logbook ID</td>
                <td>Description</td>
                <td>Date Time</td>
               
                <!-- <td>Actions</td> -->
            </tr>
            </thead>

            <tbody>
                <tr v-for="task in tasks">
                    <td>{{ task.id }}</td>
                    <td>{{ task.lbook_id }}</td>
                    <td>{{ task.description }}</td>
                    <td>{{ task.datetime }}</td>
                  
                    <!-- <td>{{ task.price }}</td> -->
                    <!-- <td>
                        <router-link :to="{name: 'view_tasks', params: { id: task.id }}" class="btn btn-warning">View Tasks</router-link>
                    </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                tasks: [],
                originalTasks: [],
                taskSearch: ''
            }
        },

        created: function()
        {
            this.fetchTraineeData();
        },

        methods: {
            fetchTraineeData: function()
            {
                this.$http.get('http://192.168.1.66/api/tasks').then((response) => {
                    this.tasks = response.body;
                    this.originalTasks = this.tasks;
                }, (response) => {

                });
            },

            searchTasks: function()
            {
                if(this.taskSearch == '')
                {
                    this.tasks = this.originalTasks;
                    return;
                }

                var searchedTasks = [];
                for(var i = 0; i < this.originalTasks.length; i++)
                {
                    var taskName = this.originalTasks[i]['name'].toLowerCase();
                    if(taskName.indexOf(this.taskSearch.toLowerCase()) >= 0)
                    {
                        searchedTasks.push(this.originalTasks[i]);
                    }
                }

                this.tasks = searchedTasks;
            }
        }
    }
</script>

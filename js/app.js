(function (window) {
	'use strict';
	// 需求分析
	//1、展示数据(在index.html完成)
	//2、添加任务数据（add）
	//3、删除任务数据 (remove)
	//4、编辑任务数据(在index.html完成)
	//5、切换任务完成状态(在index.html完成)
	//6、批量切换任务状态(toggleAll)
	//7、清除已完成的功能，并隐藏或显示清楚按钮(clearAll,isShow)
	//8、显示未完成任务数(activeNum)
	//9、切换不同状态任务的显示
	//10、本地存储
	window.Storage={
		getTasks:function () {
			return JSON.parse(window.localStorage.getItem('todos')||'[]');
		},
		setTasks:function (json) {
			console.log(json);
			return localStorage.setItem('todos',JSON.stringify(json));
		}

	}
	window.app=new Vue({
		el:".todoapp",
		data:{
			count:0,
			isEditing:-1,
			newTask:"",
			status:true,
			completed:"",
			flag:'/',
			tasks:Storage.getTasks(),
		},
	 computed:{
	 	activeNum:function(){
	 		this.count=0;
	 		for(var i=0;i<this.tasks.length;i++){
	 			if(!this.tasks[i].completed){
	 				this.count++;
	 			}

	 		}
	 		return this.count;
	 	}
	 },
	 methods:{
	 	remove:function(id){
	 		for(var i=0;i<this.tasks.length;i++){
	 			var item=this.tasks[i];
	 			if(item.id==id){
	 				this.tasks.splice(i,1);
					Storage.setTasks(this.tasks);
	 				return ;
	 			}
	 		}

	 	},

	 	add:function(){
	 		if(this.newTask.trim()==""){
	 			return;
	 		}
	 		var newItem={
	 			id:this.tasks.length>0?this.tasks[this.tasks.length-1].id+1:0,
				name:this.newTask.trim(),
				completed:false
	 		};
	 		this.tasks.push(newItem);
			Storage.setTasks(this.tasks);
	 		this.newTask="";
	 	},
	 	toggleAll:function(){
	 		this.status=!this.status;
	 		for(var i=0;i<this.tasks.length;i++){
	 			this.tasks[i].completed=this.status;
	 		}
			Storage.setTasks(this.tasks);
	 	},
	 	clearAll:function(){
	 		for(var i=this.tasks.length-1;i>=0;i--){
	 			if(this.tasks[i].completed){
	 				this.tasks.splice(i,1);
	 			}
	 		}
			Storage.setTasks(this.tasks);
	 	},
	 	isShow:function(){
	 		for(var i=this.tasks.length-1;i>=0;i--){
	 			if(this.tasks[i].completed){
	 				return true;
	 			}
	 			return false;
	 		}
	 	},
		 show:function (completed) {
			if(this.flag=='/'){
				return true;
			}else{
				if(completed!=this.flag.completed){
					return false;
				}else{
					return true;
				}
			}
		 }
	 }

	})
})(window);

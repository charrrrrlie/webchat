var socket=io();new Vue({el:"#app",data:{connectedUsers:[],messages:[],message:{type:"",action:"",user:"",text:"",timestamp:""},areTyping:[]},created:function(){socket.on("user joined",function(s){axios.get("/onlineusers").then(function(s){for(var e in s.data)this.connectedUsers.indexOf(e)<=-1&&this.connectedUsers.push(e);console.log(this.connectedUsers)}.bind(this));var e={type:"info",msg:"User "+s+" has joined"};this.messages.push(e)}.bind(this)),socket.on("chat.message",function(s){this.messages.push(s)}.bind(this)),socket.on("user typing",function(s){this.areTyping.push(s)}.bind(this)),socket.on("stopped typing",function(s){var e=this.areTyping.indexOf(s);e>=0&&this.areTyping.splice(e,1)}.bind(this)),socket.on("user left",function(s){var e=this.connectedUsers.indexOf(s);e>=0&&this.connectedUsers.splice(e,1);var t={type:"info",msg:"User "+s+" has left"};this.messages.push(t)}.bind(this))},methods:{send:function(){this.message.type="chat",this.message.user=socket.id,this.message.timestamp=moment().calendar(),socket.emit("chat.message",this.message),this.message.type="",this.message.user="",this.message.text="",this.message.timestamp=""},userIsTyping:function(s){return this.areTyping.indexOf(s)>=0},usersAreTyping:function(){this.areTyping.indexOf(socket.id)<=-1&&(this.areTyping.push(socket.id),socket.emit("user typing",socket.id))},stoppedTyping:function(s){if("13"==s||"8"==s&&""==this.message.text){var e=this.areTyping.indexOf(socket.id);e>=0&&(this.areTyping.splice(e,1),socket.emit("stopped typing",socket.id))}}}});
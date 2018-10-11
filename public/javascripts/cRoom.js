var socket = io()
    socket.connect('http://192.168.34.54:4747/');
    socket.on("chat", addChat)

    function broadCastMsg() {
        if( $('#textarea').val() != '')
        {
            var chatMessage = {
                name: $("#username").val(), chat: $("#textarea").val()
            }
            postChat(chatMessage)
            var obj = $('#textarea');
            obj.value = null;
            var pera = $('p');
            pera.value = null;
        }
        else{
            alert('cannot send empty message!!!!');
        }
    }
    function postChat(chat) {
        $.post("/chatroom/putChats", chat)
    }

    function getChats() {
        $.get("http://localhost:4747/chatroom/send/AllChats", function (chats, status) {
            printChats(chats);
        });
    }

    function addChat(chatObj) {
        var message = document.getElementById('messages');
        message.value +=  "\n" + chatObj.name+": "+chatObj.chat;
    }

    //socket.on('getChats',printChats)

    function printChats(chatsList)
    {
        chatsList.forEach(addChat)
    }

    socket.on('cleared', function(){
        var message = document.getElementById('messages');
        message.value = '';
    });

    // Handle Chat Clear
    function clearChats() {
        $.post("/chatroom/clear")
    }

    function myFunction() {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        x.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    (function($) {
    $(document).ready(function() {
        myFunction();
        getChats();
    });
})(jQuery);

$(function() 
{
// Initializes and creates emoji set from sprite sheet
window.emojiPicker = new EmojiPicker({
    emojiable_selector: '[data-emojiable=true]',
    assetsPath: '/images/',
    popupButtonClasses: 'fa fa-smile-o'
});
// Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
// You may want to delay this step if you have dynamically created input fields that appear later in the loading process
// It can be called as many times as necessary; previously converted input fields will not be converted again
window.emojiPicker.discover();
});

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-49610253-3', 'auto');
    ga('send', 'pageview');
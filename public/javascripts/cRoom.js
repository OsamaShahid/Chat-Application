var socket = io()
    socket.connect('http://192.168.34.54:4747/');
    socket.on("chat", addChat)

    
    function postChat(chat) {
        $.post("/chatroom/putChats", chat)
    }

    function getChats() {
        $.get("http://localhost:4747/chatroom/send/AllChats", function (chats, status) {
            printChats(chats);
        });
    }

    function addChat(chatObj) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        if(chatObj.chatImage === "")
        {
            if(chatObj.name === $('#thisName').val())
            {
                var newSentMsg = '<div class="outgoing_msg"><div class="sent_msg"><p>'+ chatObj.chat +'</p><span class="time_date">'+ dateTime +'</span> </div></div>';
                $('.msg_history').append(newSentMsg);
            }
            else {
                var newRecvMsg = '<div class="incoming_msg">' +
                '<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="'+ chatObj.name +'" style="color:darkgreen"> </div>' +
                '<div class="received_msg">' +
                    '<div class="received_withd_msg">' +
                    '<p style="">' + chatObj.chat + '</p>' +
                    '<span class="time_date">' + dateTime + ' | ' + chatObj.name + '</span></div>' +
                '</div>' +
                '</div>';
                $('.msg_history').append(newRecvMsg);
            }
        }
        else {
            if(chatObj.name === $('#thisName').val())
            {
                var newSentMsg = '<div class="outgoing_msg"><div class="sent_msg"><p>'+ chatObj.chat +'</p><img src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img><span class="time_date">'+ dateTime +'</span> </div></div>';
                $('.msg_history').append(newSentMsg);
            }
            else {
                var newRecvMsg = '<div class="incoming_msg">' +
                  '<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="'+ chatObj.name +'" style="color:darkgreen"> </div>' +
                  '<div class="received_msg">' +
                    '<div class="received_withd_msg">' +
                      '<p style="">' + chatObj.chat + '</p>' +
                      '<img src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img>' +
                      '<span class="time_date">' + dateTime + ' | ' + chatObj.name + '</span></div>' +
                  '</div>' +
                '</div>';
                $('.msg_history').append(newRecvMsg);
            }
        }
    }

    function printChats(chatsList)
    {
        chatsList.forEach(addChat)
    }

    socket.on('NewUserEntered', function(newUser){
        if($('#thisName').val() != newUser)
        {
            $('#snackbar').empty();
            $('#snackbar').append( newUser + ' joind the chatroom!!!!!')
            myFunction();
        }
    });

    socket.on('imgChat', function(chatObj){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time
        if(chatObj.name === $('#thisName').val())
        {
            var newSentMsg = '<div class="outgoing_msg"><div class="sent_msg"><p>'+ chatObj.chat +'</p><img src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img><span class="time_date">'+ dateTime +'</span> </div></div>';
            $('.msg_history').append(newSentMsg);
        }
        else {
            var newRecvMsg = '<div class="incoming_msg">' +
              '<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="'+ chatObj.name +'" style="color:darkgreen"> </div>' +
              '<div class="received_msg">' +
                '<div class="received_withd_msg">' +
                  '<p style="">' + chatObj.chat + '</p>' +
                  '<img src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img>' +
                  '<span class="time_date">' + dateTime + ' | ' + chatObj.name + '</span></div>' +
              '</div>' +
            '</div>';
            $('.msg_history').append(newRecvMsg);
        }
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
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
    }
    (function($) {
    $(document).ready(function() {
        getChats();
    });
})(jQuery);

$("#select_img").click(function () {
    $('input[type="file"]').trigger('click');
    alert('yoo');
});
  
$('input[type="file"]').on('change', function() {
    var val = $(this).val();
    $(this).siblings('span').text(val);
});

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
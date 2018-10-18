var socket = io()
    socket.connect('http://192.168.34.54:4747/');
    socket.on("chat", addChat)


    function addIndChat(chatObj) {
        if(document.getElementById('ind_type_msg').style.display === 'none')
        {
            return;
        }
        if(chatObj.chatImage == "")
        {
            if(chatObj.senderName === $('#thisName').val())
            {
                var newSentMsg = '<div class="outgoing_msg"><div class="sent_msg"><p>'+ chatObj.chatMessage +'</p><span class="time_date">'+ chatObj.TimeOfsending +'</span> </div></div>';
                $('.msg_history').append(newSentMsg);
            }
            else if (chatObj.receiverName === $('#thisName').val()) {
                var newRecvMsg = '<div class="incoming_msg">' +
                '<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="'+ chatObj.senderName +'" style="color:darkgreen"> </div>' +
                '<div class="received_msg">' +
                    '<div class="received_withd_msg">' +
                    '<p style="">' + chatObj.chatMessage + '</p>' +
                    '<span class="time_date">' + chatObj.TimeOfsending + ' | ' + chatObj.senderName + '</span></div>' +
                '</div>' +
                '</div>';
                $('.msg_history').append(newRecvMsg);
            }
            else {
                return;
            }
        }
        else {
            if(chatObj.senderName === $('#thisName').val())
            {
                var newSentMsg = '<div class="outgoing_msg"><div class="sent_msg"><p>'+ chatObj.chatMessage +'</p><img class="msg-img" onclick="enlargeImage(this);" style="border-radius: 5px;cursor: pointer;transition: 0.3s;" src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img><span class="time_date">'+ chatObj.TimeOfsending +'</span> </div></div>';
                $('.msg_history').append(newSentMsg);
            }
            else if (chatObj.receiverName === $('#thisName').val()) {
                var newRecvMsg = '<div class="incoming_msg">' +
                  '<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="'+ chatObj.senderName +'" style="color:darkgreen"> </div>' +
                  '<div class="received_msg">' +
                    '<div class="received_withd_msg">' +
                      '<p style="">' + chatObj.chatMessage + '</p>' +
                      '<img class="msg-img" style="border-radius: 5px;cursor: pointer;transition: 0.3s;" onclick="enlargeImage(this);" src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img>' +
                      '<span class="time_date">' + chatObj.TimeOfsending + ' | ' + chatObj.senderName + '</span></div>' +
                  '</div>' +
                '</div>';
                $('.msg_history').append(newRecvMsg);
            }

            else {
                return;
            }
        }
    }

    socket.on("indChat", addIndChat)
    
    function postChat(chat) {
        $.post("/chatroom/putChats", chat)
    }

    function getChats() {
        $.get("http://localhost:4747/chatroom/send/AllChats", function (res, status) {
            printChats(res.chatsToSend);
            ShowAllUsers(res.usersToSend);
        });
    }

    function ShowAllUsers(chatUsers) {
        chatUsers.forEach(addUser);
    }

    function addUser(userObj) {
        if(userObj.userName === $('#thisName').val()) {return;}
        var addUser =   '<div class="chat_list" id = "'+ userObj.userName +'" onclick="changeView(this);">' +
                            '<div class="chat_people">' +
                            '<div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt=""> </div>' +
                            '<div class="chat_ib">' +
                                '<h5>'+ userObj.userName + '<span class="chat_date"></span></h5>' +
                                '<p></p>' +
                            '</div>' +
                            '</div>' +
                        '</div>';

        $('.inbox_chat').append(addUser);
    }

    function changeView(cur) {
        $('.srch_bar').empty();
        var preBtn = '<a class="previous" onclick="backToChatRoom();" >&laquo; Chatroom</a>'
        $('.srch_bar').append(preBtn);
        $( ".chat_list" ).toggleClass( 'active_chat', false );
        document.getElementById('chatroom_type_msg').style.display = 'none';
        document.getElementById('ind_type_msg').style.display = 'inline';
        $( cur ).toggleClass( "active_chat");
        $('.msg_history').empty();
        console.log(cur.id);
        currentActiveChatUser = cur.id;
        $.get("http://192.168.34.54:4747/chatroom/getallchats/ind/" + $('thisName').val() + "/" + currentActiveChatUser, function(res,status){
            if(!res.check &&  document.getElementById('ind_type_msg').style.display === 'inline')
            {
                alert('Start A new Conversation');
            }
            else {
                if(document.getElementById('ind_type_msg').style.display === 'inline')
                {
                    
                }
            }
        });
    }

    function backToChatRoom() {
        currentActiveChatUser = null;
        $('.srch_bar').empty();
        $( ".chat_list" ).toggleClass( 'active_chat', false );
        $('.msg_history').empty();
        document.getElementById('ind_type_msg').style.display = 'none';
        document.getElementById('chatroom_type_msg').style.display = 'inline';
        $.get("http://localhost:4747/chatroom/send/AllChats", function (res, status) {
            console.log(res.chatsToSend);
            printChats(res.chatsToSend);
        });
    }

    function addChat(chatObj) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        if(chatObj.chatImage == "")
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
                var newSentMsg = '<div class="outgoing_msg"><div class="sent_msg"><p>'+ chatObj.chat +'</p><img class="msg-img" onclick="enlargeImage(this);" style="border-radius: 5px;cursor: pointer;transition: 0.3s;" src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img><span class="time_date">'+ dateTime +'</span> </div></div>';
                $('.msg_history').append(newSentMsg);
            }
            else {
                var newRecvMsg = '<div class="incoming_msg">' +
                  '<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="'+ chatObj.name +'" style="color:darkgreen"> </div>' +
                  '<div class="received_msg">' +
                    '<div class="received_withd_msg">' +
                      '<p style="">' + chatObj.chat + '</p>' +
                      '<img class="msg-img" style="border-radius: 5px;cursor: pointer;transition: 0.3s;" onclick="enlargeImage(this);" src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img>' +
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

    var currentActiveChatUser = null;
    

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
            var newSentMsg = '<div class="outgoing_msg"><div class="sent_msg"><p>'+ chatObj.chat +'</p><img class="msg-img" style="border-radius: 5px;cursor: pointer;transition: 0.3s;" onclick="enlargeImage(this);" src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img><span class="time_date">'+ dateTime +'</span> </div></div>';
            $('.msg_history').append(newSentMsg);
        }
        else {
            var newRecvMsg = '<div class="incoming_msg">' +
              '<div class="incoming_msg_img"> <img class="msg-img" src="https://ptetutorials.com/images/user-profile.png" alt="'+ chatObj.name +'" style="color:darkgreen"> </div>' +
              '<div class="received_msg">' +
                '<div class="received_withd_msg">' +
                  '<p style="">' + chatObj.chat + '</p>' +
                  '<img style="border-radius: 5px;cursor: pointer;transition: 0.3s;" onclick="enlargeImage(this);" src=' + chatObj.chatImage.substring(6,chatObj.chatImage.length) + '></img>' +
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

function enlargeImage(current)
{
    $('.enlargeImageModalSource').attr('src', $(current).attr('src'));
        $('#enlargeImageModal').modal('show');
}


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
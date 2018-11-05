class ConversationUtil {
  processResultList(body,resultList) {
    if(resultList.length) {
        var i;
        var resultArray = [];
        for(i=0;i<resultList.length;i++)
        {
          console.log(resultList[i].leftUser,resultList[i].rightUser,body.username)
          if(resultList[i].leftUser === body.username || resultList[i].rightUser === body.username) {
            if(resultList[i].leftUser === body.username) {
              var conversationobj = {
                id: resultList[i]._id,
                senderName: resultList[i].leftUser,
                receiverName: resultList[i].rightUser,
                unReadMsgCount: resultList[i].unreadMsgCountLeftUser,
                lastMessageTime: resultList[i].date,
                
              };
              resultArray.push(conversationobj);
            }
            else {
              var conversationobj = {
                id: resultList[i]._id,
                senderName: resultList[i].rightUser,
                receiverName: resultList[i].leftUser,
                unReadMsgCount: resultList[i].unreadMsgCountRightUser,
                lastMessageTime: resultList[i].date,
                lastMessage: resultList[i].lastMessage,
              };
              resultArray.push(conversationobj);
            }
          }
        }
        return resultArray;
    }
    else {
        return false;
    }
  }
  
  reduceUnreadMsgCountFromConversation(body,resultList) {
    if(resultList.length)
    {
      var i;
      for(i=0;i<resultList.length;i++)
      {
        console.log(resultList[i].leftUser,resultList[i].rightUser,body.username)
        if((resultList[i].leftUser === body.receiverName || resultList[i].rightUser === body.receiverName) && (resultList[i].leftUser === body.senderName || resultList[i].rightUser === body.senderName)) {
          if(resultList[i].leftUser === body.receiverName) {
            resultList[i].unreadMsgCountLeftUser -= 1;
            return resultList[i];
          }
          else {
            resultList[i].unreadMsgCountRightUser -= 1;
            return resultList[i];
          }
        }
      }
    }
    else {
      return false;
    }
  }
  
  isvalidConversation(conv) {
    if(conv.length) {
      return true;
    }
    else {
      return false;
    }
  }
};

module.exports = ConversationUtil
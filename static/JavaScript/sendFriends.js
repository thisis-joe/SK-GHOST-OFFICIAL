function sendFriends() {
    // DB에서 친구 목록 가져오기 AJAX
    let friendList = [] //"CzoJOAExCTgBLRwkEyISIhUmFzsKOgoyCjkBSA"; // DB 요청 예정
    let xhr_friend = new XMLHttpRequest();

    let friendInfor = {"shift": "not"};

    xhr_friend.open('POST', '/goingToWork', true);
    xhr_friend.setRequestHeader("Content-Type", "application/json");
    xhr_friend.send(JSON.stringify(friendInfor))

    xhr_friend.onload = function() {
        let friendPayload = JSON.parse(xhr_friend.responseText)

        for(let i = 0; i < friendPayload.length; i ++) {
            if (friendPayload[i].priority == "1") {
                friendList.push(friendPayload[i].uuid)
            }
        }

        Kakao.API.request({
            url: '/v1/api/talk/friends/message/default/send',
            data: {
                //한번에 몇명까지 전송 가능한지 찾아봐야함.
                receiver_uuids: friendList, //value의 format > ['sdfdsf123213' , 'fas213123fd']
                template_object: {
                    object_type: 'feed',
                    content: {
                        title: '친구에게 메시지 보내기 테스트',
                        description: '왜 이제 전송이 안돼지?',
                        image_url: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
                        link: {
                            web_url: 'https://developers.kakao.com',
                            mobile_web_url: 'https://developers.kakao.com',
                        },
                    },
                    social: {
                        like_count: 100,
                        comment_count: 200,
                    },
                    button_title: '바로 확인',
                },
            },
            success: function (response) {
                alert("친구에게 보내기 성공");
            },
            fail: function (error) {
                alert("친구에게 보내기 실패");
                console.log(error);
            },
        });
    }
}
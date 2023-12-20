import "./chatBot.css";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Form, FormGroup } from "reactstrap";
import avatar from "../../assets/images/avatar.jpg";
import avatar1 from "../../assets/images/avatar1.png";

function Basic() {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [botTyping, setbotTyping] = useState(false);
  const [isDisplayChatbox, setisDisplayChatbox] = useState(false);

  useEffect(() => {
    console.log("called");
    const objDiv = document.getElementById("messageArea");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [chat]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "shreyas";
    const request_temp = { sender: "user", sender_id: name, msg: inputMessage };
    // console.log();

    if (inputMessage !== "") {
      setChat((chat) => [...chat, request_temp]);
      setbotTyping(true);
      setInputMessage("");
      rasaAPI(name, inputMessage);
    } else {
      window.alert("Please enter valid message");
    }
  };

  const rasaAPI = async function handleClick(name, msg) {
    //chatData.push({sender : "user", sender_id : name, msg : msg});

    try {
      await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          charset: "UTF-8",
        },
        credentials: "same-origin",
        body: JSON.stringify({ sender: name, message: msg }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response) {
            const temp = response[0];
            const recipient_id = temp["recipient_id"];
            const recipient_msg = temp["text"];

            const response_temp = {
              sender: "bot",
              recipient_id: recipient_id,
              msg: recipient_msg,
            };
            setbotTyping(false);

            setChat((chat) => [...chat, response_temp]);
            // scrollBottom();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  function handleChangeDisplayChatbox() {
    setisDisplayChatbox(!isDisplayChatbox);
    console.log(isDisplayChatbox);
  }

  // console.log(chat);

  const stylecard = {
    maxWidth: "35rem",
    border: "1px solid black",
    paddingLeft: "0px",
    paddingRight: "0px",
    borderRadius: "30px",
    boxShadow: "0 16px 20px 0 rgba(0,0,0,0.4)",
  };
  const styleHeader = {
    height: "4.5rem",
    borderBottom: "1px solid black",
    borderRadius: "30px 30px 0px 0px",
    backgroundColor: "#8012c4",
  };
  const styleFooter = {
    //maxWidth : '32rem',
    borderTop: "1px solid black",
    borderRadius: "0px 0px 30px 30px",
    backgroundColor: "#8012c4",
  };
  const styleBody = {
    paddingTop: "10px",
    height: "28rem",
    overflowY: "a",
    overflowX: "hidden",
  };

  // if (isDisplayChatbox == true) {
  //   var customDisplay = {
  //     display: "block",
  //   };
  // } else {
  //   var customDisplay = {
  //     display: "none",
  //   };
  // }style={customDisplay}

  return (
    <div>
      <div className="container">
        <div className="chatbox">
          {isDisplayChatbox && (
            <div className="chatbox__support">
              <div className="chatbox__header">
                <div className="chatbox__image--header">
                  <img
                    src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                    alt="image"
                  />
                </div>
                <div className="chatbox__content--header">
                  <h4 className="chatbox__heading--header">
                    Hỗ trợ trò chuyện
                  </h4>
                  <p className="chatbox__description--header">
                    Chào. Tên tôi là Hân. Làm thế nào để tôi giúp bạn?
                  </p>
                </div>
                {botTyping ? <h6>Bot Typing....</h6> : null}
              </div>
              <div className="chatbox__messages">
                <div className="cardBody" id="messageArea" style={styleBody}>
                  <div className="row msgarea">
                    {chat.map((user, key) => (
                      <div key={key}>
                        {user.sender === "bot" ? (
                          <div className="msgalignstart">
                            <img src={avatar} alt="" />
                            <h5 className="botmsg">{user.msg}</h5>
                          </div>
                        ) : (
                          <div className="msgalignend">
                            <h5 className="usermsg">{user.msg}</h5>
                            <img src={avatar1} alt="" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="chatbox__footer cardFooter text-white"
                style={styleFooter}
              >
                <div className="row">
                  <form
                    style={{ display: "flex" }}
                    action=""
                    onSubmit={handleSubmit}
                  >
                    <div className="col-10" style={{ paddingRight: "0px" }}>
                      <input
                        onChange={(e) => setInputMessage(e.target.value)}
                        value={inputMessage}
                        type="text"
                        placeholder="Viết tin nhắn..."
                        className="msginp"
                      />
                    </div>
                    <div className="col-2 cola">
                      <button
                        className="chatbox__send--footer send__button circleBtn"
                        type="submit"
                      >
                        Gửi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="chatbox__button">
            <button onClick={handleChangeDisplayChatbox}>
              <img src="../assets/images/chatbox-icon.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Basic;

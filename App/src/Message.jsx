import React from 'react';


const imgStyle = {
  maxHeight: '600px',
  maxWidth: '60%',
  width: 'auto',
  borderRadius: '10px'
}

function parseForImgs(content) {
  // //make sure content is string
  content = content.toString()

  //set regex to parse for image url
  let srcRe = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

  //Get the img url if it exists - Str.match returns null if it finds nothing
  let imgSrc = content.match(srcRe);

  //base condition when no img urls can be found
  if(!imgSrc) {
    return (<div>{content}</div>)
  }

  let splitterRegex = new RegExp(imgSrc[0] + '(.+)')
  let msg = content.split(splitterRegex);

  let firstPiece = msg.shift()

  return (
    <div>
      <div>{firstPiece}</div>
      <img src={imgSrc[0]} style={imgStyle}/>
      {parseForImgs(msg.join(''))}
    </div>
  )
}

function Message({message}) {

  const messageColor = { color: message.color }

  const content = parseForImgs(message.content)

  return (
    <div className="message">
      <span className="message-username" style={messageColor}>{message.username}</span>
      <span className="message-content">{content}</span>
    </div>
  );
}

export default Message;
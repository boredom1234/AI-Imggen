const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getScreenshotName = (index) => `screenshot${index}.png`;

app.get('/', async (req, res) => {
  res.send(`

  <style>
  @import url('https://fonts.googleapis.com/css2?family=Mynerve&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Julee&family=Lato:ital,wght@1,300&family=Nunito&display=swap');
  
  #blob {
    background-color: white;
    height: 0.3vmax;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background: linear-gradient(to right, white, white);
    opacity: 1;
  }
  
  header{
    font-family: 'Mynerve', cursive;
    text-align: center;
    font-size: 40px;
    margin: 0px;
  }
  
  header h1 {
    color: white;
    margin-bottom: 0px;
    text-shadow: 0 0 30px white, 0 0 0px white, 0 0 10px white;
    animation: blink 1s infinite;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    background-image: linear-gradient(to top, #18181c 0%, #27272e 100%);
    background-repeat: no-repeat;
    color: #DCDDDE;
    overflow: hidden;
  }
  
  .GPT-Change{
    font-size: 13px;
    font-style: italic;
    font-weight: bold;
    display: flex;
    position: fixed;
    top: 0;
    left: 2px;
    margin: 0px;
    justify-content: flex-end;
  }
  
  a:link
  {
      color:#FFFFFF;
      text-decoration: none;
  }
  
  a:visited
  {
      color:#FFFFFF;
      text-decoration: none;
  }
  
  a:hover 
  {
      color:#FFFFFF;
      text-decoration: none;
  }
  
  .logo {
    display: grid;
    margin-left: auto;
    margin-right: auto;
    padding: 2%;
    width: 0%;
    justify-content: center;
    animation: rotate 10s linear infinite;
  }
  
  .github-ico{
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    margin: 10px;
    justify-content: flex-end;
    width: 20px;
    height: 20px;
    filter: opacity(40%);
    filter: invert();
    cursor: pointer;
  }
  
  .us-ico{
    display: flex;
    position: fixed;
    top: -2px;
    right: 32px;
    margin: 10px;
    justify-content: flex-end;
    width: 20px;
    height: 20px;
    filter: opacity(40%);
    filter: invert();
    cursor: pointer;
  }
  
  .donate-ico{
    display: flex;
    position: fixed;
    top: -3px;
    right: 64px;
    margin: 10px;
    justify-content: flex-end;
    width: 24px;
    height: 24px;
    filter: opacity(40%);
    filter: invert();
    cursor: pointer;
  }
  
  .github-ico:hover{
    filter: opacity(100%);
    scale: 1.1;
    animation: shake 0.3s ease-in-out;
    filter: invert();
  }
  
  .us-ico:hover{
    filter: opacity(100%);
    scale: 1.2;
    animation: shake 0.3s ease-in-out;
    filter: invert();
  }
  
  .donate-ico:hover{
    filter: opacity(100%);
    scale: 1.2;
    animation: shake 0.3s ease-in-out;
    filter: invert();
  }
  
  @keyframes shake {
    0% { transform: translate(0, 0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(2px, -2px); }
    60% { transform: translate(-2px, -2px); }
    80% { transform: translate(2px, 2px); }
    100% { transform: translate(0, 0); }
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  /* Define the animation */
  @keyframes blink {
    0%,18%,20%,50.1%,60%,65.1%,80%,90.1%,92%
    {
      color: white;
      text-shadow: none;
    }
    18.1%,20.1%,30%,50%,60.1%,65%,80.1%,90%,92.1%,100%
    {
      color: white;
      text-shadow: 0 0 10px white,
      0 0 20px white,
      0 0 40px white,
      0 0 80px white,
      0 0 160px white;
    }
  }
  
  .container {
    display: flex;
    flex-direction: column;
    padding:10px 30px 10px 30px;
  }
  
  .chat-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0px;
    overflow-y: auto;
  }
  
  .chat-box p {
    padding: 0px;
    text-align: center;
    font-size: 18px;
  }
  
  .output-box{
    margin: 5px;
    width: 100%;
  }
  
  .input-box {
    display: flex;
    margin: 5px;
    margin-left: 12px;
    background-color: #2a2a31;
    border-radius: 15px;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.3);
    position: relative;
    width: 98.9%;
  }
  
  #send-button{
    position: absolute;
    top:0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    font-size: 19px;
  }
  
  .status-box{
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  #searchTerm {
    flex: 1;
    height: 30px; 
    padding: 5px;
    border: none;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    background-color: transparent;
    color: #DCDDDE;
    box-shadow: 0px 0px 0px 0px #7289DA;
    outline: none;
  }
  
  button {
    height: 40px;
    padding: 5px 16px;
    border: none;
    background-color: #2a2a31;
    color: #FFF;
    cursor: pointer;
    font-size: 14px;
    border-radius: 1px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.3);
  }
  
  button:hover {
    background-color: #202025;
  }
  
  #output {
    margin: 5px;
    padding: 5px;
    border: 0px solid #7289DA;
    border-radius: 15px;
    width: 98%;
    resize: none;
    background-color: #2a2a31;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    font-weight:lighter;
    color: #DCDDDE;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
      scrollbar-width: none; /* for Firefox */
      overflow-y: scroll; 
  }
  
  #output::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
  
  #start-button {
    position: absolute;
    top:0;
    right:0;
    bottom: 0;
    margin-right: 55px; /*space between buttons*/
    padding: 0px 7px;
    border: none;
    background-color: #2a2a31;
    color: #FFF;
    cursor: pointer;
    font-size: 24px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.3);
  }
  
  #status {
    text-align: center;
    color: red;
    box-shadow: 0px 0px 15px 0px rgba(113, 37, 253, 0.1);
    font-size: 14px;
    font-style: italic;
    font-weight: bold;
    margin: 10px;
    background-color: #2F3136;
    resize: none;
    border: px solid #7289DA;
    border-radius: 15px;
  }
  
  #start-button:hover {
    background-color: #202025;
  }
  
  @media screen and (max-width: 600px) {
    .chat-box p {
      font-size: 30px;
    }
    
    #searchTerm {
      height: 25px;
      font-size: 12px;
    }
    
    button {
      height: 25px;
      padding: 3px 8px;
      font-size: 12px;
    }
    
    #output {
      margin: 5px;
  padding: 10px;
  border: 1px solid #7289DA;
  border-radius: 5px;
  width: 98%;
  resize: none;
  background-color: #2F3136;
  font-size: 14px;
  color: #DCDDDE;
  }
  
  @media only screen and (max-width: 768px) {
  .chat-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: scroll;
  background-color: #2F3136;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.3);
  max-height: calc(100vh - 230px);
  }
  
  .input-box {
  display: flex;
  margin: 10px;
  background-color: #2F3136;
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.3);
  margin-bottom: 0;
  }
  
  #searchTerm {
  flex: 1;
  height: 30px;
  margin-right: 10px;
  padding: 5px;
  border: none;
  font-size: 14px;
  background-color: transparent;
  color: #DCDDDE;
  box-shadow: none;
  }
  
  button {
  height: 30px;
  padding: 5px 10px;
  border: none;
  background-color: #7289DA;
  color: #FFF;
  cursor: pointer;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: none;
  }
  
  #start-button {
  margin: 20px;
  padding: 5px 10px;
  border: none;
  background-color: #7289DA;
  color: #FFF;
  cursor: pointer;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: none;
  }
  }
  
  @media (max-width: 576px) {
    .container {
    height: auto;
    }
    .chat-box {
    border-radius: 0;
    }
    .input-box {
    margin: 10px 0;
    border-radius: 0;
    box-shadow: none;
    }
    #searchTerm {
    height: 40px;
    margin-right: 0;
    }
    button {
    height: 40px;
    border-radius: 0;
    box-shadow: none;
    }
    #output {
    margin: 5px 0;
    padding: 10px;
    border-radius: 0;
    width: 100%;
    }
    #start-button {
    margin: 20px 0;
    border-radius: 0;
    box-shadow: none;
    }
    }
  }
  
  </style>

  <!DOCTYPE html>
  <html>
  <head>
    <title>HORIZON.ai</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <link rel="stylesheet" type="text/css" href="./styles/style-main.css">
    <link rel="stylesheet" type="text/css" href="./styles/effect.css">
    <link rel="icon" type="image/png" href="icons8-blackhole-96.png">
  
  </head>
  <body>
    <div class="logo" id="logo" ondrag="deleteEverything()">
      <img src="icons8-blackhole-48.png">
    </div>
      <div class="github-ico" onclick="visitGithub()">
        <img src = "github-icon.png" alt="github"/>
      </div>
      <div class="us-ico" onclick="visitUs()">
        <img src = "link-icon.png" alt="us"/>
      </div>
      <div class="donate-ico" onclick="donate()">
        <img src="donate.png" alt="donate"/>
      </div>
      <div class="GPT-Change">
        <a href="https://horizon-ai.vercel.app/GPT3.html">✅ Stab-Diff (Change)</a>
      </div>
    <header><h1 data-value="HORIZON.ai">HORIZON.ai</h1></header>
    <div class="container">
      <div class="chat-box" id="chat-box">
        <p><strong><br><br><br><br><br><br><br><br><br><br></strong></p>
      </div>
      <div class="input-box">
        <form action="/search" method="POST">
        <input type="text" id="searchTerm" name="searchTerm" placeholder="generate">
        <button type="submit"  id="send-button">Search</button>
      </form>
        <script>
          var input = document.getElementById("searchTerm");
          input.addEventListener("keypress", function(event) {
          // If the user presses the "Enter" key on the keyboard
          if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("send-button").click();
            input.value="";
          }
          });
        </script>
      </div>
    </div>
    <script>
      function deleteEverything(){
        const out = document.getElementById("output");
        out.value = "";
        localStorage.removeItem("output");
      }
    </script>
      <script>
        function visitGithub(){
          window.open("https://github.com/boredom1234/V-GPT");
        }
       </script>
      <script>
        function visitUs(){
          //window.open("https://www.google.com", "_blank", "width=600,height=400");
          //window.open("https://www.youtube.com", "_blank", "width=600,height=400");
        }
      </script>
    <script src="./js/effect.js"></script>
      <div id="blob"></div>
    <div id="blur"></div>
      <script src="./V-GPT-main/js/blob.js"></script>
  </body>
  </html>
    `);
});

app.post('/search', async (req, res) => {
  const searchTerm = req.body.searchTerm;

  const browser = await puppeteer.launch({ userDataDir: '/path/to/unique/directory' });
  const page = await browser.newPage();

  await page.goto('https://dezgo.com/');
  await page.waitForTimeout(15000);
  console.log("Phase1 ✅");

  // Click the close button with class "mmt-sticky-close"
const closeButton = await page.$('.mmt-sticky-close');
await closeButton.click();
console.log("Close button clicked ✅");

  const textarea = await page.$('textarea.mud-input-slot');
  await textarea.type(searchTerm);
  console.log("Phase2 ✅");

  const button = await page.$('button.mud-button-filled');
  await button.click();
  console.log("Phase3 ✅");

  await page.waitForFunction(() => !document.querySelector('button.mud-button-filled[disabled]'), { timeout: 240000 }); //4mins timer is okay, or else die bro I cant do anything 
  console.log("Phase4 ✅");


  let screenshotIndex = 0;
  let screenshotName = getScreenshotName(screenshotIndex);

  while (fs.existsSync(screenshotName)) {
    screenshotIndex++;
    screenshotName = getScreenshotName(screenshotIndex);
  }

  const imageElement = await page.$('#image-output');
  const imageBuffer = await imageElement.screenshot({ encoding: 'binary' });

  await browser.close();
  console.log("Image Generated✅\n");

  fs.writeFileSync(screenshotName, imageBuffer, 'binary');

  // Save the search term to a text file
  const text = `${searchTerm}\n`;
  fs.appendFileSync('searchTerms.txt', text);
  
  const backButton = `
    <form action="/" method="GET">
      <button type="submit">Back</button>
    </form>
  `;

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write(`<img src="data:image/png;base64,${imageBuffer.toString('base64')}"/>`);
  res.write(backButton);
  res.end();
});
  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

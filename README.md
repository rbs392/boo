# Boo
## Testing as it should be.
Boo make integration testing a breeze.
It is as simple you going through your application via browser and clicking things to checkout for functionality.

## Installation instruction
<pre>
  git clone https://github.com/rbs392/boo
  cd boo
  npm install
  npm run build && npm run start
</pre>
Fireup your browser and hit 
<pre>   http://localhost:8000</pre>
Thats it you are ready to roll.

## Usage instruction
 - Enter the URL of your web application in the input bar.
 - Click start.
 - Once your web app get loaded on the left side, Click on the add suite button
 - You will see you first suite created.
 - Click on add scenario 
 - Click on any of the element of your web app on the left pane and choose text from the popup.
 - Add as much of test you need, and click on run.
 - You integration test code is now ready on the new tab that just opened up.

## Integration test setup
 <pre>
  cd seed-template
  npm install
 </pre>
 - Enter your preference for the questions asked.
 - Copy paste the generated code to a file in seed-template/test.
 <pre>  npm run test </pre>
 Voila! your integration test is now up and running. 
 Happy coding and boo testing ;)


# Tic-Tac-Toe Game

## Overview
This project is a simple Tic-Tac-Toe game implemented using HTML, CSS, and JavaScript. The game allows a user to play against an AI opponent that utilizes a deep learning model built with TensorFlow and Keras.

## Features
- Player vs AI gameplay
- AI is trained using deep learning techniques to make intelligent moves
- Interactive UI with animations
- Automatic game restart after 4 seconds when the game ends
- Responsive design

## How to Play
1. Open the game in a web browser.
2. Click on an empty square to make a move ("X" player always starts first).
3. The AI ("O") will respond with its move based on the trained deep learning model.
4. The game continues until either player wins or the game ends in a draw.
5. The winner's line turns green, and the game restarts after a short delay.

## Technologies Used
- **HTML** for structure
- **CSS** for styling and animations
- **JavaScript** for game logic and AI integration
- **TensorFlow.js** for running the trained AI model in the browser
- **Keras** and **TensorFlow** for training the deep learning model

## AI Model
- The AI is trained using a deep neural network (DNN) to predict the best move.
- The model is saved in `.h5` format and converted to a format compatible with TensorFlow.js for use in the browser.
- The AI learns from thousands of Tic-Tac-Toe game states to improve its performance.

## Installation & Usage
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/tic-tac-toe-ai.git
   ```
2. Open `index.html` in a browser to play.
3. If running locally with AI, ensure the TensorFlow.js model is properly loaded.

## Future Improvements
- Enhance AI performance by training with reinforcement learning
- Implement a difficulty selection for AI
- Add multiplayer mode (online/local)

## License
This project is open-source and available under the MIT License.

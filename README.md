# Tic Tac Toe — Two Player (Endless Mode)

A sleek, modern two-player Tic Tac Toe game built with React and Vite, designed for **single-device shared play**. The game eliminates the draw scenario entirely by introducing a **sliding window rule**: once a player has placed three symbols, their oldest symbol disappears on the next turn — keeping the board perpetually in motion until someone wins.

![Tic Tac Toe](public/favicon.svg)

---

## ✨ Features

- 🎮 **Two players, one device** — perfect for pass-and-play on phones, tablets, or desktops
- 🔄 **No draws, ever** — the sliding-window rule guarantees the game only ends in a win
- ⏳ **Sliding window mechanic** — each player's oldest piece fades away after 3 moves
- 🎨 **Modern dark UI** — animated gradient title, smooth cell transitions, and winning-line highlights
- 📱 **Fully responsive** — touch-optimized for mobile, keyboard-friendly on desktop
- ⌨️ **Quick reset** — press `R` to start a new game instantly
- 🌈 **Color-coded players** — X in pink, O in blue for instant recognition
- ✨ **Fade-out animation** — removed symbols animate gracefully instead of vanishing abruptly

---

## 🧠 How the "Endless" Rule Works

Traditional Tic Tac Toe frequently ends in a draw. This game removes that possibility with a **per-player move queue**:

| Step | Action                                                                 |
| ---- | ---------------------------------------------------------------------- |
| 1    | A player places a symbol on an empty cell                              |
| 2    | The symbol's index is pushed to that player's move queue               |
| 3    | If the queue exceeds **3 moves**, the oldest index is `shift()`-ed off |
| 4    | That cell is cleared on the board (and briefly animated out)           |
| 5    | The win condition is checked on the **resulting** board                |
| 6    | Turn passes to the other player                                        |

Because each player can only ever hold **3 symbols at once**, the board constantly frees up space — making draws impossible and wins inevitable.

> ⚠️ **Important edge case handled:** If removing a player's oldest symbol breaks a previously formed line, no win is declared. The win check runs _after_ the removal step — so the game state is always consistent.

---

## 🛠️ Tech Stack

| Technology                      | Purpose                              |
| ------------------------------- | ------------------------------------ |
| [React 18+](https://react.dev/) | UI and state management              |
| [Vite](https://vitejs.dev/)     | Build tool and dev server            |
| CSS3                            | Styling, transitions, and animations |

No external UI libraries or state managers are used — the entire game is built with **plain React hooks** (`useState`, `useEffect`).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** (bundled with Node.js)

Verify your setup:

```bash
node -v
npm -v
```

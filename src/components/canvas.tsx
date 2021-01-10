import React from 'react';
import Game from "reactified-phaser/Game"
import { earningStore } from "../App"
import { observer } from "mobx-react"
import { gameConfig } from "../configs/gameConfig"
import { round } from '../helpers/round';

const Canvas = observer(() =>
  <Game config={gameConfig}>
    <div style={{
      position: "relative",
      fontSize: 32,
      color: "#ededed",
      left: 16
    }}>
      Winst: € {round(earningStore.earnings, 2)}
    </div>
  </Game>
)

export default Canvas;
<template>
  <div class=cube>
    <canvas width="396" height="297" id="scrambled-cube">Scrambled cube</canvas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Cube',
  data() {
    return {
      scheme3x3: {
        front: [
          '#08EE10', '#08EE10', '#08EE10',
          '#08EE10', '#08EE10', '#08EE10',
          '#08EE10', '#08EE10', '#08EE10'
        ],
        top: [
          '#FFFFFF', '#FFFFFF', '#FFFFFF',
          '#FFFFFF', '#FFFFFF', '#FFFFFF',
          '#FFFFFF', '#FFFFFF', '#FFFFFF'
        ],
        left: [
          '#F58A1F', '#F58A1F', '#F58A1F',
          '#F58A1F', '#F58A1F', '#F58A1F',
          '#F58A1F', '#F58A1F', '#F58A1F'
        ],
        right: [
          '#FF0000', '#FF0000', '#FF0000',
          '#FF0000', '#FF0000', '#FF0000',
          '#FF0000', '#FF0000', '#FF0000'
        ],
        back: [
          '#1900FF', '#1900FF', '#1900FF',
          '#1900FF', '#1900FF', '#1900FF',
          '#1900FF', '#1900FF', '#1900FF'
        ],
        bottom: [
          '#DCE90D', '#DCE90D', '#DCE90D',
          '#DCE90D', '#DCE90D', '#DCE90D',
          '#DCE90D', '#DCE90D', '#DCE90D'
        ]
      },
    }
  },
  computed: mapGetters([
    'getSelectedCube',
    'getScramble'
  ]),
  methods: {
    // atm only for 3x3 cubes
    draw(scramble, cubeScheme) {
      const canvas = document.getElementById('scrambled-cube'),
            scrambledCubeScheme = this.scrambleCube(scramble, cubeScheme);

            // if browser supports canvas
      if(canvas.getContext) {
        const ctx = canvas.getContext('2d');

        // clear before redrawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if(this.getSelectedCube === 'cube3x3') {
          this.displayOneCubeSide(ctx, 99, 99, scrambledCubeScheme.front); // front
          this.displayOneCubeSide(ctx, 99, 0, scrambledCubeScheme.top); // top
          this.displayOneCubeSide(ctx, 0, 99, scrambledCubeScheme.left); // left
          this.displayOneCubeSide(ctx, 198, 99, scrambledCubeScheme.right); // right
          this.displayOneCubeSide(ctx, 297, 99, scrambledCubeScheme.back); // back
          this.displayOneCubeSide(ctx, 99, 198, scrambledCubeScheme.bottom); // bottom
        }
      }
    },

    // x and y coordinates are top left corner of side of cube,
    // stickers - colors array (left to right, top to bottom)
    displayOneCubeSide(ctx, x, y, stickers) {
      let xp = x,
          yp = y,
          color;
      
      // grey rect behind stickers of one cube side
      ctx.fillStyle = '#707070';
      ctx.fillRect(x+25, y+25, 49, 49);
      
      // calculate position of sticker and draw it
      for(let i=1; i<=9; i++) {
        color = stickers[i-1];

        switch(i) {
          case 1: xp = x; yp = y; break;
          case 2: xp = x + 33; yp = y; break;
          case 3: xp = x + 2*33; yp = y; break;
          case 4: xp = x; yp = y + 33; break;
          case 5: xp = x + 33; yp = y + 33; break;
          case 6: xp = x + 2*33; yp = y + 33; break;
          case 7: xp = x; yp = y + 2*33; break;
          case 8: xp = x + 33; yp = y + 2*33; break;
          case 9: xp = x + 2*33; yp = y + 2*33; break;
        }

        this.drawOneSticker(ctx, xp, yp, color);
      }

    },

    // function for drawind one sticker of cube, takes x and y coordinates and color of sticker
    drawOneSticker(ctx, x, y, color) {

      // gray background around sticker - as a border
      ctx.fillStyle = '#707070';
      ctx.beginPath();
      ctx.moveTo(x+6, y);
      ctx.lineTo(x+27, y);
      ctx.arcTo(x+33, y, x+33, y+6, 8);
      ctx.lineTo(x+33, y+27);
      ctx.arcTo(x+33, y+33, x+27, y+33, 8);
      ctx.lineTo(x+6, y+33);
      ctx.arcTo(x, y+33, x, y+27, 8);
      ctx.lineTo(x, y+6);
      ctx.arcTo(x, y, x+6, y, 8);
      ctx.fill();

      // colored sticker itself
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x+7, y+1);
      ctx.lineTo(x+26, y+1);
      ctx.arcTo(x+32, y+1, x+32, y+7, 7);
      ctx.lineTo(x+32, y+26);
      ctx.arcTo(x+32, y+32, x+26, y+32, 7);
      ctx.lineTo(x+7, y+32);
      ctx.arcTo(x+1, y+32, x+1, y+26, 7);
      ctx.lineTo(x+1, y+7);
      ctx.arcTo(x+1, y+1, x+7, y+1, 7);
      ctx.fill();
    },

    scrambleCube(scramble, colorScheme) {
      let scrambledCube = JSON.parse(JSON.stringify(colorScheme));

      for(let i=0; i<scramble.length; i++) {
        const letterLength = scramble[i].length,
              move = scramble[i][0];
        let modifier,
            modSides;

        // for counter clockwise moves do 3x turn, for duble moves do 2x turn
        modifier = letterLength === 1 ? 1 : scramble[i][1] === '2' ? 2 : scramble[i][1] === '\'' ? 3 : 0;
        
        if(modifier != 0) {
          switch(move) {
            case 'F': modSides = {...this.doVerticalMove(move, scrambledCube.left, scrambledCube.top, 
                                    scrambledCube.right, scrambledCube.bottom, modifier)};
        
                      scrambledCube = {
                        front: this.doFaceMove(scrambledCube.front, modifier),
                        top: modSides.top,
                        left: modSides.left,
                        right: modSides.right,
                        back: scrambledCube.back,
                        bottom: modSides.bottom
                      };
                      break;
            case 'U': modSides = {...this.doVerticalMove(move, scrambledCube.left, scrambledCube.back, 
                                    scrambledCube.right, scrambledCube.front, modifier)};
        
                      scrambledCube = {
                        front: modSides.bottom,
                        top: this.doFaceMove(scrambledCube.top, modifier),
                        left: modSides.left,
                        right: modSides.right,
                        back: modSides.top,
                        bottom: scrambledCube.bottom
                      };
                      break;
            case 'L': modSides = {...this.doVerticalMove(move, scrambledCube.back, scrambledCube.top, 
                                    scrambledCube.front, scrambledCube.bottom, modifier)};
        
                      scrambledCube = {
                        front: modSides.right,
                        top: modSides.top,
                        left: this.doFaceMove(scrambledCube.left, modifier),
                        right: scrambledCube.right,
                        back: modSides.left,
                        bottom: modSides.bottom
                      };
                      break;
            case 'R': modSides = {...this.doVerticalMove(move, scrambledCube.front, scrambledCube.top, 
                                    scrambledCube.back, scrambledCube.bottom, modifier)};
        
                      scrambledCube = {
                        front: modSides.left,
                        top: modSides.top,
                        left: scrambledCube.left,
                        right: this.doFaceMove(scrambledCube.right, modifier),
                        back: modSides.right,
                        bottom: modSides.bottom
                      };
                      break;
            case 'B': modSides = {...this.doVerticalMove(move, scrambledCube.right, scrambledCube.top, 
                                    scrambledCube.left, scrambledCube.bottom, modifier)};
        
                      scrambledCube = {
                        front: scrambledCube.front,
                        top: modSides.top,
                        left: modSides.right,
                        right: modSides.left,
                        back: this.doFaceMove(scrambledCube.back, modifier),
                        bottom: modSides.bottom
                      };
                      break;
            case 'D': modSides = {...this.doVerticalMove(move, scrambledCube.left, scrambledCube.front, 
                                    scrambledCube.right, scrambledCube.back, modifier)};
        
                      scrambledCube = {
                        front: modSides.top,
                        top: scrambledCube.top,
                        left: modSides.left,
                        right: modSides.right,
                        back: modSides.bottom,
                        bottom: this.doFaceMove(scrambledCube.bottom, modifier)
                      };
                      break;
          }
        }
      }

      return scrambledCube;
    },

    // do face move of selected cube side
    doFaceMove(cubeSide, turns) {
      let newSide,
          tempSide = cubeSide;

      for(let i=0; i<turns; i++) {
        newSide = [
          tempSide[6], tempSide[3], tempSide[0],
          tempSide[7], tempSide[4], tempSide[1],
          tempSide[8], tempSide[5], tempSide[2]
        ];
        tempSide = newSide;
      }

      return newSide;
    },

    // move contigous side elements
    doVerticalMove(side, sideLeft, sideTop, sideRight, sideBottom, turns) {
      let tempSide1;

      for(let i=0; i<turns; i++) {
        tempSide1 = [...sideLeft];

        if(side === 'F') {
          sideLeft[2] = sideBottom[0];
          sideLeft[5] = sideBottom[1];
          sideLeft[8] = sideBottom[2];

          sideBottom[0] = sideRight[6];
          sideBottom[1] = sideRight[3];
          sideBottom[2] = sideRight[0];

          sideRight[0] = sideTop[6];
          sideRight[3] = sideTop[7];
          sideRight[6] = sideTop[8];

          sideTop[6] = tempSide1[8];
          sideTop[7] = tempSide1[5];
          sideTop[8] = tempSide1[2];
        } 
        else if(side === 'U') {
          sideLeft[0] = sideBottom[0];
          sideLeft[1] = sideBottom[1];
          sideLeft[2] = sideBottom[2];

          sideBottom[0] = sideRight[0];
          sideBottom[1] = sideRight[1];
          sideBottom[2] = sideRight[2];

          sideRight[0] = sideTop[0];
          sideRight[1] = sideTop[1];
          sideRight[2] = sideTop[2];

          sideTop[0] = tempSide1[0];
          sideTop[1] = tempSide1[1];
          sideTop[2] = tempSide1[2];
        }
        else if(side === 'L') {
          sideLeft[2] = sideBottom[6];
          sideLeft[5] = sideBottom[3];
          sideLeft[8] = sideBottom[0];

          sideBottom[6] = sideRight[6];
          sideBottom[3] = sideRight[3];
          sideBottom[0] = sideRight[0];

          sideRight[6] = sideTop[6];
          sideRight[3] = sideTop[3];
          sideRight[0] = sideTop[0];

          sideTop[6] = tempSide1[2];
          sideTop[3] = tempSide1[5];
          sideTop[0] = tempSide1[8];
        }
        else if(side === 'R') {
          sideLeft[2] = sideBottom[2];
          sideLeft[5] = sideBottom[5];
          sideLeft[8] = sideBottom[8];

          sideBottom[2] = sideRight[6];
          sideBottom[5] = sideRight[3];
          sideBottom[8] = sideRight[0];

          sideRight[6] = sideTop[2];
          sideRight[3] = sideTop[5];
          sideRight[0] = sideTop[8];

          sideTop[2] = tempSide1[2];
          sideTop[5] = tempSide1[5];
          sideTop[8] = tempSide1[8];
        }
        else if(side === 'B') {
          sideLeft[2] = sideBottom[8];
          sideLeft[5] = sideBottom[7];
          sideLeft[8] = sideBottom[6];

          sideBottom[8] = sideRight[6];
          sideBottom[7] = sideRight[3];
          sideBottom[6] = sideRight[0];

          sideRight[6] = sideTop[0];
          sideRight[3] = sideTop[1];
          sideRight[0] = sideTop[2];

          sideTop[0] = tempSide1[2];
          sideTop[1] = tempSide1[5];
          sideTop[2] = tempSide1[8];
        }
        else if(side === 'D') {
          sideLeft[8] = sideBottom[8];
          sideLeft[7] = sideBottom[7];
          sideLeft[6] = sideBottom[6];

          sideBottom[8] = sideRight[8];
          sideBottom[7] = sideRight[7];
          sideBottom[6] = sideRight[6];

          sideRight[8] = sideTop[8];
          sideRight[7] = sideTop[7];
          sideRight[6] = sideTop[6];

          sideTop[8] = tempSide1[8];
          sideTop[7] = tempSide1[7];
          sideTop[6] = tempSide1[6];
        }
      }

      return {
        top: sideTop,
        left: sideLeft,
        right: sideRight,
        bottom: sideBottom
      };
    }

  },
  mounted() {
    this.draw(this.getScramble, this.scheme3x3);
  },
  watch: {
    getScramble: function() { this.draw(this.getScramble, this.scheme3x3) }
  }
}
</script>

<style lang="scss" scoped>

.cube {
  height: 100%;
  width: 100%;
  background: var(--space-blue);
  justify-content: center;
  align-items: center;
  overflow: hidden;
  display: none;

  @media screen and (min-width: 1024px) and (min-height: 500px) and (orientation: landscape),
         screen and (min-width: 1024px) and (orientation: portrait) {
    display:flex;
  }

  canvas {
    max-height: 96%;
  }
}

</style>